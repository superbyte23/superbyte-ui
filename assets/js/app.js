/* ══════════════════════════════════════════════════════════════════════════
   Superbyte Admin — shared app logic
   Loaded at the end of <body> on every page. Page-specific scripts should be
   placed BEFORE this file and may expose a `window.__chartInit` hook which is
   re-invoked whenever theme, accent or radius preferences change.
   ══════════════════════════════════════════════════════════════════════════ */

/* ── HTML ESCAPING ──────────────────────────────────────────────────────── */
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ── TOASTS ─────────────────────────────────────────────────────────────── */
function showToast(type, msg) {
  const c = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast-custom ' + type;
  el.innerHTML = `<i class="hgi-stroke ${type==='success'?'hgi-checkmark-circle-01':'hgi-cancel-circle'} ${type}"></i><span>${esc(msg)}</span>`;
  c.appendChild(el);
  setTimeout(() => { el.style.animation = 'toastIn .2s ease reverse'; setTimeout(()=>el.remove(), 180); }, 3000);
}

/* ── THEME: appearance (dark/light) ────────────────────────────────────── */
function applyAppearance(mode) {
  document.body.setAttribute('data-bs-theme', mode);
  const icon = document.getElementById('theme-icon');
  if (icon) icon.className = mode === 'dark' ? 'hgi-stroke hgi-moon-01' : 'hgi-stroke hgi-sun-01';
  const optDark = document.getElementById('opt-dark');
  const optLight = document.getElementById('opt-light');
  if (optDark) optDark.classList.toggle('active', mode === 'dark');
  if (optLight) optLight.classList.toggle('active', mode === 'light');
  try { localStorage.setItem('grid_admin_theme', mode); } catch (e) {}
}
function setAppearance(mode) {
  applyAppearance(mode);
  applyThemeColor(activeThemeKey);
  refreshCharts();
}
function toggleTheme() {
  setAppearance(document.body.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark');
}

/* ── THEME: accent color ───────────────────────────────────────────────── */
const THEMES = {
  indigo:  { name:'Indigo',  base:'#6366f1', hi:'#818cf8', rgb:'99,102,241'   },
  violet:  { name:'Violet',  base:'#8b5cf6', hi:'#a78bfa', rgb:'139,92,246'   },
  fuchsia: { name:'Fuchsia', base:'#d946ef', hi:'#e879f9', rgb:'217,70,239'   },
  pink:    { name:'Pink',    base:'#ec4899', hi:'#f472b6', rgb:'236,72,153'   },
  rose:    { name:'Rose',    base:'#f43f5e', hi:'#fb7185', rgb:'244,63,94'    },
  red:     { name:'Red',     base:'#ef4444', hi:'#f87171', rgb:'239,68,68'    },
  orange:  { name:'Orange',  base:'#f97316', hi:'#fb923c', rgb:'249,115,22'   },
  amber:   { name:'Amber',   base:'#f59e0b', hi:'#fbbf24', rgb:'245,158,11'   },
  yellow:  { name:'Yellow',  base:'#eab308', hi:'#facc15', rgb:'234,179,8'    },
  lime:    { name:'Lime',    base:'#84cc16', hi:'#a3e635', rgb:'132,204,22'   },
  green:   { name:'Green',   base:'#22c55e', hi:'#4ade80', rgb:'34,197,94'    },
  emerald: { name:'Emerald', base:'#10b981', hi:'#34d399', rgb:'16,185,129'   },
  teal:    { name:'Teal',    base:'#14b8a6', hi:'#2dd4bf', rgb:'20,184,166'   },
  cyan:    { name:'Cyan',    base:'#06b6d4', hi:'#22d3ee', rgb:'6,182,212'    },
  sky:     { name:'Sky',     base:'#0ea5e9', hi:'#38bdf8', rgb:'14,165,233'   },
  blue:    { name:'Blue',    base:'#3b82f6', hi:'#60a5fa', rgb:'59,130,246'   },
  purple:  { name:'Purple',  base:'#a855f7', hi:'#c084fc', rgb:'168,85,247'   },
  white:   { name:'White',   base:'#ffffff', hi:'#e5e7eb', rgb:'255,255,255' },
  dark:    { name:'Dark',    base:'#111827', hi:'#1f2937', rgb:'17,24,39'    },
};
let activeThemeKey = 'indigo';

function getContrastText(hex) {
  const clean = String(hex).replace('#', '');
  const r = parseInt(clean.substr(0, 2), 16);
  const g = parseInt(clean.substr(2, 2), 16);
  const b = parseInt(clean.substr(4, 2), 16);
  const luma = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luma > 0.72 ? '#111827' : '#ffffff';
}

const swatchGrid = document.getElementById('swatch-grid');
if (swatchGrid) {
  Object.entries(THEMES).forEach(([key, t]) => {
    const el = document.createElement('div');
    el.className = 'swatch' + (key === activeThemeKey ? ' active' : '');
    el.style.background = t.base;
    el.title = t.name;
    el.dataset.key = key;
    el.addEventListener('click', () => { applyThemeColor(key); refreshCharts(); });
    swatchGrid.appendChild(el);
  });
}

function applyThemeColor(key) {
  const t = THEMES[key];
  activeThemeKey = key;
  // must be set on <body>, not <html>: [data-bs-theme] lives on body, and its
  // own dark/light rule would otherwise win over an inherited value from html
  const light = document.body.getAttribute('data-bs-theme') === 'light';
  const root = document.body.style;
  const contrastText = getContrastText(t.base);
  root.setProperty('--accent', t.base);
  root.setProperty('--accent-h', t.hi);
  root.setProperty('--accent-text', contrastText);
  root.setProperty('--accent-bg', `rgba(${t.rgb},${light ? '.08' : '.12'})`);
  root.setProperty('--bs-primary', t.base);
  root.setProperty('--bs-primary-rgb', t.rgb);
  document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('active', s.dataset.key === key));
  try { localStorage.setItem('grid_admin_accent', key); } catch (e) {}
}

