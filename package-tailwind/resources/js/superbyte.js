/* Superbyte UI — runtime behaviors (theme engine + components).
   Plain IIFE, no build step required. Provides:
     - window.SuperbyteUi  (toggleTheme, setAppearance, applyThemeColor,
                            setRadius, setFont, setFontSize, showToast,
                            openModal, closeModal, openDropdown, closeDropdowns, esc)
     - kit-compatible aliases: window.toggleTheme, window.showToast,
       window.openModal, window.closeModal
     - declarative bindings: modals + dropdowns + toasts via data-bs-* and
       data-sb-* attributes (re-bound on Livewire / Turbo navigations). */
(function () {
  'use strict';

  var THEMES = {"indigo":{"name":"Brand","base":"#2961fd","hi":"#5b8bfc","rgb":"41,97,253"},"violet":{"base":"#8b5cf6","hi":"#a78bfa","rgb":"139,92,246"},"fuchsia":{"base":"#d946ef","hi":"#e879f9","rgb":"217,70,239"},"pink":{"base":"#ec4899","hi":"#f472b6","rgb":"236,72,153"},"rose":{"base":"#f43f5e","hi":"#fb7185","rgb":"244,63,94"},"red":{"base":"#ef4444","hi":"#f87171","rgb":"239,68,68"},"orange":{"base":"#f97316","hi":"#fb923c","rgb":"249,115,22"},"amber":{"base":"#f59e0b","hi":"#fbbf24","rgb":"245,158,11"},"yellow":{"base":"#eab308","hi":"#facc15","rgb":"234,179,8"},"lime":{"base":"#84cc16","hi":"#a3e635","rgb":"132,204,22"},"green":{"base":"#22c55e","hi":"#4ade80","rgb":"34,197,94"},"emerald":{"base":"#10b981","hi":"#34d399","rgb":"16,185,129"},"teal":{"base":"#14b8a6","hi":"#2dd4bf","rgb":"20,184,166"},"cyan":{"base":"#06b6d4","hi":"#22d3ee","rgb":"6,182,212"},"sky":{"base":"#0ea5e9","hi":"#38bdf8","rgb":"14,165,233"},"blue":{"base":"#3b82f6","hi":"#60a5fa","rgb":"59,130,246"},"purple":{"base":"#a855f7","hi":"#c084fc","rgb":"168,85,247"}};
  var FONTS = {"ubuntu":{"stack":"'Ubuntu', sans-serif"},"inter":{"stack":"'Inter', 'Ubuntu', sans-serif"},"notosans":{"stack":"'Noto Sans', 'Ubuntu', sans-serif"},"nunitosans":{"stack":"'Nunito Sans', 'Ubuntu', sans-serif"},"figtree":{"stack":"'Figtree', 'Ubuntu', sans-serif"},"roboto":{"stack":"'Roboto', 'Ubuntu', sans-serif"},"raleway":{"stack":"'Raleway', 'Ubuntu', sans-serif"},"dmsans":{"stack":"'DM Sans', 'Ubuntu', sans-serif"},"publicsans":{"stack":"'Public Sans', 'Ubuntu', sans-serif"},"outfit":{"stack":"'Outfit', 'Ubuntu', sans-serif"},"oxanium":{"stack":"'Oxanium', 'Ubuntu', sans-serif"},"manrope":{"stack":"'Manrope', 'Ubuntu', sans-serif"},"spacegrotesk":{"stack":"'Space Grotesk', 'Ubuntu', sans-serif"},"montserrat":{"stack":"'Montserrat', 'Ubuntu', sans-serif"},"ibmplexsans":{"stack":"'IBM Plex Sans', 'Ubuntu', sans-serif"},"sourcesans3":{"stack":"'Source Sans 3', 'Ubuntu', sans-serif"},"instrumentsans":{"stack":"'Instrument Sans', 'Ubuntu', sans-serif"}};
  var RADII = { '4px': ['4px', '2px'], '8px': ['8px', '4px'], '14px': ['14px', '8px'] };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function accentText(base) {
    var c = base.replace('#', '');
    var r = parseInt(c.substr(0, 2), 16), g = parseInt(c.substr(2, 2), 16), b = parseInt(c.substr(4, 2), 16);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.72 ? '#111827' : '#ffffff';
  }

  function currentMode() {
    var key = (window.SuperbyteUiPrefs && window.SuperbyteUiPrefs.key) || 'grid_admin_theme';
    var saved = localStorage.getItem(key);
    if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    var def = (window.SuperbyteUiPrefs && window.SuperbyteUiPrefs.theme) || 'dark';
    return def;
  }

  function applyMode(mode, persist) {
    var key = (window.SuperbyteUiPrefs && window.SuperbyteUiPrefs.key) || 'grid_admin_theme';
    var resolved = mode === 'system'
      ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
      : (mode === 'light' ? 'light' : 'dark');
    var html = document.documentElement;
    html.classList.remove('light', 'dark');
    html.classList.add(resolved);
    if (persist) localStorage.setItem(key, mode);
    return resolved;
  }

  function applyAccent(color, persist) {
    var t = THEMES[color];
    var light = document.documentElement.classList.contains('light');
    if (!t) return;
    var hl = document.documentElement.style;
    hl.setProperty('--accent', t.base);
    hl.setProperty('--accent-h', t.hi);
    hl.setProperty('--accent-text', accentText(t.base));
    hl.setProperty('--accent-rgb', t.rgb);
    hl.setProperty('--accent-bg', 'rgba(' + t.rgb + ',' + (light ? '.08' : '.12') + ')');
    if (persist) localStorage.setItem('grid_admin_accent', color);
  }

  function applyRadius(radius, persist) {
    var p = RADII[radius];
    if (!p) return;
    var hl = document.documentElement.style;
    hl.setProperty('--radius', p[0]);
    hl.setProperty('--radius-sm', p[1]);
    if (persist) localStorage.setItem('grid_admin_radius', radius);
  }

  function applyFont(font, persist) {
    var f = FONTS[font];
    if (!f) return;
    document.documentElement.style.setProperty('--sans', f.stack);
    if (persist) localStorage.setItem('grid_admin_font', font);
  }

  function applyFontSize(size, persist) {
    var px = Math.min(17, Math.max(13, parseInt(size, 10) || 14));
    document.documentElement.style.fontSize = px + 'px';
    if (persist) localStorage.setItem('grid_admin_fontsize', String(px));
  }

  function toggleTheme() {
    var mode = currentMode();
    var next = mode === 'system'
      ? (document.documentElement.classList.contains('light') ? 'dark' : 'light')
      : (mode === 'light' ? 'dark' : 'light');
    applyMode(next, true);
    return next;
  }

  /* ── Toast ── */
  function showToast(type, msg) {
    var c = document.getElementById('toast-container');
    if (!c) return;
    var el = document.createElement('div');
    el.className = 'toast-custom ' + type;
    var icon = type === 'success' ? 'circle-check' : 'circle-x';
    el.innerHTML = '<i data-lucide="' + icon + '" class="' + (type === 'success' ? 'success' : 'error') + '"></i><span>' + esc(msg) + '</span>';
    c.appendChild(el);
    setTimeout(function () {
      el.style.animation = 'toastIn .2s ease reverse';
      setTimeout(function () { el.remove(); }, 180);
    }, 3000);
  }

  /* ── Modal ── */
  function openModal(el) {
    el.classList.add('open');
    var back = el.querySelector('.modal-backdrop');
    if (!back) {
      back = document.createElement('div');
      back.className = 'modal-backdrop';
      el.insertBefore(back, el.firstChild);
    }
    back.addEventListener('mousedown', function () { closeModal(el); });
    document.body.style.overflow = 'hidden';
    var first = el.querySelector('[autofocus], input, button, textarea, select');
    if (first) setTimeout(function () { first.focus(); }, 40);
  }
  function closeModal(el) {
    el.classList.remove('open');
    document.body.style.overflow = '';
  }

  /* ── Dropdown ── */
  function closeDropdowns() {
    document.querySelectorAll('.dropdown.show').forEach(function (d) { d.classList.remove('show'); });
  }
  function openDropdown(el) {
    closeDropdowns();
    el.classList.add('show');
  }
  function toggleDropdown(el) {
    var wasOpen = el.classList.contains('show');
    closeDropdowns();
    if (!wasOpen) el.classList.add('show');
  }

  /* ── File uploads (data-sb-upload) ── */
  function initFileUploads() {
    document.querySelectorAll('[data-sb-upload]').forEach(function (w) {
      if (w.__sbBound) return;
      w.__sbBound = true;
      var input = w.querySelector('input[type="file"]');
      var zone = w.querySelector('.dropzone');
      var list = w.querySelector('[data-sb-files]');
      if (!input || !zone) return;

      function render() {
        if (!list) return;
        list.innerHTML = '';
        Array.prototype.forEach.call(input.files || [], function (f) {
          var li = document.createElement('li');
          li.className = 'd-flex align-items-center gap-2 text-sm';
          li.style.color = 'var(--text2)';
          li.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="flex-shrink-0"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg><span class="truncate">' + esc(f.name) + '</span>';
          list.appendChild(li);
        });
      }

      zone.addEventListener('click', function () { input.click(); });
      zone.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); }
      });
      zone.setAttribute('tabindex', '0');
      zone.setAttribute('role', 'button');

      ['dragenter', 'dragover'].forEach(function (ev) {
        zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.add('drag'); });
      });
      ['dragleave', 'drop'].forEach(function (ev) {
        zone.addEventListener(ev, function (e) { e.preventDefault(); zone.classList.remove('drag'); });
      });
      zone.addEventListener('drop', function (e) {
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
          input.files = e.dataTransfer.files;
          render();
          showToast('success', e.dataTransfer.files.length + ' file(s) selected');
        }
      });
      input.addEventListener('change', function () {
        render();
        if (input.files && input.files.length) {
          showToast('success', input.files.length + ' file(s) selected');
        }
      });
    });
  }

  /* ── Declarative bindings ── */
  function bind() {
    document.querySelectorAll('[data-bs-toggle="modal"], [data-sb-toggle="modal"]').forEach(function (t) {
      if (t.__sbBound) return;
      t.__sbBound = true;
      t.addEventListener('click', function () {
        var target = document.getElementById((t.getAttribute('data-bs-target') || t.getAttribute('data-sb-target') || '').slice(1));
        if (target) openModal(target);
      });
    });
    document.querySelectorAll('[data-bs-dismiss="modal"], [data-sb-dismiss="modal"]').forEach(function (b) {
      if (b.__sbBound) return;
      b.__sbBound = true;
      b.addEventListener('click', function () {
        var m = b.closest('.modal');
        if (m) closeModal(m);
        if (b.hasAttribute('data-confirm')) m && m.dispatchEvent(new CustomEvent('confirmed'));
      });
    });
    document.querySelectorAll('.modal').forEach(function (m) {
      if (m.__sbBound) return;
      m.__sbBound = true;
      m.addEventListener('mousedown', function (e) { if (e.target === m) closeModal(m); });
    });
    document.querySelectorAll('[data-bs-toggle="dropdown"], [data-sb-toggle="dropdown"]').forEach(function (t) {
      if (t.__sbBound) return;
      t.__sbBound = true;
      t.addEventListener('click', function (e) {
        e.stopPropagation();
        var wrap = t.closest('.dropdown');
        if (wrap) toggleDropdown(wrap);
      });
    });
    document.querySelectorAll('[data-bs-dismiss="alert"], [data-sb-dismiss="alert"]').forEach(function (b) {
      if (b.__sbBound) return;
      b.__sbBound = true;
      b.addEventListener('click', function () {
        var a = b.closest('.alert');
        if (!a) return;
        a.style.animation = 'fadeIn .15s ease reverse';
        setTimeout(function () { a.remove(); }, 150);
      });
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.dropdown')) closeDropdowns();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDropdowns();
    });
    initFileUploads();
  }

  function init() {
    applyMode(currentMode(), false);
    var saved = localStorage.getItem('grid_admin_accent');
    if (saved && THEMES[saved]) applyAccent(saved, false);
    var radius = localStorage.getItem('grid_admin_radius');
    if (radius && RADII[radius]) applyRadius(radius, false);
    var font = localStorage.getItem('grid_admin_font');
    if (font && FONTS[font]) applyFont(font, false);
    var fs = localStorage.getItem('grid_admin_fontsize');
    if (fs) applyFontSize(fs, false);
    bind();
  }

  window.SuperbyteUi = {
    THEMES: THEMES,
    FONTS: FONTS,
    esc: esc,
    toggleTheme: toggleTheme,
    setAppearance: applyMode,
    applyThemeColor: applyAccent,
    setRadius: applyRadius,
    setFont: applyFont,
    setFontSize: applyFontSize,
    showToast: showToast,
    openModal: openModal,
    closeModal: closeModal,
    openDropdown: openDropdown,
    closeDropdowns: closeDropdowns,
  };

  /* Kit-compatible top-level aliases (used by inline on*="" handlers). */
  window.toggleTheme = toggleTheme;
  window.showToast = showToast;
  window.openModal = openModal;
  window.closeModal = closeModal;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Re-bind after Livewire / Turbo page swaps. */
  document.addEventListener('livewire:navigated', bind);
  document.addEventListener('turbo:render', bind);
})();
