import { useApp } from '../theme/AppContext'

const NAV_PRESETS = [
  { mode: 'vertical', label: 'Vertical', icon: 'hgi-sidebar-left' },
  { mode: 'horizontal', label: 'Horizontal', icon: 'hgi-arrow-expand-01' },
  { mode: 'mini-sidebar', label: 'Mini Sidebar', icon: 'hgi-layers-01' }
]

const WIDTH_PRESETS = [
  { mode: 'fluid', label: 'Fluid', icon: 'hgi-arrow-expand-01', desc: 'Full width content' },
  { mode: 'boxed', label: 'Boxed', icon: 'hgi-arrow-shrink-01', desc: 'Bootstrap container grid' },
  { mode: 'contained', label: 'Contained', icon: 'hgi-square-arrow-down-01', desc: 'Fixed inner max-width' }
]

export default function Layouts() {
  const {
    layoutMode,
    setLayoutMode,
    widthMode,
    setWidthMode,
    compact,
    setCompact,
    showToast
  } = useApp()

  const apply = (mode, width) => {
    setLayoutMode(mode)
    setWidthMode(width)
    showToast('success', `Layout switched to ${mode} + ${width}`)
  }

  return (
    <section className="page-section active">
      <div className="page-head">
        <div>
          <h1>Layouts</h1>
          <p>switch navigation frame × content width from the customizer — or use the presets below</p>
        </div>
      </div>

      <div className="row g-3 mb-3">
        {NAV_PRESETS.map(p => (
          <div key={p.mode} className="col-md-4">
            <div
              className="card h-100"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setLayoutMode(p.mode)
                showToast('success', 'Navigation switched to ' + p.label)
              }}
            >
              <div className="card-body d-flex flex-column gap-2">
                <div className="d-flex align-items-center justify-content-between">
                  <i className={'hgi-stroke ' + p.icon} style={{ fontSize: '22px', color: 'var(--accent-h)' }}></i>
                  {layoutMode === p.mode && <span className="badge rounded-pill text-bg-primary">Active</span>}
                </div>
                <div style={{ color: 'var(--text)', fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--text3)' }}>
                  {p.mode === 'mini-sidebar' ? 'Icon rail, desktop only' : p.label.toLowerCase() + ' navigation'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        {WIDTH_PRESETS.map(w => (
          <div key={w.mode} className="col-md-4">
            <div
              className="card h-100"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setWidthMode(w.mode)
                showToast('success', 'Content width switched to ' + w.label)
              }}
            >
              <div className="card-body d-flex flex-column gap-2">
                <div className="d-flex align-items-center justify-content-between">
                  <i className={'hgi-stroke ' + w.icon} style={{ fontSize: '22px', color: 'var(--accent-h)' }}></i>
                  {widthMode === w.mode && <span className="badge rounded-pill text-bg-primary">Active</span>}
                </div>
                <div style={{ color: 'var(--text)', fontWeight: 600 }}>{w.label}</div>
                <div style={{ fontSize: '12px', color: 'var(--text3)' }}>{w.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-drag-02"></i> Density
              </div>
            </div>
            <div className="card-body">
              <div className="btn-group" role="group">
                <button
                  className={'btn ' + (compact ? 'btn-primary' : 'btn-ghost')}
                  onClick={() => setCompact(true)}
                >
                  Compact
                </button>
                <button
                  className={'btn ' + (!compact ? 'btn-primary' : 'btn-ghost')}
                  onClick={() => setCompact(false)}
                >
                  Roomy
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-arrow-expand-01"></i> Combined presets
              </div>
            </div>
            <div className="card-body d-flex flex-wrap gap-2">
              {['vertical', 'horizontal', 'mini-sidebar'].map(m =>
                ['fluid', 'boxed', 'contained'].map(w => (
                  <button
                    key={m + w}
                    className="btn btn-ghost btn-sm"
                    onClick={() => apply(m, w)}
                  >
                    {m.replace('-', ' ')} + {w}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body" style={{ color: 'var(--text2)', fontSize: '13px' }}>
          These presets mirror the <code>layout-*.html</code> pages in the vanilla template — in
          React the layout is switched in place via context (persisted to{' '}
          <code>grid_admin_layout_mode</code> / <code>grid_admin_width_mode</code>, shared with the
          vanilla template).
        </div>
      </div>
    </section>
  )
}
