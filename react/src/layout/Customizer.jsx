import { useApp } from '../theme/AppContext'
import { THEMES, BASE_THEMES, FONTS, RADII } from '../theme/constants'

export default function Customizer() {
  const {
    theme,
    setTheme,
    accent,
    setAccent,
    radius,
    setRadius,
    baseTheme,
    setBaseTheme,
    font,
    setFont,
    fontSize,
    setFontSize,
    compact,
    setCompact,
    layoutMode,
    setLayoutMode,
    widthMode,
    setWidthMode
  } = useApp()

  const opt = (cond, extra) => 'appearance-opt' + (cond ? ' active' : '') + (extra || '')

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="themeCustomizer">
      <div className="offcanvas-header">
        <div className="offcanvas-title">
          <i className="hgi-stroke hgi-paint-board"></i> Theme customizer
        </div>
        <button className="btn-close" data-bs-dismiss="offcanvas"></button>
      </div>
      <div className="offcanvas-body">
        <div className="customizer-section">
          <div className="customizer-label">Appearance</div>
          <div className="appearance-grid">
            <div className={opt(theme === 'dark')} onClick={() => setTheme('dark')}>
              <i className="hgi-stroke hgi-moon-01"></i>Dark
            </div>
            <div className={opt(theme === 'light')} onClick={() => setTheme('light')}>
              <i className="hgi-stroke hgi-sun-01"></i>Light
            </div>
          </div>
        </div>

        <div className="customizer-section">
          <div className="customizer-label">Accent color</div>
          <div className="swatch-grid">
            {Object.entries(THEMES).map(([key, t]) => (
              <div
                key={key}
                className={'swatch' + (key === accent ? ' active' : '')}
                style={{ background: t.base }}
                title={t.name}
                onClick={() => setAccent(key)}
              ></div>
            ))}
          </div>
        </div>

        <div className="customizer-section">
          <div className="customizer-label">Base palette</div>
          <div className="appearance-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {Object.entries(BASE_THEMES).map(([key, t]) => (
              <div
                key={key}
                className={opt(baseTheme === key)}
                onClick={() => setBaseTheme(key)}
              >
                {t.name}
              </div>
            ))}
          </div>
        </div>

        <div className="customizer-section">
          <div className="customizer-label">Corner radius</div>
          <div className="radius-grid">
            {Object.entries(RADII).map(([key, r]) => (
              <div
                key={key}
                className={'radius-opt' + (radius === key ? ' active' : '')}
                onClick={() => setRadius(key)}
              >
                {r.name}
              </div>
            ))}
          </div>
        </div>

        <div className="customizer-section">
          <div className="customizer-label">Layout density</div>
          <div className="appearance-grid">
            <div className={opt(compact)} onClick={() => setCompact(true)}>
              <i className="hgi-stroke hgi-drag-02"></i>Compact
            </div>
            <div className={opt(!compact)} onClick={() => setCompact(false)}>
              <i className="hgi-stroke hgi-more-vertical"></i>Roomy
            </div>
          </div>
        </div>

        <div className="customizer-section">
          <div className="customizer-label">Content width</div>
          <div className="appearance-grid">
            {['fluid', 'boxed', 'contained'].map(w => (
              <div key={w} className={opt(widthMode === w)} onClick={() => setWidthMode(w)}>
                {w === 'fluid' && <i className="hgi-stroke hgi-arrow-expand-01"></i>}
                {w === 'boxed' && <i className="hgi-stroke hgi-arrow-shrink-01"></i>}
                {w === 'contained' && <i className="hgi-stroke hgi-square-arrow-down-01"></i>}
                {w[0].toUpperCase() + w.slice(1)}
              </div>
            ))}
          </div>
        </div>

        <div className="customizer-section">
          <div className="customizer-label">Navigation</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {['vertical', 'horizontal', 'mini-sidebar'].map(mode => (
              <div
                key={mode}
                className={opt(layoutMode === mode)}
                onClick={() => setLayoutMode(mode)}
              >
                {mode === 'vertical' && <i className="hgi-stroke hgi-sidebar-left"></i>}
                {mode === 'horizontal' && <i className="hgi-stroke hgi-arrow-expand-01"></i>}
                {mode === 'mini-sidebar' && <i className="hgi-stroke hgi-layers-01"></i>}
                {mode === 'mini-sidebar' ? 'Mini Sidebar' : mode[0].toUpperCase() + mode.slice(1)}
              </div>
            ))}
          </div>
        </div>

        <div className="customizer-section">
          <div className="customizer-label">Font family</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            {Object.entries(FONTS).map(([key, f]) => (
              <div
                key={key}
                className={opt(font === key)}
                onClick={() => setFont(key)}
                style={{ fontSize: '11px' }}
              >
                {f.name}
              </div>
            ))}
          </div>
        </div>

        <div className="customizer-section">
          <div className="customizer-label">Base font size</div>
          <input
            type="range"
            className="form-range"
            min="13"
            max="17"
            value={fontSize}
            onChange={e => setFontSize(e.target.value)}
          />
          <div
            className="d-flex justify-content-between"
            style={{ fontSize: '10.5px', color: 'var(--text3)', marginTop: '4px' }}
          >
            <span>13</span>
            <span>{fontSize}px</span>
            <span>17</span>
          </div>
        </div>

        <div className="customizer-section mb-0">
          <div className="customizer-label">Preview</div>
          <div className="card p-3 d-flex flex-column gap-2">
            <button className="btn btn-primary btn-sm">Primary button</button>
            <span className="tag tag-indigo">
              <i className="hgi-stroke hgi-circle"></i> Sample tag
            </span>
            <div className="progress">
              <div className="progress-bar" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
