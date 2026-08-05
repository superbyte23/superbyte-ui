/*!
 * SuperDataTable v1.0.0 — dependency-free DataTable for Superbyte UI.
 *
 * Usage (client mode):
 *   const dt = new SuperDataTable('#target', {
 *     data: ROWS,
 *     perPage: 10,
 *     perPageOptions: [5, 10, 25, 0],
 *     initialSort: { key: 'name', dir: 1 },
 *     tableClass: 'row-actions-always',
 *     searchPlaceholder: 'Filter rows…',
 *     infoText: (from, to, total) => 'Showing ' + from + '–' + to + ' of ' + total + ' rows',
 *     columns: [
 *       { key: 'name', title: 'Customer' },
 *       { key: 'amount', title: 'MRR', align: 'right', cellClass: 'mono-cell',
 *         render: r => '$' + r.amount.toLocaleString() },
 *       { title: 'Actions', sortable: false, render: r => '<button …>' }
 *     ]
 *   });
 *
 * Usage (server mode): pass `source` instead of `data`:
 *   source: async p => ({ rows: slice, total: count })
 *   p = { page, perPage, query, sortKey, sortDir }
 *
 * API: go(page) · setPageSize(n) · setSearch(q) · sortBy(key) · refresh()
 *      reset() · pageRows() · current() · on('render', fn) · destroy()
 *      toolbar / table / tbody / info / pager  (generated elements)
 */
class SuperDataTable {
  constructor(target, options) {
    this.el = typeof target === 'string' ? document.querySelector(target) : target;
    if (!this.el) throw new Error('SuperDataTable: target element not found');
    this.options = Object.assign({
      perPage: 10,
      perPageOptions: [5, 10, 25, 50],
      search: true,
      searchPlaceholder: 'Filter rows…',
      sortable: true,
      tableClass: '',
      emptyHtml: '<div class="dt-empty">No rows match</div>',
      initialSort: null,
      infoText: (from, to, total) => 'Showing ' + from + '–' + to + ' of ' + total + ' rows'
    }, options);
    this.mode = this.options.source ? 'server' : 'client';
    this.rows = this.mode === 'client' ? (this.options.data || []) : null;
    this.lastRows = [];
    this.page = 0;
    this.query = '';
    this.perPage = this.options.perPage;
    this.sortKey = this.options.initialSort ? this.options.initialSort.key : null;
    this.sortDir = this.options.initialSort ? this.options.initialSort.dir : 1;
    this.handlers = {};
    this.injectStyles();
    this.build();
    this.render();
  }

  injectStyles() {
    if (document.getElementById('sdt-styles')) return;
    const st = document.createElement('style');
    st.id = 'sdt-styles';
    st.textContent = 'th.sortable{cursor:pointer;user-select:none;white-space:nowrap}' +
      'th.sort-asc::after{content:" \\2191";color:var(--accent-h)}' +
      'th.sort-desc::after{content:" \\2193";color:var(--accent-h)}' +
      '.sdt .dt-empty{padding:18px 12px;text-align:center;color:var(--text3);font-size:12px}';
    document.head.appendChild(st);
  }