/* ── THEME: corner radius ──────────────────────────────────────────────── */
function setRadius(radius, radiusSm, el) {
  const root = document.body.style;
  root.setProperty('--radius', radius);
  root.setProperty('--radius-sm', radiusSm);
  root.setProperty('--bs-border-radius', radius);
  root.setProperty('--bs-border-radius-sm', radiusSm);
  document.querySelectorAll('.radius-opt').forEach(o => o.classList.remove('active'));
  if (el) el.classList.add('active');
  try { localStorage.setItem('grid_admin_radius', radius); } catch (e) {}
}

/* ── THEME: base (neutral) palette ───────────────────────────────────────
   Keys map to CSS overrides in app.css via body[data-base-theme="…"],
   mini-sidebar with [data-bs-theme="light"/"dark"]. "neutral" is the default
   (no override needed). */
const BASE_THEMES = {
  neutral: { name:'Neutral' },
  stone:   { name:'Stone' },
  zinc:    { name:'Zinc' },
  mauve:   { name:'Mauve' },
  olive:   { name:'Olive' },
  mist:    { name:'Mist' },
  taupe:   { name:'Taupe' }
};
let activeBaseTheme = 'neutral';
function setBaseTheme(key) {
  if (!BASE_THEMES[key]) return;
  activeBaseTheme = key;
  document.body.setAttribute('data-base-theme', key);
  try { localStorage.setItem('grid_admin_basetheme', key); } catch (e) {}
  refreshCharts();
}

/* ── THEME: base font family ─────────────────────────────────────────────
   Families are vendored locally (vendor/fonts/theme-fonts.css). */
