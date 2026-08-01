/* ── FILE MANAGER ───────────────────────────────────────────────────────── */
const FILES = [
  { name: 'index.html',      kind: 'HTML',     size: '24 KB',  mod: '2 min ago', owner: 'JC', icon: 'hgi-file-code', color: '#6366f1' },
  { name: 'assets',          kind: 'Folder',   size: '—',      mod: '4 min ago', owner: 'JC', icon: 'hgi-folder-01',    color: 'var(--accent)' },
  { name: 'app.js',          kind: 'JS',       size: '19 KB',  mod: '6 min ago', owner: 'RT', icon: 'hgi-file-code', color: '#f59e0b' },
  { name: 'Q3-Budget.csv',   kind: 'Sheet',    size: '142 KB', mod: '22 min ago', owner: 'MS', icon: 'hgi-csv-01', color: '#22c55e' },
  { name: 'brand-assets',    kind: 'Folder',   size: '—',      mod: '1 h ago',   owner: 'JD', icon: 'hgi-folder-01',    color: 'var(--accent)' },
  { name: 'v2.5-spec.pdf',   kind: 'PDF',      size: '1.1 MB', mod: '3 h ago',   owner: 'JC', icon: 'hgi-pdf-01', color: '#ef4444' },
  { name: 'app.css',         kind: 'CSS',      size: '31 KB',  mod: '5 h ago',   owner: 'RT', icon: 'hgi-file-code', color: '#38bdf8' },
  { name: 'auth.js',         kind: 'JS',       size: '7 KB',   mod: 'yesterday', owner: 'MS', icon: 'hgi-file-code', color: '#f59e0b' },
  { name: 'screenshots.zip', kind: 'Archive',  size: '2.4 MB', mod: 'yesterday', owner: 'JD', icon: 'hgi-file-zip', color: '#ec4899' },
  { name: 'README.md',       kind: 'Doc',      size: '6 KB',   mod: '2 days ago', owner: 'JC', icon: 'hgi-file-01', color: '#64748b' },
  { name: 'hero-banner.png', kind: 'Image',    size: '812 KB', mod: '3 days ago', owner: 'JD', icon: 'hgi-file-image', color: '#ec4899' },
  { name: 'docs',            kind: 'Folder',   size: '—',      mod: '4 days ago', owner: 'MS', icon: 'hgi-folder-01',    color: 'var(--accent)' },
  { name: 'gen-shell.cjs',   kind: 'JS',       size: '5 KB',   mod: '5 days ago', owner: 'RT', icon: 'hgi-file-code', color: '#f59e0b' },
  { name: 'budget-notes.txt', kind: 'Text',    size: '3 KB',   mod: '1 week ago', owner: 'JC', icon: 'hgi-file-01', color: '#64748b' }
];

let fmViewMode = 'list';
const fmSel = new Set();

