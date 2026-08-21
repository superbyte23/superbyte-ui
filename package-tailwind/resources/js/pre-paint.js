/* Superbyte UI — pre-paint bootstrap.
   Loaded synchronously in <head> (non-module). Reads saved preferences from
   localStorage (grid_admin_* keys, shared with the standalone kit) and applies
   theme + accent + radius + font before first paint so there is no flash.
   Defaults can be provided via window.SuperbyteUiPrefs (set by @sbAppearance). */
(function () {
  try {
    var P = window.SuperbyteUiPrefs || {};
    var key = P.key || 'grid_admin_theme';
    var L = localStorage, m = {};
    m.mode = L.getItem(key) || P.theme || 'dark';
    m.accent = L.getItem('grid_admin_accent') || P.accent || '';
    m.radius = L.getItem('grid_admin_radius') || '';
    m.font = L.getItem('grid_admin_font') || '';
    m.fs = L.getItem('grid_admin_fontsize') || '';

    var THEMES = {"indigo":{"name":"Brand","base":"#2961fd","hi":"#5b8bfc","rgb":"41,97,253"},"violet":{"base":"#8b5cf6","hi":"#a78bfa","rgb":"139,92,246"},"fuchsia":{"base":"#d946ef","hi":"#e879f9","rgb":"217,70,239"},"pink":{"base":"#ec4899","hi":"#f472b6","rgb":"236,72,153"},"rose":{"base":"#f43f5e","hi":"#fb7185","rgb":"244,63,94"},"red":{"base":"#ef4444","hi":"#f87171","rgb":"239,68,68"},"orange":{"base":"#f97316","hi":"#fb923c","rgb":"249,115,22"},"amber":{"base":"#f59e0b","hi":"#fbbf24","rgb":"245,158,11"},"yellow":{"base":"#eab308","hi":"#facc15","rgb":"234,179,8"},"lime":{"base":"#84cc16","hi":"#a3e635","rgb":"132,204,22"},"green":{"base":"#22c55e","hi":"#4ade80","rgb":"34,197,94"},"emerald":{"base":"#10b981","hi":"#34d399","rgb":"16,185,129"},"teal":{"base":"#14b8a6","hi":"#2dd4bf","rgb":"20,184,166"},"cyan":{"base":"#06b6d4","hi":"#22d3ee","rgb":"6,182,212"},"sky":{"base":"#0ea5e9","hi":"#38bdf8","rgb":"14,165,233"},"blue":{"base":"#3b82f6","hi":"#60a5fa","rgb":"59,130,246"},"purple":{"base":"#a855f7","hi":"#c084fc","rgb":"168,85,247"}};
    var FONTS = {"ubuntu":{"stack":"'Ubuntu', sans-serif"},"inter":{"stack":"'Inter', 'Ubuntu', sans-serif"},"notosans":{"stack":"'Noto Sans', 'Ubuntu', sans-serif"},"nunitosans":{"stack":"'Nunito Sans', 'Ubuntu', sans-serif"},"figtree":{"stack":"'Figtree', 'Ubuntu', sans-serif"},"roboto":{"stack":"'Roboto', 'Ubuntu', sans-serif"},"raleway":{"stack":"'Raleway', 'Ubuntu', sans-serif"},"dmsans":{"stack":"'DM Sans', 'Ubuntu', sans-serif"},"publicsans":{"stack":"'Public Sans', 'Ubuntu', sans-serif"},"outfit":{"stack":"'Outfit', 'Ubuntu', sans-serif"},"oxanium":{"stack":"'Oxanium', 'Ubuntu', sans-serif"},"manrope":{"stack":"'Manrope', 'Ubuntu', sans-serif"},"spacegrotesk":{"stack":"'Space Grotesk', 'Ubuntu', sans-serif"},"montserrat":{"stack":"'Montserrat', 'Ubuntu', sans-serif"},"ibmplexsans":{"stack":"'IBM Plex Sans', 'Ubuntu', sans-serif"},"sourcesans3":{"stack":"'Source Sans 3', 'Ubuntu', sans-serif"},"instrumentsans":{"stack":"'Instrument Sans', 'Ubuntu', sans-serif"}};

    var R = { '4px': ['4px', '2px'], '8px': ['8px', '4px'], '14px': ['14px', '8px'] };
    function accentText(base) {
      var c = base.replace('#', '');
      var r = parseInt(c.substr(0, 2), 16), g = parseInt(c.substr(2, 2), 16), b = parseInt(c.substr(4, 2), 16);
      return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.72 ? '#111827' : '#ffffff';
    }

    function resolveMode(mode) {
      if (mode === 'system') {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      }
      return mode === 'light' ? 'light' : 'dark';
    }

    var mode = resolveMode(m.mode);
    var html = document.documentElement;
    html.classList.add(mode === 'light' ? 'light' : 'dark');

    var hl = html.style;
    if (m.fs) hl.fontSize = Math.min(17, Math.max(13, parseInt(m.fs, 10))) + 'px';
    if (m.font && FONTS[m.font]) hl.setProperty('--sans', FONTS[m.font].stack);
    if (m.accent && THEMES[m.accent]) {
      var t = THEMES[m.accent];
      hl.setProperty('--accent', t.base);
      hl.setProperty('--accent-h', t.hi);
      hl.setProperty('--accent-text', accentText(t.base));
      hl.setProperty('--accent-rgb', t.rgb);
      hl.setProperty('--accent-bg', 'rgba(' + t.rgb + ',' + (mode === 'light' ? '.08' : '.12') + ')');
    }
    if (m.radius && R[m.radius]) {
      var p = R[m.radius];
      hl.setProperty('--radius', p[0]);
      hl.setProperty('--radius-sm', p[1]);
    }
  } catch (e) {}
})();
