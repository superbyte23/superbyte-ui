import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import 'superbyte-admin/vendor/bootstrap/css/bootstrap.min.css'
import 'superbyte-admin/vendor/hugeicons/css/hugeicons-full.css'
import 'superbyte-admin/vendor/bootstrap-icons/font/bootstrap-icons.css'
import 'superbyte-admin/vendor/fonts.css'
import 'superbyte-admin/vendor/fonts/theme-fonts.css'
import 'superbyte-admin/assets/css/app.css'
import 'superbyte-admin/assets/css/layout-modes.css'

import 'superbyte-admin/vendor/bootstrap/js/bootstrap.bundle.min.js'

import { AppProvider } from './theme/AppContext'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
)