const FONTS = {
  ubuntu:         { name:'Ubuntu',            stack:"'Ubuntu', sans-serif" },
  inter:          { name:'Inter',             stack:"'Inter', 'Ubuntu', sans-serif" },
  notosans:       { name:'Noto Sans',         stack:"'Noto Sans', 'Ubuntu', sans-serif" },
  nunitosans:     { name:'Nunito Sans',       stack:"'Nunito Sans', 'Ubuntu', sans-serif" },
  figtree:        { name:'Figtree',           stack:"'Figtree', 'Ubuntu', sans-serif" },
  roboto:         { name:'Roboto',            stack:"'Roboto', 'Ubuntu', sans-serif" },
  raleway:        { name:'Raleway',           stack:"'Raleway', 'Ubuntu', sans-serif" },
  dmsans:         { name:'DM Sans',           stack:"'DM Sans', 'Ubuntu', sans-serif" },
  publicsans:     { name:'Public Sans',       stack:"'Public Sans', 'Ubuntu', sans-serif" },
  outfit:         { name:'Outfit',            stack:"'Outfit', 'Ubuntu', sans-serif" },
  oxanium:        { name:'Oxanium',           stack:"'Oxanium', 'Ubuntu', sans-serif" },
  manrope:        { name:'Manrope',           stack:"'Manrope', 'Ubuntu', sans-serif" },
  spacegrotesk:   { name:'Space Grotesk',     stack:"'Space Grotesk', 'Ubuntu', sans-serif" },
  montserrat:     { name:'Montserrat',        stack:"'Montserrat', 'Ubuntu', sans-serif" },
  ibmplexsans:    { name:'IBM Plex Sans',     stack:"'IBM Plex Sans', 'Ubuntu', sans-serif" },
  sourcesans3:    { name:'Source Sans 3',     stack:"'Source Sans 3', 'Ubuntu', sans-serif" },
  instrumentsans: { name:'Instrument Sans',   stack:"'Instrument Sans', 'Ubuntu', sans-serif" }
};
let activeFont = 'ubuntu';
function setFont(key) {
  const f = FONTS[key];
  if (!f) return;
  activeFont = key;
  document.body.style.setProperty('--sans', f.stack);
  try { localStorage.setItem('grid_admin_font', key); } catch (e) {}
}

/* ── LAYOUT: compact mode / boxed content / base font size ─────────────── */
function setCompact(on) {
  document.body.classList.toggle('layout-compact', on);
  const optCompact = document.getElementById('opt-compact');
  const optRoomy = document.getElementById('opt-roomy');
  if (optCompact) optCompact.classList.toggle('active', on);
  if (optRoomy) optRoomy.classList.toggle('active', !on);
  try { localStorage.setItem('grid_admin_compact', on ? '1' : '0'); } catch (e) {}
}
const WIDTH_MODES = ['boxed', 'fluid', 'contained'];
function setLayoutMode(mode) {
  const b = document.body.classList;
  // Navigation frame: vertical (no class) / horizontal / mini-sidebar — mutually exclusive.
  b.remove('layout-horizontal', 'layout-mini-sidebar');
  if (mode === 'horizontal') b.add('layout-horizontal');
  else if (mode === 'mini-sidebar') b.add('layout-mini-sidebar');

  // Density (orthogonal to the frame) — condensed is compact, comfy is roomy.
  if (mode === 'condensed') setCompact(true);
  else if (mode === 'comfy') setCompact(false);

  try { localStorage.setItem('grid_admin_layout_mode', mode); } catch (e) {}

  const layoutGroup = document.querySelector('[data-layout-group="layout"]');
  if (layoutGroup) {
    layoutGroup.classList.toggle('open', mode === 'mini-sidebar' || layoutGroup.querySelector('.side-link.active'));
    const toggle = layoutGroup.querySelector('.side-group-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', layoutGroup.classList.contains('open'));
  }

  document.querySelectorAll('[data-layout-mode]').forEach(link => {
    link.classList.toggle('active', link.dataset.layoutMode === mode);
  });
}
function setWidthMode(mode) {
  const b = document.body.classList;
  // Content width: fluid (default) / boxed / contained — mutually exclusive.
  b.remove('layout-boxed', 'layout-contained', 'layout-fluid');
  if (mode === 'boxed') b.add('layout-boxed');
  else if (mode === 'contained') b.add('layout-contained');
  else if (mode === 'fluid') b.add('layout-fluid');
  try {
    localStorage.setItem('grid_admin_width_mode', mode);
    localStorage.setItem('grid_admin_boxed', mode === 'boxed' ? '1' : '0');
  } catch (e) {}
  document.querySelectorAll('[data-width-mode]').forEach(link => {
    link.classList.toggle('active', link.dataset.widthMode === mode);
  });
}
function setFontSize(n) {
  n = Math.min(17, Math.max(13, parseInt(n, 10)));
  document.documentElement.style.fontSize = n + 'px';
  const out = document.getElementById('fs-out');
  const rng = document.getElementById('fs-range');
  if (out) out.textContent = n + 'px';
  if (rng) rng.value = n;
  try { localStorage.setItem('grid_admin_fontsize', String(n)); } catch (e) {}
}

