import { useEffect, useRef } from 'react'
import { useApp } from '../theme/AppContext'

export default function ChartCanvas({ height = 230, build }) {
  const ref = useRef(null)
  const chart = useRef(null)
  const { theme, accent, radius, fontSize } = useApp()

  useEffect(() => {
    if (!ref.current) return
    if (chart.current) chart.current.destroy()
    chart.current = new window.Chart(ref.current, build())
    return () => {
      if (chart.current) {
        chart.current.destroy()
        chart.current = null
      }
    }
  }, [theme, accent, radius, fontSize])

  return (
    <div style={{ height }}>
      <canvas ref={ref}></canvas>
    </div>
  )
}
