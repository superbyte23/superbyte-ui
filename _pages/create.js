/* Superbyte — Create (random theme generator / preset builder) */
window.__pageInit = function () {
  var COLORS = (typeof THEMES === 'object' && THEMES) || { indigo: { name: 'Indigo' } };
  var BASES = (typeof BASE_THEMES === 'object' && BASE_THEMES) || { neutral: { name: 'Neutral' } };
  var FONT_MAP = (typeof FONTS === 'object' && FONTS) || { ubuntu: { name: 'Ubuntu', stack: "'Ubuntu', sans-serif" } };
  var STYLES = ['default', 'newyork', 'radix', 'bold'];
  var RADII = { '4px': ['4px', '2px'], '8px': ['8px', '4px'], '14px': ['14px', '8px'] };

  var cfg = { color: 'indigo', baseTheme: 'neutral', font: 'ubuntu', style: 'default', radius: '14px', appearance: 'dark', layout: 'roomy', boxed: false, fontsize: 14 };
  var cmdEl = document.getElementById('preset-cmd');
  var jsonEl = document.getElementById('preset-json');
  if (!cmdEl || !jsonEl) return;

  function readState() {
    if (typeof window.activeThemeKey === 'string' && COLORS[window.activeThemeKey]) cfg.color = window.activeThemeKey;
    if (typeof window.activeBaseTheme === 'string' && BASES[window.activeBaseTheme]) cfg.baseTheme = window.activeBaseTheme;
    if (typeof window.activeFont === 'string' && FONT_MAP[window.activeFont]) cfg.font = window.activeFont;
    var r = document.body.style.getPropertyValue ? document.body.style.getPropertyValue('--radius') : '';
    if (RADII[r]) cfg.radius = r;
    cfg.appearance = document.body.getAttribute('data-bs-theme') === 'dark' ? 'dark' : 'light';
    cfg.layout = document.body.classList.contains('layout-compact') ? 'compact' : 'roomy';
    cfg.boxed = document.body.classList.contains('layout-boxed');
    var fs = parseInt(document.documentElement.style.fontSize, 10);
    if (fs >= 13 && fs <= 17) cfg.fontsize = fs;
  }

  function token() {
    return [cfg.color, cfg.baseTheme, cfg.font, cfg.style, cfg.radius.replace('px', ''), cfg.appearance, cfg.layout, cfg.fontsize].join('-');
  }

  function parseToken(t) {
    var p = String(t).split('-');
    if (p.length < 8) return;
    if (COLORS[p[0]]) cfg.color = p[0];
    if (BASES[p[1]]) cfg.baseTheme = p[1];
    if (FONT_MAP[p[2]]) cfg.font = p[2];
    if (STYLES.indexOf(p[3]) >= 0) cfg.style = p[3];
    var r = p[4] + 'px';
    if (RADII[r]) cfg.radius = r;
    if (p[5] === 'dark' || p[5] === 'light') cfg.appearance = p[5];
    if (p[6] === 'compact' || p[6] === 'roomy') cfg.layout = p[6];
    var f = parseInt(p[7], 10);
    if (f >= 13 && f <= 17) cfg.fontsize = f;
  }

  function applyCfg() {
    if (typeof applyThemeColor === 'function') applyThemeColor(cfg.color);
    if (typeof setBaseTheme === 'function') setBaseTheme(cfg.baseTheme);
    if (typeof setFont === 'function') setFont(cfg.font);
    var rr = RADII[cfg.radius];
    if (typeof setRadius === 'function') setRadius(rr[0], rr[1], document.querySelector('#create-radius [data-r="' + cfg.radius + '"]'));
    if (typeof applyAppearance === 'function') applyAppearance(cfg.appearance);
    if (typeof setCompact === 'function') setCompact(cfg.layout === 'compact');
    if (typeof setBoxed === 'function') setBoxed(cfg.boxed);
    if (typeof setFontSize === 'function') setFontSize(cfg.fontsize);
  }

  function sync() {
    document.querySelectorAll('#create-swatches .swatch').forEach(function (s) {
      s.classList.toggle('active', s.dataset.key === cfg.color);
    });
    document.querySelectorAll('#create-base-themes .base-theme-opt').forEach(function (b) {
      b.classList.toggle('active', b.dataset.key === cfg.baseTheme);
    });
    document.querySelectorAll('#create-radius .radius-opt').forEach(function (b) {
      b.classList.toggle('active', b.dataset.r === cfg.radius);
    });
    document.querySelectorAll('#create-appearance .radius-opt').forEach(function (b) {
      b.classList.toggle('active', b.dataset.mode === cfg.appearance);
    });
    var c = document.getElementById('create-compact');
    var rr = document.getElementById('create-roomy');
    var fl = document.getElementById('create-fluid');
    var bx = document.getElementById('create-boxed');
    if (c) c.classList.toggle('active', cfg.layout === 'compact');
    if (rr) rr.classList.toggle('active', cfg.layout === 'roomy');
    if (fl) fl.classList.toggle('active', !cfg.boxed);
    if (bx) bx.classList.toggle('active', cfg.boxed);
    var fs = document.getElementById('create-fs');
    var fo = document.getElementById('create-fs-out');
    if (fs) fs.value = cfg.fontsize;
    if (fo) fo.textContent = cfg.fontsize + 'px';
    var fn = document.getElementById('create-font');
    var fp = document.getElementById('create-font-preview');
    if (fn) fn.value = cfg.font;
    if (fp && FONT_MAP[cfg.font]) fp.style.fontFamily = FONT_MAP[cfg.font].stack;
    var st = document.getElementById('create-style');
    if (st) st.value = cfg.style;
  }

  function hlJson(s) {
    return s
      .replace(/(&quot;[^&]*?&quot;)( *:)/g, '<span class="tok-k">$1</span>$2')
      .replace(/(&quot;[^&]*?&quot;)([,}])/g, '<span class="tok-v">$1</span>$2')
      .replace(/\b(true|false|null)\b/g, '<span class="tok-l">$1</span>');
  }

  function render() {
    var tok = token();
    var cmd = 'npx superbyte@latest init --preset "' + tok + '"';
    cmdEl.innerHTML = esc(cmd).replace(esc(tok), '<span class="tok">' + esc(tok) + '</span>');
    var json = JSON.stringify({
      baseColor: cfg.color, baseTheme: cfg.baseTheme, font: cfg.font,
      style: cfg.style, radius: cfg.radius, appearance: cfg.appearance,
      layout: cfg.layout, boxed: cfg.boxed, fontSize: cfg.fontsize
    }, null, 2);
    jsonEl.innerHTML = hlJson(esc(json));
    window._presetRaw = cmd;
    window._presetJson = json;
    try {
      var u = new URL(location.href);
      if (tok === 'indigo-neutral-ubuntu-default-14-dark-roomy-14') u.searchParams.delete('preset');
      else u.searchParams.set('preset', tok);
      history.replaceState(null, '', u.pathname + u.search);
    } catch (e) {}
  }

  function copyText(txt, label) {
    function done() {
      if (typeof showToast === 'function') showToast('success', label + ' copied to clipboard');
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); done(); } catch (e) {
        if (typeof showToast === 'function') showToast('error', 'Copy failed');
      }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done).catch(fallback);
    else fallback();
  }

  function randomCfg() {
    var colors = Object.keys(COLORS);
    var bases = Object.keys(BASES);
    var fonts = Object.keys(FONT_MAP);
    function pick(arr, cur) {
      var o = arr.filter(function (x) { return x !== cur; });
      return (o.length ? o : arr)[Math.floor(Math.random() * (o.length ? o.length : arr.length))];
    }
    cfg.color = pick(colors, cfg.color);
    cfg.baseTheme = pick(bases, cfg.baseTheme);
    cfg.font = pick(fonts, cfg.font);
    cfg.style = pick(STYLES, cfg.style);
    cfg.radius = pick(['4px', '8px', '14px'], cfg.radius);
    cfg.appearance = cfg.appearance === 'dark' ? 'light' : 'dark';
    applyCfg();
    sync();
    render();
  }

  readState();
  try {
    var qs = new URLSearchParams(location.search).get('preset');
    if (qs) parseToken(qs);
  } catch (e) {}
  applyCfg();
  sync();
  render();

  var rand = document.getElementById('create-random');
  if (rand) rand.addEventListener('click', randomCfg);

  document.querySelectorAll('#create-swatches .swatch').forEach(function (s) {
    s.addEventListener('click', function () { cfg.color = s.dataset.key; applyCfg(); sync(); render(); });
  });
  document.querySelectorAll('#create-base-themes .base-theme-opt').forEach(function (b) {
    b.addEventListener('click', function () { cfg.baseTheme = b.dataset.key; applyCfg(); sync(); render(); });
  });
  document.querySelectorAll('#create-radius .radius-opt').forEach(function (b) {
    b.addEventListener('click', function () { cfg.radius = b.dataset.r; applyCfg(); sync(); render(); });
  });
  document.querySelectorAll('#create-appearance .radius-opt').forEach(function (b) {
    b.addEventListener('click', function () { cfg.appearance = b.dataset.mode; applyCfg(); sync(); render(); });
  });
  var c = document.getElementById('create-compact');
  var rr = document.getElementById('create-roomy');
  var fl = document.getElementById('create-fluid');
  var bx = document.getElementById('create-boxed');
  if (c) c.addEventListener('click', function () { cfg.layout = 'compact'; applyCfg(); sync(); render(); });
  if (rr) rr.addEventListener('click', function () { cfg.layout = 'roomy'; applyCfg(); sync(); render(); });
  if (fl) fl.addEventListener('click', function () { cfg.boxed = false; applyCfg(); sync(); render(); });
  if (bx) bx.addEventListener('click', function () { cfg.boxed = true; applyCfg(); sync(); render(); });
  var fsr = document.getElementById('create-fs');
  if (fsr) fsr.addEventListener('input', function () {
    cfg.fontsize = parseInt(fsr.value, 10);
    if (typeof setFontSize === 'function') setFontSize(cfg.fontsize);
    sync();
    render();
  });
  var fn = document.getElementById('create-font');
  if (fn) fn.addEventListener('change', function () { cfg.font = fn.value; applyCfg(); sync(); render(); });
  var st = document.getElementById('create-style');
  if (st) st.addEventListener('change', function () { cfg.style = st.value; render(); });
  var cc = document.getElementById('create-copy-cmd');
  if (cc) cc.addEventListener('click', function () { copyText(window._presetRaw, 'Command'); });
};
