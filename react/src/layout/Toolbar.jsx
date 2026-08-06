import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useApp } from '../theme/AppContext'

const INITIAL_NOTIFS = [
  {
    id: 1,
    icon: 'hgi-stroke hgi-checkmark-circle-01 text-success',
    title: 'Backup completed',
    time: '2 minutes ago'
  },
  {
    id: 2,
    icon: 'hgi-stroke hgi-user-add-01',
    accent: true,
    title: 'New user registered',
    time: '1 hour ago'
  },
  {
    id: 3,
    icon: 'hgi-stroke hgi-alert-02',
    warn: true,
    title: 'Storage at 82%',
    time: '3 hours ago'
  }
]

const TITLES = {
  '/': 'Dashboard',
  '/tables': 'Tables',
  '/forms': 'Forms',
  '/components': 'Components',
  '/layouts': 'Layouts'
}

export default function Toolbar() {
  const { openNav, showToast } = useApp()
  const { pathname } = useLocation()
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS)
  const unread = notifs.filter(n => !n.read).length

  const markRead = id => setNotifs(ls => ls.map(n => (n.id === id ? { ...n, read: true } : n)))
  const markAll = () => setNotifs(ls => ls.map(n => ({ ...n, read: true })))

  return (
    <div id="toolbar">
      <button
        className="icon-btn app-nav-toggle"
        aria-label="Toggle navigation"
        onClick={openNav}
      >
        <i className="hgi-stroke hgi-menu-02"></i>
      </button>
      <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">
        <i className="hgi-stroke hgi-add-01 me-1"></i> New
      </button>
      <button
        className="btn btn-ghost"
        aria-label="Refresh data"
        onClick={() => showToast('success', 'Data refreshed')}
      >
        <i className="hgi-stroke hgi-refresh-03"></i>
      </button>
      <div className="tb-sep d-none d-md-block"></div>
      <nav className="breadcrumb-wrap d-none d-md-flex" aria-label="breadcrumb">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">Superbyte UI</li>
          <li className="breadcrumb-item active" aria-current="page">
            {TITLES[pathname] || 'Page'}
          </li>
        </ol>
      </nav>
      <div className="search-wrap ms-auto ms-md-0">
        <i className="hgi-stroke hgi-search-01 search-icon"></i>
        <input id="global-search" className="search-input" placeholder="Search…" autoComplete="off" />
      </div>
      <div
        className="icon-btn"
        data-bs-toggle="offcanvas"
        data-bs-target="#themeCustomizer"
        title="Theme colors"
      >
        <i className="hgi-stroke hgi-paint-board"></i>
      </div>
      <div className="dropdown">
        <div className="icon-btn" data-bs-toggle="dropdown">
          <i className="hgi-stroke hgi-notification-01"></i>
          <span className="ping" style={{ display: unread ? '' : 'none' }}>
            {unread}
          </span>
        </div>
        <ul className="dropdown-menu dropdown-menu-end" style={{ width: '300px' }}>
          <li className="dropdown-header px-2 pb-2">Notifications</li>
          {notifs.map(n => (
            <li key={n.id}>
              <a
                className={'dropdown-item d-flex gap-2 py-2' + (n.read ? ' read' : '')}
                href="#!"
                onClick={e => {
                  e.preventDefault()
                  markRead(n.id)
                  showToast('success', 'Notification marked as read')
                }}
              >
                <i
                  className={n.icon + ' mt-1' + (n.accent ? ' ' : '')}
                  style={n.accent ? { color: 'var(--accent-h)' } : n.warn ? { color: 'var(--yellow)' } : {}}
                ></i>
                <span>
                  <strong className="d-block" style={{ color: 'var(--text)' }}>
                    {n.title}
                  </strong>
                  <small style={{ color: 'var(--text3)' }}>{n.time}</small>
                </span>
              </a>
            </li>
          ))}
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a
              className="dropdown-item text-center"
              href="#!"
              style={{ color: 'var(--accent-h)' }}
              onClick={e => {
                e.preventDefault()
                markAll()
                showToast('success', 'All notifications marked as read')
              }}
            >
              Mark all as read
            </a>
          </li>
        </ul>
      </div>
      <div className="dropdown">
        <div className="avatar-btn" data-bs-toggle="dropdown">
          <div className="avatar-circle">JC</div>
          <div className="who d-none d-lg-block">
            <div className="n">John Canete</div>
            <div className="r">Administrator</div>
          </div>
          <i
            className="hgi-stroke hgi-arrow-down-01 d-none d-lg-block"
            style={{ fontSize: '9px', color: 'var(--text3)' }}
          ></i>
        </div>
        <ul className="dropdown-menu dropdown-menu-end">
          <li>
            <a className="dropdown-item" href="#!">
              <i className="hgi-stroke hgi-user me-2"></i>Profile
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#!">
              <i className="hgi-stroke hgi-settings-01 me-2"></i>Settings
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item text-danger" href="#!">
              <i className="hgi-stroke hgi-logout-01 me-2"></i>Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
