export const THEMES = {
  indigo: { name: 'Indigo', base: '#6366f1', hi: '#818cf8', rgb: '99,102,241' },
  violet: { name: 'Violet', base: '#8b5cf6', hi: '#a78bfa', rgb: '139,92,246' },
  fuchsia: { name: 'Fuchsia', base: '#d946ef', hi: '#e879f9', rgb: '217,70,239' },
  pink: { name: 'Pink', base: '#ec4899', hi: '#f472b6', rgb: '236,72,153' },
  rose: { name: 'Rose', base: '#f43f5e', hi: '#fb7185', rgb: '244,63,94' },
  red: { name: 'Red', base: '#ef4444', hi: '#f87171', rgb: '239,68,68' },
  orange: { name: 'Orange', base: '#f97316', hi: '#fb923c', rgb: '249,115,22' },
  amber: { name: 'Amber', base: '#f59e0b', hi: '#fbbf24', rgb: '245,158,11' },
  yellow: { name: 'Yellow', base: '#eab308', hi: '#facc15', rgb: '234,179,8' },
  lime: { name: 'Lime', base: '#84cc16', hi: '#a3e635', rgb: '132,204,22' },
  green: { name: 'Green', base: '#22c55e', hi: '#4ade80', rgb: '34,197,94' },
  emerald: { name: 'Emerald', base: '#10b981', hi: '#34d399', rgb: '16,185,129' },
  teal: { name: 'Teal', base: '#14b8a6', hi: '#2dd4bf', rgb: '20,184,166' },
  cyan: { name: 'Cyan', base: '#06b6d4', hi: '#22d3ee', rgb: '6,182,212' },
  sky: { name: 'Sky', base: '#0ea5e9', hi: '#38bdf8', rgb: '14,165,233' },
  blue: { name: 'Blue', base: '#3b82f6', hi: '#60a5fa', rgb: '59,130,246' },
  purple: { name: 'Purple', base: '#a855f7', hi: '#c084fc', rgb: '168,85,247' },
  white: { name: 'White', base: '#ffffff', hi: '#e5e7eb', rgb: '255,255,255' },
  dark: { name: 'Dark', base: '#111827', hi: '#1f2937', rgb: '17,24,39' }
}

export const FONTS = {
  ubuntu: { name: 'Ubuntu', stack: "'Ubuntu', sans-serif" },
  inter: { name: 'Inter', stack: "'Inter', 'Ubuntu', sans-serif" },
  notosans: { name: 'Noto Sans', stack: "'Noto Sans', 'Ubuntu', sans-serif" },
  nunitosans: { name: 'Nunito Sans', stack: "'Nunito Sans', 'Ubuntu', sans-serif" },
  figtree: { name: 'Figtree', stack: "'Figtree', 'Ubuntu', sans-serif" },
  roboto: { name: 'Roboto', stack: "'Roboto', 'Ubuntu', sans-serif" },
  raleway: { name: 'Raleway', stack: "'Raleway', 'Ubuntu', sans-serif" },
  dmsans: { name: 'DM Sans', stack: "'DM Sans', 'Ubuntu', sans-serif" },
  publicsans: { name: 'Public Sans', stack: "'Public Sans', 'Ubuntu', sans-serif" },
  outfit: { name: 'Outfit', stack: "'Outfit', 'Ubuntu', sans-serif" },
  oxanium: { name: 'Oxanium', stack: "'Oxanium', 'Ubuntu', sans-serif" },
  manrope: { name: 'Manrope', stack: "'Manrope', 'Ubuntu', sans-serif" },
  spacegrotesk: { name: 'Space Grotesk', stack: "'Space Grotesk', 'Ubuntu', sans-serif" },
  montserrat: { name: 'Montserrat', stack: "'Montserrat', 'Ubuntu', sans-serif" },
  ibmplexsans: { name: 'IBM Plex Sans', stack: "'IBM Plex Sans', 'Ubuntu', sans-serif" },
  sourcesans3: { name: 'Source Sans 3', stack: "'Source Sans 3', 'Ubuntu', sans-serif" },
  instrumentsans: { name: 'Instrument Sans', stack: "'Instrument Sans', 'Ubuntu', sans-serif" }
}

export const BASE_THEMES = {
  neutral: { name: 'Neutral' },
  stone: { name: 'Stone' },
  zinc: { name: 'Zinc' },
  mauve: { name: 'Mauve' },
  olive: { name: 'Olive' },
  mist: { name: 'Mist' },
  taupe: { name: 'Taupe' }
}

export const RADII = {
  '4px': { name: 'Sharp', pair: ['4px', '2px'] },
  '8px': { name: 'Default', pair: ['8px', '4px'] },
  '14px': { name: 'Round', pair: ['14px', '8px'] }
}

export const STORAGE = {
  theme: 'grid_admin_theme',
  accent: 'grid_admin_accent',
  base: 'grid_admin_basetheme',
  font: 'grid_admin_font',
  radius: 'grid_admin_radius',
  fontsize: 'grid_admin_fontsize',
  compact: 'grid_admin_compact',
  boxed: 'grid_admin_boxed',
  layout: 'grid_admin_layout_mode',
  width: 'grid_admin_width_mode'
}

export const NAV = [
  {
    label: 'General',
    items: [{ to: '/', label: 'Dashboard', icon: 'hgi-dashboard-speed-01', end: true }]
  },
  {
    label: 'Data',
    items: [{ to: '/tables', label: 'Tables', icon: 'hgi-table-02' }]
  },
  {
    label: 'Components',
    items: [
      { to: '/forms', label: 'Forms', icon: 'hgi-check-list' },
      { to: '/components', label: 'Components', icon: 'hgi-layers-01' }
    ]
  },
  {
    label: 'Layout',
    items: [{ to: '/layouts', label: 'Layouts', icon: 'hgi-grid-view' }]
  }
]
