(function () {
  try {
    var L = localStorage, m = {};
    m.mode = L.getItem('grid_admin_theme');
    m.accent = L.getItem('grid_admin_accent');
    m.base = L.getItem('grid_admin_basetheme');
    m.font = L.getItem('grid_admin_font');
    m.radius = L.getItem('grid_admin_radius');
    m.fs = L.getItem('grid_admin_fontsize');
    m.compact = L.getItem('grid_admin_compact');
    m.boxed = L.getItem('grid_admin_boxed');
    var THEMES = {"indigo":{"name":"Indigo","base":"#6366f1","hi":"#818cf8","rgb":"99,102,241"},"violet":{"name":"Violet","base":"#8b5cf6","hi":"#a78bfa","rgb":"139,92,246"},"fuchsia":{"name":"Fuchsia","base":"#d946ef","hi":"#e879f9","rgb":"217,70,239"},"pink":{"name":"Pink","base":"#ec4899","hi":"#f472b6","rgb":"236,72,153"},"rose":{"name":"Rose","base":"#f43f5e","hi":"#fb7185","rgb":"244,63,94"},"red":{"name":"Red","base":"#ef4444","hi":"#f87171","rgb":"239,68,68"},"orange":{"name":"Orange","base":"#f97316","hi":"#fb923c","rgb":"249,115,22"},"amber":{"name":"Amber","base":"#f59e0b","hi":"#fbbf24","rgb":"245,158,11"},"yellow":{"name":"Yellow","base":"#eab308","hi":"#facc15","rgb":"234,179,8"},"lime":{"name":"Lime","base":"#84cc16","hi":"#a3e635","rgb":"132,204,22"},"green":{"name":"Green","base":"#22c55e","hi":"#4ade80","rgb":"34,197,94"},"emerald":{"name":"Emerald","base":"#10b981","hi":"#34d399","rgb":"16,185,129"},"teal":{"name":"Teal","base":"#14b8a6","hi":"#2dd4bf","rgb":"20,184,166"},"cyan":{"name":"Cyan","base":"#06b6d4","hi":"#22d3ee","rgb":"6,182,212"},"sky":{"name":"Sky","base":"#0ea5e9","hi":"#38bdf8","rgb":"14,165,233"},"blue":{"name":"Blue","base":"#3b82f6","hi":"#60a5fa","rgb":"59,130,246"},"purple":{"name":"Purple","base":"#a855f7","hi":"#c084fc","rgb":"168,85,247"},"white":{"name":"White","base":"#ffffff","hi":"#e5e7eb","rgb":"255,255,255"},"dark":{"name":"Dark","base":"#111827","hi":"#1f2937","rgb":"17,24,39"}};
    var FONTS = {"ubuntu":{"name":"Ubuntu","stack":"'Ubuntu', sans-serif"},"inter":{"name":"Inter","stack":"'Inter', 'Ubuntu', sans-serif"},"notosans":{"name":"Noto Sans","stack":"'Noto Sans', 'Ubuntu', sans-serif"},"nunitosans":{"name":"Nunito Sans","stack":"'Nunito Sans', 'Ubuntu', sans-serif"},"figtree":{"name":"Figtree","stack":"'Figtree', 'Ubuntu', sans-serif"},"roboto":{"name":"Roboto","stack":"'Roboto', 'Ubuntu', sans-serif"},"raleway":{"name":"Raleway","stack":"'Raleway', 'Ubuntu', sans-serif"},"dmsans":{"name":"DM Sans","stack":"'DM Sans', 'Ubuntu', sans-serif"},"publicsans":{"name":"Public Sans","stack":"'Public Sans', 'Ubuntu', sans-serif"},"outfit":{"name":"Outfit","stack":"'Outfit', 'Ubuntu', sans-serif"},"oxanium":{"name":"Oxanium","stack":"'Oxanium', 'Ubuntu', sans-serif"},"manrope":{"name":"Manrope","stack":"'Manrope', 'Ubuntu', sans-serif"},"spacegrotesk":{"name":"Space Grotesk","stack":"'Space Grotesk', 'Ubuntu', sans-serif"},"montserrat":{"name":"Montserrat","stack":"'Montserrat', 'Ubuntu', sans-serif"},"ibmplexsans":{"name":"IBM Plex Sans","stack":"'IBM Plex Sans', 'Ubuntu', sans-serif"},"sourcesans3":{"name":"Source Sans 3","stack":"'Source Sans 3', 'Ubuntu', sans-serif"},"instrumentsans":{"name":"Instrument Sans","stack":"'Instrument Sans', 'Ubuntu', sans-serif"}};
    var R = { '4px': ['4px', '2px'], '8px': ['8px', '4px'], '14px': ['14px', '8px'] };
    var t, hl = document.documentElement.style;
    if (m.fs) hl.fontSize = Math.min(17, Math.max(13, parseInt(m.fs, 10))) + 'px';
    if (m.font && FONTS[m.font]) hl.setProperty('--sans', FONTS[m.font].stack);
    if (m.accent && (t = THEMES[m.accent])) {
      hl.setProperty('--accent', t.base); hl.setProperty('--accent-h', t.hi);
      hl.setProperty('--bs-primary', t.base); hl.setProperty('--bs-primary-rgb', t.rgb);
    }
    if (m.radius && R[m.radius]) {
      var p = R[m.radius];
      hl.setProperty('--radius', p[0]); hl.setProperty('--radius-sm', p[1]);
      hl.setProperty('--bs-border-radius', p[0]); hl.setProperty('--bs-border-radius-sm', p[1]);
    }
    function applyBody() {
      var b = document.body, bs = b.style, mode = (m.mode === 'light' || m.mode === 'dark') ? m.mode : null;
      if (mode) b.setAttribute('data-bs-theme', mode);
      if (m.base && m.base !== 'neutral') b.setAttribute('data-base-theme', m.base);
      // Layout mode: a dedicated preset page (layout-*.html) forces its own
      // mode; otherwise use the saved mode. Applying it here — at body
      // creation, before first paint — keeps scroll restoration accurate on
      // refresh (no reflow/scroll jump when app.js re-applies it later).
      var lm = L.getItem('grid_admin_layout_mode');
      var fm = (location.pathname.match(/layout-(vertical|horizontal|boxed|fluid|contained|mini-sidebar|condensed|comfy)\.html$/) || [])[1];
      if (fm) lm = fm;
      if (lm) {
        if (lm === 'boxed') b.classList.add('layout-boxed');
        else if (lm === 'fluid') b.classList.add('layout-fluid');
        else if (lm === 'contained') b.classList.add('layout-contained');
        else if (lm === 'horizontal') b.classList.add('layout-horizontal');
        else if (lm === 'mini-sidebar') b.classList.add('layout-mini-sidebar');
        if (lm === 'condensed') b.classList.add('layout-compact');
        else if (lm === 'comfy') b.classList.remove('layout-compact');
      } else {
        if (m.compact === '1') b.classList.add('layout-compact');
        if (m.boxed === '1') b.classList.add('layout-boxed');
      }
      var light = (mode || 'dark') === 'light';
      if (m.accent && (t = THEMES[m.accent])) {
        bs.setProperty('--accent', t.base); bs.setProperty('--accent-h', t.hi);
        bs.setProperty('--accent-bg', 'rgba(' + t.rgb + ',' + (light ? '.08' : '.12') + ')');
        bs.setProperty('--bs-primary', t.base); bs.setProperty('--bs-primary-rgb', t.rgb);
      }
      if (m.font && FONTS[m.font]) bs.setProperty('--sans', FONTS[m.font].stack);
      if (m.radius && R[m.radius]) {
        var q = R[m.radius];
        bs.setProperty('--radius', q[0]); bs.setProperty('--radius-sm', q[1]);
        bs.setProperty('--bs-border-radius', q[0]); bs.setProperty('--bs-border-radius-sm', q[1]);
      }
    }
    if (document.body) applyBody();
    else {
      var mo = new MutationObserver(function () { if (document.body) { mo.disconnect(); applyBody(); } });
      mo.observe(document.documentElement, { childList: true });
    }
  } catch (e) {}
})();
