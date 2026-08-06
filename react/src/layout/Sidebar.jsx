import { NavLink } from 'react-router-dom'
import { useApp } from '../theme/AppContext'
import { NAV } from '../theme/constants'

export default function Sidebar({ navOpen }) {
  const { layoutMode, setLayoutMode, closeNav } = useApp()

  return (
    <div id="app-nav" className={navOpen ? 'open' : undefined}>
      <div className="app-logo">
        <div className="logo-mark">
          <i className="hgi-stroke hgi-flowchart-01"></i>
        </div>
        Superbyte UI
        <button
          type="button"
          className="app-nav-collapse"
          title="Toggle sidebar"
          aria-label="Toggle sidebar"
          onClick={() => setLayoutMode(layoutMode === 'mini-sidebar' ? 'vertical' : 'mini-sidebar')}
        >
          <i className="hgi hgi-stroke hgi-sidebar-left-01"></i>
        </button>
      </div>
      <nav id="app-navigation" className="app-navigation">
        {NAV.map(group => (
          <div key={group.label}>
            <div className="nav-group-label">{group.label}</div>
            {group.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => 'side-link' + (isActive ? ' active' : '')}
                onClick={closeNav}
              >
                <i className={'hgi-stroke ' + item.icon}></i> {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="app-user">
        <div className="dropdown">
          <div className="avatar-btn" data-bs-toggle="dropdown">
            <div className="avatar-circle">JC</div>
            <div className="who">
              <div className="n">John Canete</div>
              <div className="r">Administrator</div>
            </div>
            <i
              className="hgi-stroke hgi-arrow-down-01 footer-user-chev"
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
    </div>
  )
}
