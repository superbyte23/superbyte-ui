/* ── CALENDAR (VANILLA MONTH GRID) ──────────────────────────────────────── */
window._cal = { cur: new Date(), sel: null, events: [] };

(function seed() {
  const now = new Date();
  const at = (offset, hour) => { const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset); d.setHours(hour); return d; };
  const evs = [
    { date: at(0, 9),  title: 'Team standup',  color: '#6366f1', time: '09:00' },
    { date: at(1, 14), title: 'Design review',  color: '#38bdf8', time: '14:00' },
    { date: at(2, 10), title: 'v2.5 release',   color: '#22c55e', time: '10:00' },
    { date: at(3, 16), title: 'Security audit', color: '#f59e0b', time: '16:00' },
    { date: at(4, 11), title: '1:1 — Maria',    color: '#ec4899', time: '11:30' },
    { date: at(6, 12), title: 'Offsite lunch',  color: '#6366f1', time: '12:00' },
    { date: at(8, 9),  title: 'Sprint planning', color: '#6366f1', time: '09:30' },
    { date: at(9, 15), title: 'KPI review',     color: '#38bdf8', time: '15:00' },
    { date: at(10, 13), title: 'Docs sprint',   color: '#22c55e', time: '13:00' },
    { date: at(-1, 17), title: 'Wrap-up demo',  color: '#f59e0b', time: '17:00' }
  ];
  window._cal.events = evs;
})();

function calGo(offset) {
  window._cal.cur = new Date();
  if (offset) window._cal.cur.setDate(window._cal.cur.getDate() + offset);
  calRender();
}
function calShift(d) { window._cal.cur.setMonth(window._cal.cur.getMonth() + d); calRender(); }

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function calRender() {
  const c = window._cal;
  const y = c.cur.getFullYear(), m = c.cur.getMonth();
  const now = new Date();
  const title = document.getElementById('cal-title');
  if (title) title.textContent = c.cur.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  document.getElementById('cal-sub').textContent = 'planning · ' + c.cur.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const first = new Date(y, m, 1);
  const pad = (first.getDay() + 6) % 7;
  const dim = new Date(y, m + 1, 0).getDate();
  const grid = document.getElementById('cal-grid');
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();

  const evsOf = d => c.events.filter(e => sameDay(e.date, d)).sort((a, b) => a.date - b.date);

  for (let i = 0; i < 6 * 7; i++) {
    const cell = document.createElement('div');
    cell.className = 'cal-cell';
    const dayNum = i - pad + 1;
    if (dayNum < 1 || dayNum > dim) { cell.classList.add('muted'); frag.appendChild(cell); continue; }
    const d = new Date(y, m, dayNum);
    if (sameDay(d, now)) cell.classList.add('today');
    if (c.sel && sameDay(d, c.sel)) cell.classList.add('selected');
    const head = document.createElement('div');
    head.className = 'cal-day';
    head.textContent = dayNum;
    cell.appendChild(head);
    const list = document.createElement('div');
    list.className = 'cal-evs';
    const evs = evsOf(d);
    evs.slice(0, 2).forEach(e => {
      const chip = document.createElement('div');
      chip.className = 'cal-ev';
      chip.style.borderLeftColor = e.color;
      chip.style.color = e.color;
      chip.textContent = (e.time ? e.time + ' ' : '') + e.title;
      chip.title = e.title;
      chip.addEventListener('click', ev => { ev.stopPropagation(); showToast('success', e.title + ' — ' + e.time); });
      list.appendChild(chip);
    });
    if (evs.length > 2) {
      const more = document.createElement('div');
      more.className = 'cal-more';
      more.textContent = '+' + (evs.length - 2) + ' more';
      more.addEventListener('click', ev => { ev.stopPropagation(); showToast('success', evs.length + ' events on ' + d.toDateString()); });
      list.appendChild(more);
    }
    cell.appendChild(list);
    cell.addEventListener('click', () => { c.sel = d; document.getElementById('ev-date').value = d.toISOString().slice(0, 10); calRender(); });
    frag.appendChild(cell);
  }
  grid.appendChild(frag);
  calUpcoming();
}

function calUpcoming() {
  const box = document.getElementById('cal-upcoming');
  const now = new Date();
  const upcoming = window._cal.events
    .filter(e => e.date >= now)
    .sort((a, b) => a.date - b.date)
    .slice(0, 5);
  box.innerHTML = '';
  if (!upcoming.length) { box.innerHTML = '<div class="empty-state" style="padding:30px 14px"><i class="hgi-stroke hgi-calendar-check-in-01"></i><p>Nothing scheduled</p></div>'; return; }
  upcoming.forEach(e => {
    const row = document.createElement('div');
    row.className = 'cal-up-row';
    const day = document.createElement('div');
    day.className = 'cal-up-day';
    const when = document.createElement('div');
    when.textContent = e.date.getDate();
    day.appendChild(when);
    day.insertAdjacentHTML('beforeend', '<small>' + e.date.toLocaleString('en-US', { month: 'short' }) + '</small>');
    row.appendChild(day);
    const info = document.createElement('div');
    info.style.cssText = 'flex:1;min-width:0';
    info.innerHTML = '<div style="font-size:12.5px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(e.title) + '</div><div style="font-size:11px;color:var(--text3)">' + (e.time || 'all day') + ' · <span class="cal-dot" style="background:' + e.color + '"></span></div>';
    row.appendChild(info);
    box.appendChild(row);
  });
}

window.calAdd = function () {
  const t = document.getElementById('ev-title').value.trim();
  const raw = document.getElementById('ev-date').value;
  if (!t) return showToast('error', 'Title required');
  const d = raw ? new Date(raw + 'T09:00:00') : new Date();
  const active = document.querySelector('#ev-colors .active');
  window._cal.events.push({ date: d, title: t, color: active ? active.dataset.c : '#6366f1', time: '09:00' });
  window._cal.sel = d;
  calRender();
  showToast('success', 'Event added');
};

document.querySelectorAll('#ev-colors .cal-dot-lg').forEach(dot => {
  dot.addEventListener('click', () => {
    document.querySelectorAll('#ev-colors .cal-dot-lg').forEach(x => x.classList.remove('active'));
    dot.classList.add('active');
  });
});
if (document.getElementById('ev-date')) document.getElementById('ev-date').valueAsDate = new Date();

window.__pageInit = calRender;
