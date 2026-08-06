import { useApp } from '../theme/AppContext'

const TAGS = ['indigo', 'green', 'yellow', 'red', 'blue', 'slate']

export default function Components() {
  const { showToast } = useApp()

  return (
    <section className="page-section active">
      <div className="page-head">
        <div>
          <h1>Components</h1>
          <p>buttons · badges · alerts · cards · progress</p>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-geometric-shapes-01"></i> Buttons
              </div>
            </div>
            <div className="card-body d-flex flex-wrap gap-2">
              <button className="btn btn-primary">Primary</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-success">Success</button>
              <button className="btn btn-danger">Danger</button>
              <button className="btn btn-warning">Warning</button>
              <button className="btn btn-info">Info</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-outline-primary">Outline</button>
              <button className="btn btn-primary btn-sm">
                <i className="hgi-stroke hgi-add-01 me-1"></i> Small
              </button>
              <button className="btn btn-primary btn-lg">Large</button>
              <button className="btn btn-primary" disabled>
                Disabled
              </button>
              <button className="btn btn-primary" onClick={() => showToast('success', 'Button clicked')}>
                <i className="hgi-stroke hgi-tick-01 me-1"></i> Click me
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-circles-three-plus"></i> Badges &amp; tags
              </div>
            </div>
            <div className="card-body d-flex flex-wrap gap-2 align-items-center">
              {TAGS.map(t => (
                <span key={t} className={'tag tag-' + t}>
                  <i className="hgi-stroke hgi-circle"></i> {t[0].toUpperCase() + t.slice(1)}
                </span>
              ))}
              <span className="badge rounded-pill text-bg-primary">3 new</span>
              <span className="badge rounded-pill text-bg-success">Passed</span>
              <span className="badge rounded-pill text-bg-danger">Failed</span>
              <span className="badge rounded-pill text-bg-warning">Pending</span>
              <span className="status-dot on"></span> Online
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-alert-02"></i> Alerts
              </div>
            </div>
            <div className="card-body d-flex flex-column gap-2">
              <div className="alert alert-success d-flex align-items-center gap-2 mb-0">
                <i className="hgi-stroke hgi-checkmark-circle-01"></i>
                <span>Deployment finished successfully.</span>
              </div>
              <div className="alert alert-warning d-flex align-items-center gap-2 mb-0">
                <i className="hgi-stroke hgi-alert-02"></i>
                <span>Storage is at 82% — consider cleaning up old builds.</span>
              </div>
              <div className="alert alert-danger d-flex align-items-center gap-2 mb-0">
                <i className="hgi-stroke hgi-cancel-circle"></i>
                <span>Billing payment failed. Review your payment method.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-pie-chart-01"></i> Progress
              </div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              {[
                { label: 'Onboarding', pct: 75, color: 'var(--accent-h)' },
                { label: 'Data migration', pct: 40, color: 'var(--green)' },
                { label: 'Compliance review', pct: 90, color: 'var(--yellow)' }
              ].map(m => (
                <div key={m.label}>
                  <div className="d-flex justify-content-between mb-1" style={{ fontSize: '12px' }}>
                    <span style={{ color: 'var(--text2)' }}>{m.label}</span>
                    <span className="font-mono" style={{ color: 'var(--text3)' }}>
                      {m.pct}%
                    </span>
                  </div>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: m.pct + '%', background: m.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-4">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-modal-02"></i> Modals &amp; tabs
              </div>
            </div>
            <div className="card-body d-flex flex-column gap-2">
              <button className="btn btn-ghost" data-bs-toggle="modal" data-bs-target="#createModal">
                <i className="hgi-stroke hgi-folder-add me-1"></i> New folder
              </button>
              <button className="btn btn-ghost" data-bs-toggle="modal" data-bs-target="#uploadModal">
                <i className="hgi-stroke hgi-cloud-upload me-1"></i> Upload files
              </button>
              <button className="btn btn-ghost" data-bs-toggle="modal" data-bs-target="#deleteModal">
                <i className="hgi-stroke hgi-trash-01 me-1"></i> Confirm delete
              </button>
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-layers-01"></i> Cards &amp; list groups
              </div>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {[
                  { icon: 'hgi-tick-01', cls: 'text-success', title: 'Deploy #a92f1c succeeded', sub: 'production · 12 minutes ago' },
                  { icon: 'hgi-user-add-01', cls: 'var(--accent-h)', title: 'Maria Santos joined the Editors team', sub: '45 minutes ago' },
                  { icon: 'hgi-alert-02', cls: 'var(--yellow)', title: 'CPU usage above 85% on api-2', sub: '2 hours ago' },
                  { icon: 'hgi-database-01', cls: 'var(--blue)', title: 'Nightly backup completed', sub: 'yesterday, 02:12' }
                ].map(i => (
                  <li key={i.title} className="list-group-item d-flex align-items-center gap-3">
                    <i className={'hgi-stroke ' + i.icon} style={{ color: i.cls }}></i>
                    <div className="flex-fill">
                      <div style={{ color: 'var(--text)', fontWeight: 500, fontSize: '13px' }}>{i.title}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{i.sub}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