/* ── PER-PAGE CHART HOOK ─────────────────────────────────────────────────
   Pages with charts define `initCharts()` and set `window.__chartInit`.
   Everything else calls refreshCharts(), which is a safe no-op without it. */
function refreshCharts() {
  if (typeof window.__chartInit === 'function') window.__chartInit();
}

/* ── PER-PAGE INIT HOOK ──────────────────────────────────────────────────
   Non-chart pages (calendar, email, file manager, kanban…) register
   `window.__pageInit` before app.js loads. It runs after the shared helpers
   (esc, showToast…) are defined and prefs are restored, so initial renders
   can rely on them. */
function runPageInit() {
  if (typeof window.__pageInit === 'function') window.__pageInit();
}

/* ── CHART COLOR RESOLUTION ──────────────────────────────────────────────
   Reads the resolved CSS custom properties at call time so charts follow
   the active accent + theme. Used by page-level initCharts(). */
function themeVars() {
  const cs = getComputedStyle(document.body);
  const g = k => cs.getPropertyValue(k).trim();
  return {
    accent:   g('--accent'),
    accentHi: g('--accent-h'),
    rgb:      g('--bs-primary-rgb'),
    grid:     g('--surface2'),
    border:   g('--surface'),
    border2:  g('--border2'),
    green:    g('--green'),
    text2:    g('--text2'),
    text3:    g('--text3')
  };
}

/* ── SIDEBAR ───────────────────────────────────────────────────────────── */
function openSidebar(){ document.getElementById('sidebar').classList.add('open'); document.getElementById('sidebar-overlay').classList.add('open'); }
function closeSidebar(){ document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebar-overlay').classList.remove('open'); }

/* ── SIDEBAR SUB-MENUS ─────────────────────────────────────────────────── */
document.querySelectorAll('.side-group-toggle').forEach(t => {
  t.addEventListener('click', () => {
    // Auto-show modes: dropdowns open on hover (or keyboard .kb-open).
    // Horizontal is always auto-show on desktop; below the desktop breakpoint
    // it falls back to the vertical off-canvas drawer, so the click-accordion
    // stays active. Mini-sidebar only keeps the click-toggle accordion on
    // mobile too.
    const horizontalDesktop = document.body.classList.contains('layout-horizontal') && window.matchMedia('(min-width: 992px)').matches;
    const miniSidebarDesktop = document.body.classList.contains('layout-mini-sidebar') && window.matchMedia('(min-width: 992px)').matches;
    if (horizontalDesktop || miniSidebarDesktop) return;
    const g = t.closest('.side-group');
    g.classList.toggle('open');
    t.setAttribute('aria-expanded', g.classList.contains('open'));
  });
  t.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.click(); }
  });
});
/* Keyboard access for the auto-show top nav / rail: Tab to a top-level menu
   and it opens (via .kb-open); the dropdown stays open while focus is inside
   the group. Mouse clicks never pin a dropdown open — that's hover-only. */
let kbNav = false;
document.addEventListener('keydown', () => { kbNav = true; });
document.addEventListener('mousedown', () => { kbNav = false; });
document.querySelectorAll('.side-group').forEach(g => {
  g.addEventListener('focusin', () => {
    if (kbNav && (document.body.classList.contains('layout-horizontal') || document.body.classList.contains('layout-mini-sidebar'))) {
      g.classList.add('kb-open');
    }
  });
  g.addEventListener('focusout', e => {
    if (!g.contains(e.relatedTarget)) g.classList.remove('kb-open');
  });
});
document.querySelectorAll('.side-group').forEach(g => {
  if (g.querySelector('.side-link.active')) g.classList.add('open');
});
/* Sidebar collapse/expand toggle between the full vertical sidebar and the
   mini-sidebar rail. Always present; CSS shows it on the right of the logo in
   the vertical family and as a hover-reveal replacing the logo mark in the
   mini-sidebar. Clicking switches between the two modes. */