function fmRows(files) {
  return files.map((f, i) => {
    const checked = fmSel.has(f.name);
    return '<tr' + (checked ? ' class="selected"' : '') + '>' +
      '<td class="cell-check"><input type="checkbox" ' + (checked ? 'checked' : '') + ' onchange="fmToggle(event, \'' + f.name.replace(/'/g, "\\'") + '\', this)"></td>' +
      '<td class="name-cell"><div style="display:flex;align-items:center;gap:10px"><i class="hgi-stroke ' + f.icon + '" style="color:' + f.color + ';font-size:15px;width:18px;text-align:center"></i><div><div style="cursor:pointer" onclick="fmOpen(\'' + f.name.replace(/'/g, "\\'") + '\')">' + esc(f.name) + '</div><div style="font-size:11px;color:var(--text3)">' + f.kind + ' · ' + f.owner + '</div></div></div></td>' +
      '<td class="mono-cell">' + f.size + '</td>' +
      '<td class="mono-cell">' + f.mod + '</td>' +
      '<td><div class="row-actions"><button class="row-btn" title="Download" onclick="fmBulkOne(\'Download\', \'' + f.name.replace(/'/g, "\\'") + '\')"><i class="hgi-stroke hgi-download-01"></i></button><button class="row-btn del" title="Delete" onclick="fmBulkOne(\'Delete\', \'' + f.name.replace(/'/g, "\\'") + '\')"><i class="hgi-stroke hgi-delete-01"></i></button></div></td>' +
      '</tr>';
  }).join('');
}

function fmRenderList() {
  const q = (document.getElementById('fm-search').value || '').toLowerCase();
  const files = FILES.filter(f => !q || f.name.toLowerCase().indexOf(q) !== -1);
  document.getElementById('fm-list').innerHTML =
    '<table class="data-table"><thead><tr><th style="width:34px"></th><th>Name</th><th>Size</th><th>Modified</th><th style="width:80px"></th></tr></thead><tbody>' +
    fmRows(files) + '</tbody></table>';
  document.getElementById('fm-count').textContent = files.length + ' files';
}

function fmRenderGrid() {
  const q = (document.getElementById('fm-search').value || '').toLowerCase();
  const files = FILES.filter(f => !q || f.name.toLowerCase().indexOf(q) !== -1);
  const grid = document.getElementById('fm-grid');
  grid.innerHTML = files.map(f => {
    const checked = fmSel.has(f.name);
    return '<div class="fm-tile' + (checked ? ' selected' : '') + '" onclick="fmToggle(event, \'' + f.name.replace(/'/g, "\\'") + '\', null)">' +
      '<i class="hgi-stroke ' + f.icon + '" style="color:' + f.color + '"></i>' +
      '<div class="fm-name">' + esc(f.name) + '</div>' +
      '<div class="fm-meta">' + f.size + ' · ' + f.mod + '</div>' +
      '</div>';
  }).join('');
  grid.classList.remove('d-none');
  document.getElementById('fm-count').textContent = files.length + ' files';
}

function fmRender() { fmRenderList(); fmRenderGrid(); }
function fmView(mode) {
  fmViewMode = mode;
  document.getElementById('fm-list').classList.toggle('d-none', mode !== 'list');
  document.getElementById('fm-grid').classList.toggle('d-none', mode !== 'grid');
  document.getElementById('fm-list-btn').classList.toggle('active', mode === 'list');
  document.getElementById('fm-grid-btn').classList.toggle('active', mode === 'grid');
}
function fmFilter() { fmRender(); }
function fmGo(i) {
  const crumbs = ['Home', 'Projects', 'superbyte-admin'];
  if (i === 0) return showToast('success', 'Navigated to Home');
  showToast('success', 'Navigated to ' + crumbs[i]);
}

function fmToggle(ev, name, cb) {
  if (ev && ev.target && (ev.target.classList.contains('row-btn') || ev.target.closest('.row-btn'))) return;
  if (fmSel.has(name)) fmSel.delete(name); else fmSel.add(name);
  if (cb) { ev.stopPropagation(); }
  fmRender();
  fmSelBar();
}

function fmSelBar() {
  const bar = document.getElementById('sel-bar');
  document.getElementById('sel-count').textContent = fmSel.size;
  bar.classList.toggle('visible', fmSel.size > 0);
}

window.fmBulk = function (action) {
  if (!fmSel.size) return showToast('error', 'Nothing selected');
  showToast('success', fmSel.size + ' item(s) ' + action.toLowerCase() + 'd');
  if (action === 'Delete') { fmSel.forEach(n => { const i = FILES.findIndex(f => f.name === n); if (i !== -1) FILES.splice(i, 1); }); fmSel.clear(); fmRender(); fmSelBar(); }
};

window.fmBulkOne = function (action, name) {
  fmSel.clear();
  fmSel.add(name);
  fmBulk(action);
};

window.fmOpen = function (name) {
  showToast('success', 'Opened ' + name);
};

window.__pageInit = fmRender;
