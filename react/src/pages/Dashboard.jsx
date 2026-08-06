import 'superbyte-admin/vendor/chart.js/chart.umd.min.js'
import { themeVars } from '../theme/themeVars'
import ChartCanvas from '../components/ChartCanvas'
import StatCard from '../components/StatCard'

const STATS = [
  { icon: 'hgi-money-01', bg: 'var(--accent-bg)', color: 'var(--accent-h)', delta: 12.4, up: true, value: '$84,204', label: 'Total Revenue' },
  { icon: 'hgi-user-group', bg: 'var(--green-bg)', color: 'var(--green)', delta: 4.1, up: true, value: '2,318', label: 'Active Users' },
  { icon: 'hgi-shopping-cart-01', bg: 'var(--yellow-bg)', color: 'var(--yellow)', delta: 2.3, up: false, value: '1,042', label: 'Orders' },
  { icon: 'hgi-rotate-left-01', bg: 'var(--danger-bg)', color: 'var(--danger)', delta: 0.8, up: true, value: '3.2%', label: 'Churn Rate' }
]

const ACTIVITY = [
  { icon: 'hgi-tick-01', bg: 'var(--green-bg)', color: 'var(--green)', tag: 'tag-green', tagTxt: 'passed', title: 'Deploy #a92f1c succeeded', sub: 'production · 12 minutes ago' },
  { icon: 'hgi-user-add-01', bg: 'var(--accent-bg)', color: 'var(--accent-h)', tag: 'tag-indigo', tagTxt: 'team', title: 'Maria Santos joined the Editors team', sub: '45 minutes ago' },
  { icon: 'hgi-alert-02', bg: 'var(--yellow-bg)', color: 'var(--yellow)', tag: 'tag-yellow', tagTxt: 'warning', title: 'CPU usage above 85% on api-2', sub: '2 hours ago' },
  { icon: 'hgi-database-01', bg: 'var(--blue-bg)', color: 'var(--blue)', tag: 'tag-blue', tagTxt: 'system', title: 'Nightly backup completed', sub: 'yesterday, 02:12' }
]

function revenueChart() {
  const v = themeVars()
  return {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          label: 'Revenue',
          data: [42, 49, 45, 58, 63, 70, 84],
          borderColor: v.accent,
          backgroundColor: `rgba(${v.rgb},.12)`,
          fill: true,
          tension: 0.35,
          pointRadius: 0,
          borderWidth: 2
        },
        {
          label: 'Target',
          data: [45, 45, 50, 55, 60, 65, 70],
          borderColor: v.border2,
          borderDash: [4, 4],
          fill: false,
          tension: 0.35,
          pointRadius: 0,
          borderWidth: 2
        }
      ]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { x: { grid: { display: false } }, y: { grid: { color: v.grid } } },
      maintainAspectRatio: false
    }
  }
}

function trafficChart() {
  const v = themeVars()
  return {
    type: 'doughnut',
    data: {
      labels: ['Direct', 'Organic', 'Referral'],
      datasets: [
        {
          data: [48, 31, 21],
          backgroundColor: [v.accent, v.accentHi, v.border2],
          borderColor: v.border,
          borderWidth: 3
        }
      ]
    },
    options: { plugins: { legend: { display: false } }, cutout: '72%', maintainAspectRatio: false }
  }
}

const SOURCES = [
  { label: 'Direct', pct: '48%', color: '#6366f1' },
  { label: 'Organic', pct: '31%', color: '#818cf8' },
  { label: 'Referral', pct: '21%', color: '#2e3547' }
]

export default function Dashboard() {
  return (
    <section className="page-section active">
      <div className="page-head">
        <div>
          <h1>Dashboard</h1>
          <p>overview · last synced 2 min ago</p>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-ghost btn-sm">
            <i className="hgi-stroke hgi-calendar-02 me-1"></i> Last 30 days
          </button>
          <button className="btn btn-primary btn-sm">
            <i className="hgi-stroke hgi-download-01 me-1"></i> Export
          </button>
        </div>
      </div>

      <div className="row g-3 mb-3">
        {STATS.map(s => (
          <div key={s.label} className="col-6 col-xl-3">
            <StatCard {...s} />
          </div>
        ))}
      </div>

      <div className="row g-3 mb-3">
        <div className="col-lg-8">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-chart-line-data-01"></i> Revenue overview
              </div>
              <div className="d-flex gap-1">
                <span className="tag tag-indigo">
                  <i className="hgi-stroke hgi-circle"></i> Revenue
                </span>
                <span className="tag tag-slate">
                  <i className="hgi-stroke hgi-circle"></i> Target
                </span>
              </div>
            </div>
            <div className="card-body">
              <ChartCanvas height={230} build={revenueChart} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card h-100" id="traffic-sources">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-pie-chart-01"></i> Traffic sources
              </div>
            </div>
            <div className="card-body d-flex flex-column align-items-center">
              <div className="w-100" style={{ height: '180px' }}>
                <ChartCanvas height={180} build={trafficChart} />
              </div>
              <div className="w-100 mt-3">
                {SOURCES.map(s => (
                  <div
                    key={s.label}
                    className="d-flex justify-content-between mb-2"
                    style={{ fontSize: '12px' }}
                  >
                    <span>
                      <span className="legend-dot" style={{ background: s.color }}></span>
                      {s.label}
                    </span>
                    <span className="font-mono" style={{ color: 'var(--text2)' }}>
                      {s.pct}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-7">
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-left-to-right-list-bullet"></i> Recent activity
              </div>
              <span className="card-sub">7 events</span>
            </div>
            <div className="list-group list-group-flush">
              {ACTIVITY.map(a => (
                <div key={a.title} className="list-group-item d-flex align-items-center gap-3">
                  <div
                    className="stat-icon"
                    style={{
                      background: a.bg,
                      color: a.color,
                      width: '30px',
                      height: '30px',
                      fontSize: '12px'
                    }}
                  >
                    <i className={'hgi-stroke ' + a.icon}></i>
                  </div>
                  <div className="flex-fill">
                    <div style={{ color: 'var(--text)', fontWeight: 500, fontSize: '13px' }}>
                      {a.title}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text3)' }}>{a.sub}</div>
                  </div>
                  <span className={'tag ' + a.tag}>{a.tagTxt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-cube"></i> System health
              </div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              {[
                { label: 'CPU', pct: 34, color: 'var(--green)' },
                { label: 'Memory', pct: 62, color: 'var(--accent-h)' },
                { label: 'Storage', pct: 78, color: 'var(--yellow)' }
              ].map(m => (
                <div key={m.label}>
                  <div className="d-flex justify-content-between mb-1" style={{ fontSize: '12px' }}>
                    <span style={{ color: 'var(--text2)' }}>{m.label}</span>
                    <span className="font-mono" style={{ color: 'var(--text3)' }}>
                      {m.pct}%
                    </span>
                  </div>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: m.pct + '%', background: m.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