  build() {
    this.el.classList.add('sdt');
    this.columns = this.options.columns.map(c => ({
      key: c.key || null,
      title: c.title || c.key || '',
      align: c.align || 'left',
      sortable: c.sortable !== undefined ? !!c.sortable : !!(c.key && this.options.sortable),
      className: c.className || '',
      cellClass: c.cellClass || '',
      render: c.render || null
    }));

    const toolbar = document.createElement('div');
    toolbar.className = 'table-toolbar';
    const left = document.createElement('div');
    left.className = 'd-flex flex-wrap gap-2 align-items-center';
    if (this.options.search) {
      const wrap = document.createElement('div');
      wrap.className = 'search-wrap';
      const icon = document.createElement('i');
      icon.className = 'hgi-stroke hgi-search-01 search-icon';
      wrap.appendChild(icon);
      const input = document.createElement('input');
      input.className = 'search-input';
      input.placeholder = this.options.searchPlaceholder;
      input.autocomplete = 'off';
      input.style.width = '200px';
      input.addEventListener('input', () => { this.query = input.value; this.page = 0; this.render(); });
      wrap.appendChild(input);
      this.searchInput = input;
      left.appendChild(wrap);
    }
    if (this.options.perPageOptions && this.options.perPageOptions.length) {
      const sel = document.createElement('select');
      sel.className = 'form-select form-select-sm';
      sel.style.width = 'auto';
      this.options.perPageOptions.forEach(n => {
        const o = document.createElement('option');
        o.value = n;
        o.textContent = n ? n + ' / page' : 'All';
        if (n === this.perPage) o.selected = true;
        sel.appendChild(o);
      });
      sel.addEventListener('change', () => this.setPageSize(+sel.value));
      this.sizeSelect = sel;
      left.appendChild(sel);
    }
    if (left.childNodes.length) toolbar.appendChild(left);
    this.toolbar = toolbar;

    const zone = document.createElement('div');
    zone.className = 'table-zone';
    const resp = document.createElement('div');
    resp.className = 'table-responsive';
    const table = document.createElement('table');
    table.className = 'table ' + (this.options.tableClass || '').trim();
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    this.columns.forEach(c => {
      const th = document.createElement('th');
      th.textContent = c.title;
      const cls = (c.align === 'right' ? 'text-end ' : '') + c.className;
      if (cls.trim()) th.className = cls.trim();
      if (c.sortable) {
        th.classList.add('sortable');
        th.addEventListener('click', () => this.sortBy(c.key));
      }
      tr.appendChild(th);
    });
    thead.appendChild(tr);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    resp.appendChild(table);
    zone.appendChild(resp);
    this.zone = zone;
    this.table = table;
    this.tbody = tbody;

    const footer = document.createElement('div');
    footer.className = 'table-footer';
    const info = document.createElement('span');
    this.info = info;
    footer.appendChild(info);
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    ul.className = 'pagination pagination-sm mb-0';
    this.pagerUl = ul;
    nav.appendChild(ul);
    nav.addEventListener('click', e => {
      const a = e.target.closest('a[data-p]');
      if (!a) return;
      e.preventDefault();
      if (a.parentElement.classList.contains('disabled')) return;
      this.go(+a.dataset.p);
    });
    this.pager = nav;
    footer.appendChild(nav);
    this.footer = footer;

    this.el.appendChild(toolbar);
    this.el.appendChild(zone);
    this.el.appendChild(footer);
  }

  filtered() {
    let rows = this.rows.slice();
    const q = this.query.trim().toLowerCase();
    if (q) {
      const keys = this.columns.filter(c => c.key).map(c => c.key);
      rows = rows.filter(r => keys.some(k => String(r[k] != null ? r[k] : '').toLowerCase().includes(q)));
    }
    if (this.sortKey) {
      const dir = this.sortDir;
      rows.sort((a, b) => {
        const x = a[this.sortKey], y = b[this.sortKey];
        const nx = parseFloat(x), ny = parseFloat(y);
        const c = (!isNaN(nx) && !isNaN(ny)) ? nx - ny
          : String(x != null ? x : '').localeCompare(String(y != null ? y : ''));
        return c * dir;
      });
    }
    return rows;
  }

  async render() {
    let rows = [];
    let total = 0;
    if (this.mode === 'server') {
      this.zone.classList.add('table-loading');
      try {
        const res = await this.options.source({
          page: this.page,
          perPage: this.perPage,
          query: this.query,
          sortKey: this.sortKey,
          sortDir: this.sortDir
        });
        rows = res.rows || [];
        total = res.total != null ? res.total : rows.length;
        this.lastRows = rows;
      } finally {
        this.zone.classList.remove('table-loading');
      }
    } else {
      const all = this.filtered();
      total = all.length;
      const pp = this.perPage;
      if (pp) {
        const pages = Math.max(1, Math.ceil(total / pp));
        if (this.page >= pages) this.page = pages - 1;
        if (this.page < 0) this.page = 0;
        rows = all.slice(this.page * pp, this.page * pp + pp);
      } else {
        this.page = 0;
        rows = all;
      }
    }
    this.draw(rows, total);
    this.emit('render');
  }

