export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="app-footer-inner d-flex flex-wrap align-items-center justify-content-center justify-content-md-between">
        <div className="footer-meta">
          <span className="plan-tag">
            <span className="status-dot on"></span>v1.0.0
          </span>
          <span className="footer-status">
            <span className="status-dot on"></span>System online · 99.9% uptime
          </span>
        </div>
        <div className="footer-storage">
          <div className="fs-label">
            <span>Storage</span>
            <span>6.2 GB of 10 GB</span>
          </div>
          <div className="progress">
            <div className="progress-bar" style={{ width: '62%' }}></div>
          </div>
        </div>
        <div className="footer-links">
          <a href="#!">Docs</a>
          <a href="#!">Support</a>
          <a href="#!">Changelog</a>
        </div>
        <div className="footer-copy">© 2026 Superbyte UI</div>
      </div>
    </footer>
  )
}
