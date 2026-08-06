/* ── EDITORS (QUILL + CODEMIRROR) ───────────────────────────────────────── */
/* No charts on this page, so no `__chartInit` hook is registered. Quill and
   CodeMirror read their colors from static CSS, not live theme tokens. */

function initEditors() {
  if (window._editorsBuilt) return;
  window._editorsBuilt = true;

  window._quill = new Quill('#quill-editor', {
    theme: 'snow',
    placeholder: 'Compose something great…',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        ['blockquote', 'link', 'clean']
      ]
    }
  });

  const out = document.getElementById('ql-out');
  const render = () => { out.textContent = window._quill.root.innerHTML; };
  window._quill.on('text-change', render);
  window._quill.clipboard.dangerouslyPasteHTML(
    '<p>Ship the demo — <strong>Superbyte</strong> ships <em>fast</em>.</p><ul><li>Vendored, offline-first assets</li><li>Theme-aware tokens</li></ul><blockquote>Less setup, more shipping.</blockquote>'
  );
  render();

  window._cm = {};

  window._cm.js = CodeMirror.fromTextArea(document.getElementById('cm-js'), {
    mode: 'javascript', theme: 'superbyte', lineNumbers: true, matchBrackets: true,
    autoCloseBrackets: true, styleActiveLine: true, tabSize: 2
  });
  window._cm.js.setValue(
    'const grid = (n) => n * 42;\n' +
    'const map = (arr) => arr.filter(Boolean).map(grid);\n\n' +
    'map([1, null, 2, 3]);  // => [42, 84, 126]\n\n' +
    'const state = {\n' +
    '  theme: "indigo",\n' +
    '  radius: 8,\n' +
    '  compact: false,\n' +
    '};\n\n' +
    'export default state;\n'
  );

  window._cm.html = CodeMirror.fromTextArea(document.getElementById('cm-html'), {
    mode: 'htmlmixed', theme: 'superbyte', lineNumbers: true, matchBrackets: true,
    autoCloseBrackets: true, styleActiveLine: true, tabSize: 2
  });
  window._cm.html.setValue(
    '<!DOCTYPE html>\n' +
    '<html lang="en">\n' +
    '<head>\n' +
    '  <meta charset="UTF-8">\n' +
    '  <title>Superbyte</title>\n' +
    '<\/head>\n' +
    '<body data-bs-theme="dark">\n' +
    '  <main class="app-shell">\n' +
    '    <h1>UI</h1>\n' +
    '    <button class="btn btn-primary">New</button>\n' +
    '  </main>\n' +
    '<\/body>\n' +
    '<\/html>\n'
  );

  window._cm.py = CodeMirror.fromTextArea(document.getElementById('cm-py'), {
    mode: 'python', theme: 'superbyte', lineNumbers: true, matchBrackets: true,
    autoCloseBrackets: true, styleActiveLine: true, indentUnit: 4, tabSize: 4
  });
  window._cm.py.setValue(
    'import os\n' +
    'from typing import List\n\n' +
    'def summarize(prices: List[float]) -> dict:\n' +
    '    """Return min, max and average of a price series."""\n' +
    '    low = min(prices)\n' +
    '    high = max(prices)\n' +
    '    avg = sum(prices) / len(prices)\n' +
    '    return {"low": low, "high": high, "avg": round(avg, 2)}\n\n' +
    'if __name__ == "__main__":\n' +
    '    print(summarize([84.2, 91.4, 77.0, 89.9]))\n'
  );
}

window.resetEditors = function () {
  window._quill.clipboard.dangerouslyPasteHTML('<p>Start typing…</p>');
  window._quill.root.dispatchEvent(new Event('input', { bubbles: true }));
  showToast('success', 'Editors reset');
};

initEditors();
