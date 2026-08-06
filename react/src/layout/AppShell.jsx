import { Outlet } from 'react-router-dom'
import { useApp } from '../theme/AppContext'
import Sidebar from './Sidebar'
import Toolbar from './Toolbar'
import Footer from './Footer'
import Customizer from './Customizer'
import QuickSearch from './QuickSearch'
import Modals from './Modals'
import ToastHost from './ToastHost'

export default function AppShell() {
  const { navOpen, closeNav, showToast } = useApp()

  return (
    <>
      <div id="toast-container">
        <ToastHost />
      </div>
      <input type="file" id="drop-file" className="d-none" multiple />

      <div id="app">
        <div id="app-overlay" className={navOpen ? 'open' : undefined} onClick={closeNav}></div>

        <Sidebar navOpen={navOpen} />

        <div id="main">
          <Toolbar />

          <div id="content">
            <Outlet />
          </div>

          <Footer />
        </div>
      </div>

      <Modals showToast={showToast} />
      <Customizer />
      <QuickSearch />
    </>
  )
}
