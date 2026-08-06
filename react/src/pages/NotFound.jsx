import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="page-section active">
      <div className="card">
        <div className="card-body d-flex flex-column align-items-center gap-3 py-5 text-center">
          <i className="hgi-stroke hgi-search-minus" style={{ fontSize: '40px', color: 'var(--text3)' }}></i>
          <div>
            <h1 className="mb-1">404</h1>
            <p style={{ color: 'var(--text3)' }}>This page hasn't been ported to React yet.</p>
          </div>
          <Link to="/" className="btn btn-primary">
            <i className="hgi-stroke hgi-arrow-left-01 me-1"></i> Back to dashboard
          </Link>
        </div>
      </div>
    </section>
  )
}
