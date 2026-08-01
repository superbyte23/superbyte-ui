#!/usr/bin/env node
/* ══════════════════════════════════════════════════════════════════════════
   Superbyte Admin — Structure & Consistency Verifier

   Checks across all 35 HTML pages:
     1. HTML well-formedness (parseable, required root elements)
     2. Required markers (sb-theme-bootstrap)
     3. Zero CDN references (all assets must be local)
     4. Local asset resolution (every src/href file must exist)
     5. Sidebar nav consistency (shell pages must share identical links)
     6. Script ordering conventions (app.js last, chart/init hooks before)
     7. Chart canvas conventions (every <canvas> needs fixed-height container)
     8. Inline script syntax (parse every inline <script> via vm.Script)
     9. Auth vs Shell page distinction (#app only in shell pages)
    10. Key structural elements per page type (favicon, app.css, no FA remnants)

   Usage: node verify.cjs
   ══════════════════════════════════════════════════════════════════════════ */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = __dirname;

// ── Color helpers ────────────────────────────────────────────────────────
const c = { reset: '\x1b[0m', red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m', bold: '\x1b[1m', dim: '\x1b[2m' };

// ── Page classification ──────────────────────────────────────────────────
const AUTH_PAGES = [
  'login.html', 'register.html', 'forgot.html', 'reset.html',
  'lock.html', 'verify.html', 'two-factor.html', 'session-expired.html'
];

const SHELL_PAGES = [
  'index.html', 'analytics.html', 'records.html', 'users.html',
  'forms.html', 'elements.html', 'cards.html', 'overlays.html',
  'utilities.html', 'components.html', 'all-components.html',
  'icons.html', 'tables.html', 'charts.html', 'visuals.html',
  'maps.html', 'echarts.html', 'editors.html', 'crm.html',
  'ecommerce.html', 'calendar.html', 'kanban.html', 'email.html',
  'file-manager.html', 'create.html', 'docs.html', 'rtl.html'
];

const CHART_PAGES = ['index.html', 'analytics.html', 'charts.html', 'crm.html', 'ecommerce.html'];

// ── Utility: collect all HTML files ──────────────────────────────────────
function htmlFiles() {
  return fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort();
}

// ── Utility: strip JS string literals from HTML for DOM-like checks ──────
// Returns a version of the HTML with inline <script> contents replaced by
// placeholder text so that HTML tags in JS strings don't confuse checks.
function stripInlineScripts(html) {
  // Replace content of each inline <script>...</script> with empty string
  return html.replace(/(<script\b(?![^>]*\bsrc\s*=)[^>]*>)[\s\S]*?(<\/script>)/gi, '$1$2');
}

// ── Utility: extract all src/href attribute values from HTML ─────────────
function extractRefs(html) {
  const refs = [];
  const regex = /(?:src|href)\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    refs.push({ attr: m[0].match(/^(src|href)/i)[0].toLowerCase(), value: m[1] });
  }
  return refs;
}

// ── Utility: resolve local path from an HTML src/href ────────────────────
function resolveRef(ref) {
  if (!ref || /^(https?:|data:|#|\/\/)/.test(ref)) return null;
  return path.resolve(ROOT, ref);
}

// ── Utility: count tags in markup-only content (excludes script bodies) ──
function countTags(html, tag) {
  const stripped = stripInlineScripts(html);
  const open = (stripped.match(new RegExp(`<${tag}[\\s>]`, 'gi')) || []).length;
  const close = (stripped.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
  return { open, close };
}

// ══════════════════════════════════════════════════════════════════════════
// CHECK 1: HTML well-formedness
// ══════════════════════════════════════════════════════════════════════════
function check1_wellformed(name, html) {
  const issues = [];
  if (!/<!DOCTYPE\s+html/i.test(html)) issues.push('Missing or malformed DOCTYPE');
  if (!/<html[\s>]/i.test(html)) issues.push('Missing <html> tag');
  if (!/<head[\s>]/i.test(html)) issues.push('Missing <head> tag');
  if (!/<\/head>/i.test(html)) issues.push('Missing </head> tag');
  if (!/<body[\s>]/i.test(html)) issues.push('Missing <body> tag');
  if (!/<\/body>/i.test(html)) issues.push('Missing </body> tag');
  if (!/<\/html>/i.test(html)) issues.push('Missing </html> tag');

  // Check for multiple </head>/</body> OUTSIDE of script tags (known: editors.html
  // has literal </head> + </body> inside a CodeMirror demo string — that's fine)
  const noScripts = stripInlineScripts(html);
  const headCloseCount = (noScripts.match(/<\/head>/gi) || []).length;
  if (headCloseCount > 1) issues.push(`Multiple </head> tags (${headCloseCount}) — can corrupt theme bootstrap injection`);

  const bodyCloseCount = (noScripts.match(/<\/body>/gi) || []).length;
  if (bodyCloseCount > 1) issues.push(`Multiple </body> tags (${bodyCloseCount})`);

  // Check balanced divs (excluding script content)
  const divs = countTags(html, 'div');
  const diff = Math.abs(divs.open - divs.close);
  if (diff > 3) {
    issues.push(`Unbalanced <div> tags: ${divs.open} open vs ${divs.close} close (diff=${diff})`);
  }

  return issues;
}

// ══════════════════════════════════════════════════════════════════════════
// CHECK 2: Required markers
// ══════════════════════════════════════════════════════════════════════════
function check2_markers(name, html) {
  const issues = [];
  if (!html.includes('sb-theme-bootstrap')) {
    issues.push('Missing "sb-theme-bootstrap" theme bootstrap marker');
  }
  return issues;
}

// ══════════════════════════════════════════════════════════════════════════
// CHECK 3: Zero CDN references
// ══════════════════════════════════════════════════════════════════════════
function check3_cdn(name, html) {
  const issues = [];
  const refs = extractRefs(html);
  for (const r of refs) {
    if (/^(https?:|\/\/)/.test(r.value)) {
      issues.push(`CDN/external reference: ${r.attr}="${r.value}"`);
    }
  }
  return issues;
}

// ══════════════════════════════════════════════════════════════════════════
// CHECK 4: Local asset resolution
// ══════════════════════════════════════════════════════════════════════════
function check4_assets(name, html) {
  const issues = [];
  const refs = extractRefs(html);
  for (const r of refs) {
    const localPath = resolveRef(r.value);
    if (localPath && !fs.existsSync(localPath)) {
      const rel = path.relative(ROOT, localPath);
      issues.push(`Broken reference: ${r.attr}="${r.value}" → ${rel} (file not found)`);
    }
  }
  return issues;
}

// ══════════════════════════════════════════════════════════════════════════
// CHECK 5: Sidebar nav consistency
// ══════════════════════════════════════════════════════════════════════════
function extractSidebarLinks(html) {
  const links = [];
  // Match side-link anchor tags
  const regex = /<a\s+[^>]*class="[^"]*\bside-link\b[^"]*"\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    // Strip icon tags to get link text
    const text = m[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
    links.push({ href: m[1], text });
  }
  return links;
}

function canonicalSidebarLinks() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  return extractSidebarLinks(html);
}

function check5_sidebar(name, html, isShell, canonical) {
  const issues = [];
  if (!isShell) return issues;

  const links = extractSidebarLinks(html);
  if (links.length === 0) {
    issues.push('No sidebar links found (shell page must have side-links)');
    return issues;
  }

  if (canonical && canonical.length > 0) {
    const pageHrefs = links.map(l => l.href);
    const canonHrefs = canonical.map(l => l.href);

    if (pageHrefs.length !== canonHrefs.length) {
      issues.push(`Sidebar link count mismatch: expected ${canonHrefs.length}, got ${pageHrefs.length}`);
    }

    // Find first mismatch
    const limit = Math.min(pageHrefs.length, canonHrefs.length);
    for (let i = 0; i < limit; i++) {
      if (pageHrefs[i] !== canonHrefs[i]) {
        issues.push(`Sidebar link at index ${i}: expected "${canonHrefs[i]}", got "${pageHrefs[i]}"`);
        break;
      }
    }
  }

  return issues;
}

// ══════════════════════════════════════════════════════════════════════════
// CHECK 6: Script ordering conventions
// ══════════════════════════════════════════════════════════════════════════
function check6_scriptOrder(name, html, isShell) {
  const issues = [];

  if (isShell) {
    if (!html.includes('assets/js/app.js')) {
      issues.push('Missing assets/js/app.js (required for shell pages)');
      return issues;
    }

    // Check if there's inline <script> content after app.js
    // Extract all <script> positions
    const allScripts = [];
    const tagRegex = /<script\b([^>]*)>/gi;
    let tagMatch;
    while ((tagMatch = tagRegex.exec(html)) !== null) {
      const attrs = tagMatch[1];
      const isSrc = /src\s*=/.test(attrs);
      const closeIdx = html.indexOf('</script>', tagMatch.index);
      allScripts.push({
        idx: tagMatch.index,
        closeIdx: closeIdx > 0 ? closeIdx + 9 : html.length,
        isSrc,
        attrs
      });
    }

    const appJsIdx = html.indexOf('assets/js/app.js');

    // Find which script tag contains app.js
    const appScript = allScripts.find(s => s.idx <= appJsIdx && s.closeIdx >= appJsIdx);
    if (appScript) {
      const afterScripts = allScripts.filter(s => s.idx > appScript.closeIdx);
      for (const s of afterScripts) {
        if (!s.isSrc) {
          // Inline script after app.js — check if it depends on app.js functions
          const code = html.substring(s.idx, s.closeIdx);
          const usesAppJs = /\b(esc|showToast|themeVars|applyThemeColor|setAppearance|setRadius|setCompact|setBoxed|setFontSize|setFont|setBaseTheme|refreshCharts)\b/.test(code);

          if (usesAppJs) {
            // Intentional: depends on app.js — warn but accept
            issues.push(`WARN: Inline script after app.js (uses app.js helpers — intentional)`);
          } else {
            issues.push(`Inline script after app.js (should register __pageInit before app.js instead)`);
          }
        }
      }
    }

    // Check chart hook ordering on chart pages
    if (CHART_PAGES.includes(name)) {
      const chartInitIdx = html.indexOf('window.__chartInit');
      if (chartInitIdx !== -1 && appJsIdx !== -1 && chartInitIdx > appJsIdx) {
        issues.push('window.__chartInit must be registered BEFORE assets/js/app.js');
      }
    }
  }

  // Auth pages: need app.js for showToast + toggleTheme
  if (AUTH_PAGES.includes(name)) {
    if (!html.includes('assets/js/app.js')) {
      issues.push('Auth page missing assets/js/app.js (needed for showToast, toggleTheme)');
    }
  }

  return issues;
}

// ══════════════════════════════════════════════════════════════════════════
// CHECK 7: Chart canvas conventions
// ══════════════════════════════════════════════════════════════════════════
function check7_canvas(name, html) {
  const issues = [];
  const noScripts = stripInlineScripts(html);
  const canvasRegex = /<canvas\b[^>]*id="([^"]*)"[^>]*>/gi;
  let m;

  while ((m = canvasRegex.exec(noScripts)) !== null) {
    const canvasId = m[1];
    const canvasPos = m.index;

    // Look ~500 chars before this canvas for a parent div with explicit height
    const before = noScripts.substring(Math.max(0, canvasPos - 800), canvasPos);

    // Find the closest opening div with style height (before this canvas)
    const divWithHeight = before.match(/<div\b[^>]*style="[^"]*height\s*:\s*(\d+)px[^"]*"[^>]*>/gi);
    if (!divWithHeight) {
      issues.push(`Canvas "#${canvasId}" is not inside a fixed-height wrapper div (needs style="height:Npx")`);
    }
  }
  return issues;
}

// ══════════════════════════════════════════════════════════════════════════
// CHECK 8: Inline script syntax
// ══════════════════════════════════════════════════════════════════════════
function check8_inlineScripts(name, html) {
  const issues = [];
  const inlineRegex = /<script(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  let count = 0;

  while ((m = inlineRegex.exec(html)) !== null) {
    count++;
    const code = m[1].trim();
    if (!code) continue;

    try {
      new vm.Script(code);
    } catch (e) {
      const lineNum = html.substring(0, m.index).split('\n').length;
      issues.push(`Inline script #${count} syntax error at HTML line ~${lineNum}: ${e.message}`);
    }
  }
  return issues;
}

// ══════════════════════════════════════════════════════════════════════════
// CHECK 9: Auth vs Shell page distinction
// ══════════════════════════════════════════════════════════════════════════
function check9_authVsShell(name, html) {
  const issues = [];
  const isAuth = AUTH_PAGES.includes(name);
  const isShell = SHELL_PAGES.includes(name);

  if (isAuth) {
    if (html.includes('id="app"')) issues.push('Auth page should not contain the app shell (#app)');
    if (html.includes('id="sidebar"')) issues.push('Auth page should not contain the sidebar (#sidebar)');
    if (html.includes('id="toolbar"')) issues.push('Auth page should not contain the toolbar (#toolbar)');
    if (!html.includes('auth-page')) issues.push('Auth page missing .auth-page wrapper');
  }

  if (isShell) {
    if (!html.includes('id="app"')) issues.push('Shell page missing #app container');
    if (!html.includes('id="sidebar"')) issues.push('Shell page missing #sidebar');
    if (!html.includes('id="toolbar"')) issues.push('Shell page missing #toolbar');
    if (!html.includes('id="toast-container"')) issues.push('Shell page missing #toast-container');
    if (!html.includes('themeCustomizer')) issues.push('Shell page missing theme customizer offcanvas');
  }

  return issues;
}

// ══════════════════════════════════════════════════════════════════════════
// CHECK 10: Key structural elements
// ══════════════════════════════════════════════════════════════════════════
function check10_elements(name, html) {
  const issues = [];

  if (!html.includes('favicon')) {
    issues.push('Missing favicon reference');
  }

  if (!html.includes('bootstrap.min.css') && !html.includes('bootstrap.rtl.min.css')) {
    issues.push('Missing Bootstrap CSS');
  }

  if (!html.includes('assets/css/app.css')) {
    issues.push('Missing assets/css/app.css');
  }

  // Check Font Awesome remnants in class attributes only (not in <script> or <code> content)
  const noScriptsOrCode = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<code\b[^>]*>[\s\S]*?<\/code>/gi, '');
  const classFaRegex = /class="[^"]*\bfa(s|r|b|l)?\b[^"]*"/gi;
  const classFaMatches = (noScriptsOrCode.match(classFaRegex) || []);
  if (classFaMatches.length > 0) {
    issues.push(`Font Awesome class remnants: ${classFaMatches.length} instance(s) — ${classFaMatches.slice(0, 3).map(m => m.match(/class="([^"]*fa\w[^"]*)"/i)?.[1] || m).join(', ')}`);
  }

  // Check for bare file:// references
  if (html.includes('file://')) {
    issues.push('Contains file:// reference (should not appear in distributed code)');
  }

  return issues;
}

// ══════════════════════════════════════════════════════════════════════════
// MAIN
// ══════════════════════════════════════════════════════════════════════════
async function main() {
  console.log(`${c.bold}${c.cyan}Superbyte Admin — Structure & Consistency Verifier${c.reset}\n`);

  const files = htmlFiles();
  console.log(`${c.dim}Found ${files.length} HTML files (${SHELL_PAGES.length} shell, ${AUTH_PAGES.length} auth)${c.reset}\n`);

  // Pre-extract canonical sidebar from index.html
  let canonicalLinks = [];
  if (fs.existsSync(path.join(ROOT, 'index.html'))) {
    canonicalLinks = canonicalSidebarLinks();
    console.log(`${c.dim}Canonical sidebar: ${canonicalLinks.length} links from index.html${c.reset}\n`);
  }

  const CHECKS = [
    { num: 1, name: 'HTML well-formedness',   fn: check1_wellformed },
    { num: 2, name: 'Required markers',        fn: check2_markers },
    { num: 3, name: 'Zero CDN references',     fn: check3_cdn },
    { num: 4, name: 'Local asset resolution',  fn: check4_assets },
    { num: 5, name: 'Sidebar nav consistency',  fn: (name, html) => check5_sidebar(name, html, SHELL_PAGES.includes(name), canonicalLinks) },
    { num: 6, name: 'Script ordering',          fn: (name, html) => check6_scriptOrder(name, html, SHELL_PAGES.includes(name)) },
    { num: 7, name: 'Chart canvas conventions', fn: check7_canvas },
    { num: 8, name: 'Inline script syntax',     fn: check8_inlineScripts },
    { num: 9, name: 'Auth vs Shell distinction',fn: (name, html) => check9_authVsShell(name, html) },
    { num: 10, name: 'Key structural elements', fn: check10_elements },
  ];

  let totalIssues = 0;
  let totalWarns = 0;
  let totalPasses = 0;
  const perCheckResults = CHECKS.map(() => ({ pass: 0, fail: 0, issues: [] }));

  for (const file of files) {
    const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const pageIssues = [];
    let pageFails = 0;
    let pageWarns = 0;

    for (let ci = 0; ci < CHECKS.length; ci++) {
      const check = CHECKS[ci];
      const issues = check.fn(file, html);
      if (issues.length > 0) {
        const warns = issues.filter(i => i.startsWith('WARN:'));
        const fails = issues.filter(i => !i.startsWith('WARN:'));

        if (fails.length > 0) {
          perCheckResults[ci].fail++;
          for (const issue of fails) {
            pageIssues.push({ severity: 'FAIL', check: check.name, issue });
            perCheckResults[ci].issues.push({ file, severity: 'FAIL', issue });
            pageFails++;
          }
        }
        if (warns.length > 0) {
          for (const issue of warns) {
            pageIssues.push({ severity: 'WARN', check: check.name, issue: issue.replace(/^WARN:\s*/, '') });
            perCheckResults[ci].issues.push({ file, severity: 'WARN', issue: issue.replace(/^WARN:\s*/, '') });
            pageWarns++;
          }
        }
      } else {
        perCheckResults[ci].pass++;
      }
    }

    totalIssues += pageFails;
    totalWarns += pageWarns;

    if (pageIssues.length > 0) {
      const fails = pageIssues.filter(i => i.severity === 'FAIL');
      const warns = pageIssues.filter(i => i.severity === 'WARN');
      const parts = [];
      if (fails.length) parts.push(`${c.red}${fails.length} fail${fails.length > 1 ? 's' : ''}${c.reset}`);
      if (warns.length) parts.push(`${c.yellow}${warns.length} warn${warns.length > 1 ? 's' : ''}${c.reset}`);
      console.log(`  ${fails.length ? c.red + '✗' + c.reset : c.yellow + '⚠' + c.reset} ${file} (${parts.join(', ')})`);
      for (const pi of pageIssues) {
        const sev = pi.severity === 'FAIL' ? c.red + 'FAIL' + c.reset : c.yellow + 'WARN' + c.reset;
        console.log(`      ${c.dim}[${pi.check}]${c.reset} ${sev} ${pi.issue}`);
      }
    } else {
      totalPasses++;
      console.log(`  ${c.green}✓${c.reset} ${file}`);
    }
  }

  // ── Summary ───────────────────────────────────────────────────────────
  console.log(`\n${c.bold}${'═'.repeat(67)}${c.reset}`);
  console.log(`${c.bold}  SUMMARY${c.reset}`);
  console.log(`${c.bold}${'═'.repeat(67)}${c.reset}\n`);

  for (let ci = 0; ci < CHECKS.length; ci++) {
    const r = perCheckResults[ci];
    const total = r.pass + r.fail;
    const status = r.fail === 0 ? `${c.green}PASS${c.reset}` : `${c.red}FAIL${c.reset}`;
    const count = r.fail === 0 ? `${c.green}${r.pass}/${total}${c.reset}` : `${c.red}${r.pass}/${total} (${r.fail} failed)${c.reset}`;
    console.log(`  ${status}  Check ${String(CHECKS[ci].num).padStart(2)}: ${CHECKS[ci].name.padEnd(26)} — ${count}`);
  }

  // ── Detailed failures ─────────────────────────────────────────────────
  const allFailIssues = [];
  for (let ci = 0; ci < CHECKS.length; ci++) {
    const failIssues = perCheckResults[ci].issues.filter(i => i.severity === 'FAIL');
    if (failIssues.length > 0) {
      allFailIssues.push({ check: CHECKS[ci].name, issues: failIssues });
    }
  }

  if (allFailIssues.length > 0) {
    console.log(`\n${c.red + c.bold}  FAILURES:${c.reset}`);
    for (const group of allFailIssues) {
      console.log(`\n  ${c.yellow}── ${group.check} ──${c.reset}`);
      for (const issue of group.issues) {
        console.log(`    ${c.dim}${issue.file}:${c.reset} ${issue.issue}`);
      }
    }
  }

  // ── Final tally ───────────────────────────────────────────────────────
  console.log(`\n${c.bold}  Results: ${c.green}${totalPasses} clean${c.reset}, ${c.red}${totalIssues} issue${totalIssues !== 1 ? 's' : ''}${c.reset}, ${c.yellow}${totalWarns} warning${totalWarns !== 1 ? 's' : ''}${c.reset}`);
  console.log(`${c.bold}  Files: ${files.length} total (${SHELL_PAGES.length} shell, ${AUTH_PAGES.length} auth)${c.reset}`);

  const criticalChecks = [1, 2, 3, 8]; // well-formed, markers, CDN, script syntax
  const criticalFails = criticalChecks.reduce((sum, ci) => sum + perCheckResults[ci - 1].fail, 0);

  console.log(`  ${c.bold}Critical checks: ${criticalFails === 0 ? c.green + 'ALL PASSED' + c.reset : c.red + criticalFails + ' FAILED' + c.reset}${c.reset}`);

  // Exit code: fail on any non-warning issues
  process.exit(totalIssues > 0 ? 1 : 0);
}

main().catch(err => {
  console.error(`${c.red}Fatal error:${c.reset}`, err.message);
  process.exit(2);
});
