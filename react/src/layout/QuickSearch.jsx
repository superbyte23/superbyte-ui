import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NAV } from '../theme/constants'

const ALL = NAV.flatMap(g => g.items.map(i => ({ ...i, group: g.label })))

export default function QuickSearch() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return ALL.slice(0, 8)
    return ALL.filter(i => (i.label + ' ' + i.to).toLowerCase().includes(needle)).slice(0, 8)
  }, [q])

  useEffect(() => setSel(0), [q, open])

  useEffect(() => {
    const onKey = e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === '/' && !e.ctrlKey && !e.metaKey && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape' && open) {
        setOpen(false)
      } else if (open) {
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setSel(s => (s + 1) % Math.max(results.length, 1))
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setSel(s => (s - 1 + results.length) % Math.max(results.length, 1))
        } else if (e.key === 'Enter') {
          e.preventDefault()
          const item = results[sel >= 0 ? sel : 0]
          if (item) {
            navigate(item.to)
            setOpen(false)
          }
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, results, sel, navigate])

  useEffect(() => {
    const input = document.getElementById('global-search')
    if (!input) return
    const onFocus = () => setOpen(true)
    input.addEventListener('focus', onFocus)
    return () => input.removeEventListener('focus', onFocus)
  }, [])

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => document.querySelector('.qs-input')?.focus(), 30)
      return () => clearTimeout(t)
    }
  }, [open])

  return (
    <div className={open ? 'quick-search open' : 'quick-search'} id="quick-search" onMouseDown={e => {
      if (e.target.id === 'quick-search') setOpen(false)
    }}>
      <div className="qs-box">
        <div className="qs-head">
          <i className="hgi-stroke hgi-search-01"></i>
          <input
            className="qs-input"
            type="text"
            placeholder="Type to search pages…"
            autoComplete="off"
            value={q}
            onChange={e => setQ(e.target.value)}
          />
          <button
            type="button"
            className="qs-close"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            <i className="hgi-stroke hgi-cancel-01"></i>
          </button>
        </div>
        <div className="qs-body">
          {results.length === 0 ? (
            <div className="qs-empty">
              <i className="hgi-stroke hgi-search-minus"></i> No matching pages
            </div>
          ) : (
            results.map((item, i) => (
              <a
                key={item.to}
                className={'qs-item' + (i === sel ? ' sel' : '')}
                href="#!"
                onClick={e => {
                  e.preventDefault()
                  navigate(item.to)
                  setOpen(false)
                }}
                onMouseEnter={() => setSel(i)}
              >
                <span className="qs-label">{item.label}</span>
                <span className="qs-hint">{item.group}</span>
              </a>
            ))
          )}
        </div>
        <div className="qs-foot">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  )
}
