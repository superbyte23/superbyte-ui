export default function StatCard({ icon, bg, color, delta, up, value, label }) {
  return (
    <div className="card stat-card">
      <div className="top">
        <div className="stat-icon" style={{ background: bg, color }}>
          <i className={'hgi-stroke ' + icon}></i>
        </div>
        <span className={'stat-delta ' + (up ? 'up' : 'down')}>
          <i className={'hgi-stroke ' + (up ? 'hgi-arrow-up-01' : 'hgi-arrow-down-01')}></i>{' '}
          {delta}%
        </span>
      </div>
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
  )
}