(function initSidebarToggle() {
  const logo = document.querySelector('.sidebar-logo');
  if (!logo || logo.querySelector('.sidebar-toggle')) return;
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'sidebar-toggle';
  btn.title = 'Toggle sidebar';
  btn.setAttribute('aria-label', 'Toggle sidebar');
  btn.innerHTML = '<i class="hgi hgi-stroke hgi-sidebar-left-01"></i>';
  btn.addEventListener('click', () => {
    setLayoutMode(document.body.classList.contains('layout-mini-sidebar') ? 'vertical' : 'mini-sidebar');
  });
  logo.appendChild(btn);
})();
document.querySelectorAll('[data-layout-mode]').forEach(link => {
  link.addEventListener('click', e => {
    // Sidebar links (data-layout-nav) navigate to the dedicated preset pages.
    if (link.hasAttribute('data-layout-nav')) return;
    e.preventDefault();
    setLayoutMode(link.dataset.layoutMode);
    const label = link.textContent.trim();
    showToast('success', 'Layout switched to ' + label);
  });
});
// Content width is an orthogonal axis (boxed / fluid / contained) switched
// in place from the customizer — no navigation involved.
document.querySelectorAll('[data-width-mode]').forEach(opt => {
  opt.addEventListener('click', e => {
    e.preventDefault();
    setWidthMode(opt.dataset.widthMode);
    const label = opt.textContent.trim();
    showToast('success', 'Content width switched to ' + label);
  });
});
// Dedicated preset pages (layout-*.html) force their own axes even if storage
// says otherwise — match theme-bootstrap.js so the layout never reflows late.
// theme-bootstrap.js applied the classes pre-paint, before first paint; this
// pass reads what is already on <body> as the single source of truth and only
// syncs storage + customizer active markers (all idempotent), so the layout can
// never change after the browser restores the scroll position on refresh. If
// the pre-paint pass has not run yet, the exact same derivation is mirrored
// here so both scripts always agree.
const comboPage = /layout-(vertical|horizontal|mini-sidebar)(?:-(boxed|contained))?\.html$/.exec(location.pathname);
const densityPage = /layout-(condensed|comfy)\.html$/.exec(location.pathname);
const bodyCls = document.body.classList;
const storedNav = localStorage.getItem('grid_admin_layout_mode');
const storedCompact = localStorage.getItem('grid_admin_compact');
const preApplied = bodyCls.contains('layout-fluid') || bodyCls.contains('layout-boxed')
  || bodyCls.contains('layout-contained');
let nav = comboPage ? comboPage[1] : null;
let width = comboPage ? (comboPage[2] || 'fluid') : null;
let compact;
if (preApplied) {
  if (!nav) nav = bodyCls.contains('layout-horizontal') ? 'horizontal'
    : bodyCls.contains('layout-mini-sidebar') ? 'mini-sidebar' : 'vertical';
  if (!width) width = bodyCls.contains('layout-boxed') ? 'boxed'
    : bodyCls.contains('layout-contained') ? 'contained' : 'fluid';
  compact = bodyCls.contains('layout-compact');
} else {
  if (!nav) nav = (storedNav === 'horizontal' || storedNav === 'mini-sidebar' || storedNav === 'vertical') ? storedNav : 'vertical';
  if (!width) width = localStorage.getItem('grid_admin_width_mode') || (localStorage.getItem('grid_admin_boxed') === '1' ? 'boxed' : 'fluid');
  // Mirrors theme-bootstrap.js: legacy condensed/comfy in the nav key is a
  // density signal, not a nav frame.
  compact = densityPage ? densityPage[1] === 'condensed'
    : (storedNav === 'condensed' || storedNav === 'comfy') ? storedNav === 'condensed'
    : storedCompact === '1';
}
if (densityPage) compact = densityPage[1] === 'condensed';
setLayoutMode(nav);
setCompact(compact);
setWidthMode(width);
// Highlight the matching sidebar Layout shortcut (data-layout-page) on preset
// pages; non-preset pages leave the sidebar Layout menu unhighlighted.
const pageKey = densityPage ? densityPage[1] : (comboPage ? comboPage[1] + (comboPage[2] ? '-' + comboPage[2] : '') : null);
if (pageKey) {
  document.querySelectorAll('[data-layout-page]').forEach(link => {
    link.classList.toggle('active', link.dataset.layoutPage === pageKey);
  });
}
document.querySelectorAll('.icon-btn, .avatar-btn').forEach(el => {
  el.setAttribute('tabindex', '0');
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
  });
});

