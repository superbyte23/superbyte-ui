import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { THEMES, FONTS, RADII, STORAGE } from './constants'

const AppContext = createContext(null)

export function useApp() {
  return useContext(AppContext)
}

function getContrastText(hex) {
  const clean = String(hex).replace('#', '')
  const r = parseInt(clean.substr(0, 2), 16)
  const g = parseInt(clean.substr(2, 2), 16)
  const b = parseInt(clean.substr(4, 2), 16)
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.72 ? '#111827' : '#ffffff'
}

const save = k => v => { try { localStorage.setItem(k, v) } catch (e) {} }

export function AppProvider({ children }) {
  const [theme, setTheme] = useState('dark')
  const [accent, setAccent] = useState('indigo')
  const [radius, setRadius] = useState('14px')
  const [baseTheme, setBaseTheme] = useState('neutral')
  const [font, setFont] = useState('ubuntu')
  const [fontSize, setFontSize] = useState(14)
  const [compact, setCompact] = useState(false)
  const [layoutMode, setLayoutMode] = useState('vertical')
  const [widthMode, setWidthMode] = useState('fluid')
  const [navOpen, setNavOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)

  // Adopt the pre-painted state (theme-bootstrap ran in index.html) exactly
  // like app.js does: body classes are the single source of truth for the
  // layout axes, localStorage for the rest.
  useEffect(() => {
    const L = localStorage
    const b = document.body.classList
    const preApplied =
      b.contains('layout-fluid') || b.contains('layout-boxed') || b.contains('layout-contained')
    let nav = 'vertical'
    let width = 'fluid'
    let comp = false
    if (preApplied) {
      nav = b.contains('layout-horizontal')
        ? 'horizontal'
        : b.contains('layout-mini-sidebar')
          ? 'mini-sidebar'
          : 'vertical'
      width = b.contains('layout-boxed') ? 'boxed' : b.contains('layout-contained') ? 'contained' : 'fluid'
      comp = b.contains('layout-compact')
    } else {
      const storedNav = L.getItem(STORAGE.layout)
      nav = ['vertical', 'horizontal', 'mini-sidebar'].includes(storedNav) ? storedNav : 'vertical'
      width = L.getItem(STORAGE.width) || (L.getItem(STORAGE.boxed) === '1' ? 'boxed' : 'fluid')
      comp = L.getItem(STORAGE.compact) === '1'
    }
    setTheme(document.body.getAttribute('data-bs-theme') === 'light' ? 'light' : 'dark')
    setAccent(L.getItem(STORAGE.accent) || 'indigo')
    setRadius(L.getItem(STORAGE.radius) || '14px')
    setBaseTheme(
      document.body.getAttribute('data-base-theme') || L.getItem(STORAGE.base) || 'neutral'
    )
    setFont(L.getItem(STORAGE.font) || 'ubuntu')
    const fs = parseInt(L.getItem(STORAGE.fontsize), 10)
    setFontSize(fs >= 13 && fs <= 17 ? fs : 14)
    setLayoutMode(nav)
    setWidthMode(width)
    setCompact(comp)
  }, [])

  const applyAccent = (key, mode) => {
    const t = THEMES[key]
    if (!t) return
    const light = mode === 'light'
    const s = document.body.style
    s.setProperty('--accent', t.base)
    s.setProperty('--accent-h', t.hi)
    s.setProperty('--accent-text', getContrastText(t.base))
    s.setProperty('--accent-bg', `rgba(${t.rgb},${light ? '.08' : '.12'})`)
    s.setProperty('--bs-primary', t.base)
    s.setProperty('--bs-primary-rgb', t.rgb)
  }

  const updateAppearance = mode => {
    document.body.setAttribute('data-bs-theme', mode)
    save(STORAGE.theme)(mode)
    applyAccent(accent, mode)
    setTheme(mode)
  }
  const toggleTheme = () => updateAppearance(theme === 'dark' ? 'light' : 'dark')

  const changeAccent = key => {
    if (!THEMES[key]) return
    applyAccent(key, theme)
    save(STORAGE.accent)(key)
    setAccent(key)
  }

  const changeRadius = key => {
    const r = RADII[key]
    if (!r) return
    const s = document.body.style
    s.setProperty('--radius', r.pair[0])
    s.setProperty('--radius-sm', r.pair[1])
    s.setProperty('--bs-border-radius', r.pair[0])
    s.setProperty('--bs-border-radius-sm', r.pair[1])
    save(STORAGE.radius)(key)
    setRadius(key)
  }

  const changeBaseTheme = key => {
    document.body.setAttribute('data-base-theme', key)
    save(STORAGE.base)(key)
    setBaseTheme(key)
  }

  const changeFont = key => {
    const f = FONTS[key]
    if (!f) return
    document.body.style.setProperty('--sans', f.stack)
    save(STORAGE.font)(key)
    setFont(key)
  }

  const changeFontSize = n => {
    n = Math.min(17, Math.max(13, parseInt(n, 10)))
    document.documentElement.style.fontSize = n + 'px'
    save(STORAGE.fontsize)(String(n))
    setFontSize(n)
  }

  const changeCompact = on => {
    document.body.classList.toggle('layout-compact', on)
    save(STORAGE.compact)(on ? '1' : '0')
    setCompact(on)
  }

  const changeLayoutMode = mode => {
    const b = document.body.classList
    const mobile = window.matchMedia('(max-width: 991.98px)').matches
    b.remove('layout-horizontal', 'layout-mini-sidebar')
    if (mode === 'horizontal') b.add('layout-horizontal')
    else if (mode === 'mini-sidebar' && !mobile) b.add('layout-mini-sidebar')
    if (mode === 'condensed') changeCompact(true)
    else if (mode === 'comfy') changeCompact(false)
    else save(STORAGE.layout)(mode)
    setLayoutMode(mode)
  }

  const changeWidthMode = mode => {
    const b = document.body.classList
    b.remove('layout-boxed', 'layout-contained', 'layout-fluid')
    if (mode === 'boxed') b.add('layout-boxed')
    else if (mode === 'contained') b.add('layout-contained')
    else b.add('layout-fluid')
    save(STORAGE.width)(mode)
    save(STORAGE.boxed)(mode === 'boxed' ? '1' : '0')
    setWidthMode(mode)
  }

  const openNav = () => setNavOpen(true)
  const closeNav = () => setNavOpen(false)

  const showToast = (type, msg) => {
    const id = ++toastId.current
    setToasts(t => [...t, { id, type, msg }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3300)
  }

  return (
    <AppContext.Provider
      value={{
        theme,
        accent,
        radius,
        baseTheme,
        font,
        fontSize,
        compact,
        layoutMode,
        widthMode,
        navOpen,
        toasts,
        toggleTheme,
        setTheme: updateAppearance,
        setAccent: changeAccent,
        setRadius: changeRadius,
        setBaseTheme: changeBaseTheme,
        setFont: changeFont,
        setFontSize: changeFontSize,
        setCompact: changeCompact,
        setLayoutMode: changeLayoutMode,
        setWidthMode: changeWidthMode,
        openNav,
        closeNav,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
