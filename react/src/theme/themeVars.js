export function themeVars() {
  const cs = getComputedStyle(document.body)
  const g = k => cs.getPropertyValue(k).trim()
  return {
    accent: g('--accent'),
    accentHi: g('--accent-h'),
    rgb: g('--bs-primary-rgb'),
    grid: g('--surface2'),
    border: g('--surface'),
    border2: g('--border2'),
    green: g('--green'),
    text2: g('--text2'),
    text3: g('--text3')
  }
}