/* ── ANALYTICS TABS (cosmetic) ─────────────────────────────────────────── */
document.querySelectorAll('[data-tab]').forEach(t => t.addEventListener('click', () => {
  document.querySelectorAll('[data-tab]').forEach(x => x.classList.remove('active'));
  t.classList.add('active');
}));

/* ── TOOLTIPS / POPOVERS ───────────────────────────────────────────────── */
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => new bootstrap.Tooltip(el));
document.querySelectorAll('[data-bs-toggle="popover"]').forEach(el => new bootstrap.Popover(el));

/* ── DROPZONES ─────────────────────────────────────────────────────────── */
const dropFile = document.getElementById('drop-file');
if (dropFile) {
  document.querySelectorAll('.dropzone').forEach(z => {
    z.setAttribute('tabindex', '0');
    z.setAttribute('role', 'button');
    z.addEventListener('click', () => dropFile.click());
    z.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); dropFile.click(); }
    });
  });
  dropFile.addEventListener('change', () => {
    const n = dropFile.files.length;
    if (n) showToast('success', n + ' file(s) selected');
    dropFile.value = '';
  });
}

/* ── LOADING OVERLAY (first page load per session) ─────────────────────── */
(function () {
  if (sessionStorage.getItem('grid_admin_loaded')) return;
  sessionStorage.setItem('grid_admin_loaded', '1');
  const ov = document.createElement('div');
  ov.id = 'loading-overlay';
  ov.innerHTML = '<div class="loader"><span></span><span></span><span></span><span></span><span></span><span></span></div>';
  document.body.appendChild(ov);
  requestAnimationFrame(() => ov.classList.add('done'));
  setTimeout(() => ov.remove(), 900);
})();

/* ── SCROLL TO TOP ─────────────────────────────────────────────────────── */
(function () {
  const btn = document.createElement('button');
  btn.id = 'scroll-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="hgi-stroke hgi-arrow-up-01"></i>';
  document.body.appendChild(btn);
  const onScroll = () => btn.classList.toggle('show', (window.scrollY || document.documentElement.scrollTop) > 400);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── QUICK SEARCH PALETTE (Ctrl+K / /, and toolbar input) ─────────────── */
(function () {
  const links = Array.from(document.querySelectorAll('#sidebar a.side-link[href]'))
    .map(a => ({ label: a.textContent.trim().replace(/\s+/g, ' '), href: a.getAttribute('href') }))
    .filter(l => l.label && l.href && !l.href.startsWith('#'));
  const keyOf = l => (l.label + ' ' + l.href).toLowerCase();
  const input = document.getElementById('global-search');

  const modal = document.createElement('div');
  modal.id = 'quick-search';
  modal.innerHTML = '<div class="qs-box">' +
    '<div class="qs-head"><i class="hgi-stroke hgi-search-01"></i>' +
    '<input class="qs-input" type="text" placeholder="Type to search pages…" autocomplete="off">' +
    '<button type="button" class="qs-close" aria-label="Close"><i class="hgi-stroke hgi-cancel-01"></i></button></div>' +
    '<div class="qs-body"></div>' +
    '<div class="qs-foot"><span>↑↓ navigate</span><span>↵ open</span><span>esc close</span></div></div>';
  document.body.appendChild(modal);

  const box = modal.querySelector('.qs-box');
  const qsInput = modal.querySelector('.qs-input');
  const bodyEl = modal.querySelector('.qs-body');
  let results = [];
  let selected = -1;

  function render(q) {
    q = q.trim().toLowerCase();
    results = q ? links.filter(l => keyOf(l).includes(q)) : links.slice(0, 8);
    selected = results.length ? 0 : -1;
    if (!results.length) {
      bodyEl.innerHTML = '<div class="qs-empty"><i class="hgi-stroke hgi-search-minus"></i> No matching pages</div>';
      return;
    }
    bodyEl.innerHTML = results.map(l =>
      `<a class="qs-item" href="${l.href}"><span class="qs-label">${esc(l.label)}</span><span class="qs-hint">${esc(l.href)}</span></a>`).join('');
    mark();
  }
  function mark() {
    bodyEl.querySelectorAll('.qs-item').forEach((el, i) => el.classList.toggle('sel', i === selected));
    const cur = bodyEl.querySelector('.qs-item.sel');
    if (cur) cur.scrollIntoView({ block: 'nearest' });
  }
  function open() {
    if (!results.length) return;
    window.location.href = results[selected >= 0 ? selected : 0].href;
  }
  function show() {
    modal.classList.add('open');
    qsInput.value = '';
    render('');
    qsInput.focus();
  }
  function hide() {
    modal.classList.remove('open');
    if (input) input.blur();
  }

  modal.addEventListener('mousedown', e => { if (e.target === modal) hide(); });
  modal.querySelector('.qs-close').addEventListener('click', hide);
  bodyEl.addEventListener('click', e => {
    const item = e.target.closest('.qs-item');
    if (item) { e.preventDefault(); window.location.href = item.getAttribute('href'); }
  });
  qsInput.addEventListener('input', () => render(qsInput.value));
  qsInput.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); selected = (selected + 1) % results.length; mark(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); selected = (selected - 1 + results.length) % results.length; mark(); }
    else if (e.key === 'Enter') { e.preventDefault(); open(); }
    else if (e.key === 'Escape') { e.preventDefault(); hide(); }
  });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); show(); }
    else if (e.key === 'Escape' && modal.classList.contains('open')) hide();
    else if (e.key === '/' && !e.ctrlKey && !e.metaKey && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
      e.preventDefault(); show();
    }
  });
  if (input) input.addEventListener('focus', show);
})();