  draw(rows, total) {
    if (!rows.length) {
      this.tbody.innerHTML = '<tr><td colspan="' + this.columns.length + '">' + this.options.emptyHtml + '</td></tr>';
    } else {
      this.tbody.innerHTML = rows.map(r =>
        '<tr>' + this.columns.map(c => {
          let v = c.render ? c.render(r) : (r[c.key] != null ? r[c.key] : '');
          v = v == null ? '' : v;
          const cls = ((c.align === 'right' ? 'text-end ' : '') + c.cellClass).trim();
          return '<td' + (cls ? ' class="' + cls + '"' : '') + '>' + v + '</td>';
        }).join('') + '</tr>'
      ).join('');
    }
    const pp = this.perPage;
    const pages = pp ? Math.max(1, Math.ceil(total / pp)) : 1;
    const from = rows.length ? (pp ? this.page * pp + 1 : 1) : 0;
    const to = pp ? Math.min(this.page * pp + pp, total) : total;
    this.info.textContent = this.options.infoText(from, to, total, {
      page: this.page, pages: pages, perPage: pp, mode: this.mode
    });
    this.pagerUl.innerHTML = this.pagerHtml(pages, this.page);
    this.updateSortIndicators();
  }

  pagerHtml(pages, cur) {
    if (pages <= 1) return '';
    let h = '<li class="page-item ' + (cur === 0 ? 'disabled' : '') + '"><a class="page-link" href="#" data-p="' + (cur - 1) + '">Prev</a></li>';
    for (let i = 0; i < pages; i++) {
      h += '<li class="page-item ' + (i === cur ? 'active' : '') + '"><a class="page-link" href="#" data-p="' + i + '">' + (i + 1) + '</a></li>';
    }
    h += '<li class="page-item ' + (cur === pages - 1 ? 'disabled' : '') + '"><a class="page-link" href="#" data-p="' + (cur + 1) + '">Next</a></li>';
    return h;
  }

  updateSortIndicators() {
    const head = this.table.tHead ? this.table.tHead.rows[0] : null;
    if (!head) return;
    this.columns.forEach((c, i) => {
      const th = head.cells[i];
      if (!th) return;
      th.classList.remove('sort-asc', 'sort-desc');
      if (c.key && c.sortable && c.key === this.sortKey) {
        th.classList.add(this.sortDir === 1 ? 'sort-asc' : 'sort-desc');
      }
    });
  }

  async go(page) { this.page = page; return this.render(); }
  async refresh() { return this.render(); }
  async setPageSize(n) {
    this.perPage = n;
    this.page = 0;
    if (this.sizeSelect) this.sizeSelect.value = n;
    return this.render();
  }
  async setSearch(q) {
    this.query = q;
    if (this.searchInput) this.searchInput.value = q;
    this.page = 0;
    return this.render();
  }
  async sortBy(key) {
    if (this.sortKey === key) this.sortDir *= -1;
    else { this.sortKey = key; this.sortDir = 1; }
    this.page = 0;
    return this.render();
  }
  reset() {
    this.query = '';
    if (this.searchInput) this.searchInput.value = '';
    this.page = 0;
    if (this.options.initialSort) {
      this.sortKey = this.options.initialSort.key;
      this.sortDir = this.options.initialSort.dir;
    }
    this.perPage = this.options.perPage;
    if (this.sizeSelect) this.sizeSelect.value = this.perPage;
    return this.render();
  }
  current() { return this.mode === 'server' ? this.lastRows.slice() : this.filtered(); }
  pageRows() {
    if (this.mode === 'server') return this.lastRows;
    const rows = this.filtered();
    const pp = this.perPage;
    if (!pp) return rows;
    return rows.slice(this.page * pp, this.page * pp + pp);
  }
  on(event, cb) { (this.handlers[event] = this.handlers[event] || []).push(cb); return this; }
  emit(event) { (this.handlers[event] || []).forEach(cb => cb(this)); }
  destroy() { this.el.innerHTML = ''; }
}

window.SuperDataTable = SuperDataTable;