/* ── NOTIFICATIONS: mark-as-read + badge ───────────────────────────────── */
(function () {
  const bell = document.querySelector('.icon-btn[data-bs-toggle="dropdown"] .hgi-notification-01');
  if (!bell) return;
  const wrap = bell.closest('.dropdown');
  const menu = wrap && wrap.querySelector('.dropdown-menu');
  const ping = bell.parentElement.querySelector('.ping');
  if (!wrap || !menu || !ping) return;

  const notifs = Array.from(menu.querySelectorAll('.dropdown-item'))
    .filter(i => i.querySelector('small'));
  const divider = menu.querySelector('.dropdown-divider');
  if (divider) {
    const li = document.createElement('li');
    li.innerHTML = '<a class="dropdown-item text-center mark-all" href="#" style="color:var(--accent-h)">Mark all as read</a>';
    divider.insertAdjacentElement('afterend', li);
  }

  function updatePing() {
    const n = notifs.filter(i => !i.classList.contains('read')).length;
    ping.textContent = n || '';
    ping.style.display = n ? '' : 'none';
  }
  notifs.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      item.classList.add('read');
      updatePing();
      showToast('success', 'Notification marked as read');
    });
  });
  menu.querySelectorAll('.mark-all').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      notifs.forEach(i => i.classList.add('read'));
      updatePing();
      showToast('success', 'All notifications marked as read');
    });
  });
  updatePing();
})();

/* ── RESTORE SAVED PREFERENCES ─────────────────────────────────────────── */
(function restorePrefs() {
  const radiusMap = { '4px':['4px','2px'], '8px':['8px','4px'], '14px':['14px','8px'] };
  const radiusIds = { '4px':'radius-sharp', '8px':'radius-default', '14px':'radius-round' };
  try {
    const theme = localStorage.getItem('grid_admin_theme');
    const accent = localStorage.getItem('grid_admin_accent');
    const radius = localStorage.getItem('grid_admin_radius');
    const fontsize = localStorage.getItem('grid_admin_fontsize');
    const basetheme = localStorage.getItem('grid_admin_basetheme');
    const font = localStorage.getItem('grid_admin_font');
    if (theme === 'dark' || theme === 'light') applyAppearance(theme);
    if (accent && THEMES[accent]) applyThemeColor(accent);
    if (radius && radiusMap[radius]) {
      const [r, rs] = radiusMap[radius];
      setRadius(r, rs, document.getElementById(radiusIds[radius]));
    }
    if (basetheme && BASE_THEMES[basetheme]) {
      activeBaseTheme = basetheme;
      document.body.setAttribute('data-base-theme', basetheme);
    }
    if (font && FONTS[font]) setFont(font);
    if (fontsize && fontsize >= 13 && fontsize <= 17) setFontSize(fontsize);
  } catch (e) {}
  refreshCharts();
  runPageInit();
})();
