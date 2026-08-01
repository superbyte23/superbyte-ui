/* ── ECHARTS GALLERY ────────────────────────────────────────────────────── */
/* Same contract as Chart.js pages: `__chartInit` re-inits on every theme,
   accent or radius change. ECharts instances are disposed, never leaked. */
window._echs = {};

function echInit(id, makeOption) {
  const el = document.getElementById(id);
  if (window._echs[id]) { window._echs[id].dispose(); delete window._echs[id]; }
  if (!el) return;
  const chart = echarts.init(el, null, { renderer: 'canvas' });
  window._echs[id] = chart;
  chart.setOption(makeOption(themeVars()));
}

function echartShot() {
  const id = document.querySelector('[data-shoot]') ? document.querySelector('[data-shoot]').value : 'ech-heat';
  const chart = window._echs[id];
  if (!chart) return showToast('error', 'Chart not ready');
  const a = document.createElement('a');
  a.href = chart.getDataURL({ type: 'png', pixelRatio: 2, backgroundColor: getComputedStyle(document.body).getPropertyValue('--surface').trim() });
  a.download = id + '.png';
  a.click();
  showToast('success', 'PNG exported');
}

function initCharts() {
  const v = themeVars();
  const text = { color: v.text3, fontFamily: "'Ubuntu Mono', monospace" };
  const axis = {
    axisLine: { lineStyle: { color: v.border2 } },
    axisTick: { lineStyle: { color: v.border2 } },
    axisLabel: { color: v.text3 },
    splitLine: { lineStyle: { color: v.grid } }
  };
  const tip = {
    backgroundColor: v.border2, borderColor: v.border, borderWidth: 1,
    textStyle: { color: v.text, fontFamily: "'Ubuntu Mono', monospace" }
  };

  /* Heatmap */
  echInit('ech-heat', () => {
    const data = [];
    for (let d = 0; d < 7; d++) for (let h = 0; h < 24; h++)
      data.push([h, d, Math.round(Math.abs(Math.sin(d * 1.7 + h / 3)) * 12)]);
    return {
      tooltip: Object.assign({ position: 'top' }, tip),
      grid: { left: 44, right: 14, top: 8, bottom: 44 },
      xAxis: Object.assign({ type: 'category', data: Array.from({ length: 24 }, (_, h) => h + ':00'), splitArea: { show: true, areaStyle: { color: ['rgba(0,0,0,0)', v.surface2] } } }, axis),
      yAxis: Object.assign({ type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], splitArea: { show: true, areaStyle: { color: ['rgba(0,0,0,0)', v.surface2] } } }, axis),
      visualMap: {
        min: 0, max: 12, calculable: true, orient: 'horizontal', left: 'center', bottom: 0,
        textStyle: { color: v.text3 }, inRange: { color: [v.surface3, v.accentH, v.accent] }
      },
      series: [{ type: 'heatmap', data, label: { show: false }, emphasis: { itemStyle: { shadowBlur: 12, shadowColor: 'rgba(0,0,0,.5)' } } }]
    };
  });

  /* Candlestick + volume */
  echInit('ech-candle', () => {
    const dates = [], cdl = [], vol = [];
    let base = 96;
    for (let i = 0; i < 60; i++) {
      const dt = new Date(2026, 4, 1 + i);
      dates.push((dt.getMonth() + 1) + '/' + dt.getDate());
      const o = base + Math.sin(i / 6) * 8 + Math.cos(i / 11) * 3;
      const c = base + Math.sin((i + 1) / 6) * 8 + Math.cos((i + 1) / 11) * 3;
      const h = Math.max(o, c) + Math.abs(Math.cos(i / 5)) * 2.5 + 0.3;
      const l = Math.min(o, c) - Math.abs(Math.sin(i / 7)) * 2.5 - 0.3;
      cdl.push([+o.toFixed(2), +c.toFixed(2), +l.toFixed(2), +h.toFixed(2)]);
      vol.push([i, Math.round(1600 + 900 * Math.abs(Math.cos(i / 4)) + (c >= o ? 420 : 0)), c >= o ? 1 : -1]);
      base += (Math.random() - 0.5) * 2.2;
    }
    return {
      tooltip: Object.assign({ trigger: 'axis', axisPointer: { type: 'cross' } }, tip),
      legend: { data: ['GRDL', 'Volume'], textStyle: { color: v.text3 }, top: 0, right: 0 },
      axisPointer: { link: [{ xAxisIndex: 'all' }], label: { backgroundColor: v.border2, color: v.text } },
      grid: [{ left: 48, right: 16, top: 26, height: '58%' }, { left: 48, right: 16, top: '74%', height: '16%' }],
      xAxis: [
        Object.assign({ type: 'category', data: dates, boundaryGap: false, axisLine: { lineStyle: { color: v.border2 } }, axisLabel: { color: v.text3, showMinLabel: false, showMaxLabel: false }, min: 'dataMin', max: 'dataMax' }),
        Object.assign({ type: 'category', gridIndex: 1, data: dates, boundaryGap: false, axisLabel: { show: false }, axisTick: { show: false }, splitLine: { show: false } })
      ],
      yAxis: [
        Object.assign({ scale: true, axisLabel: { color: v.text3 } }, axis),
        Object.assign({ gridIndex: 1, axisLabel: { show: false }, splitLine: { show: false }, axisLine: { show: false }, axisTick: { show: false } })
      ],
      dataZoom: [
        { type: 'inside', xAxisIndex: [0, 1], start: 55, end: 100 },
        { type: 'slider', xAxisIndex: [0, 1], top: '93%', height: 14, borderColor: v.border2, backgroundColor: v.surface, fillerColor: 'rgba(99,102,241,.15)', handleStyle: { color: v.accent }, textStyle: { color: v.text3 } }
      ],
      series: [
        {
          type: 'candlestick', data: cdl,
          itemStyle: { color: v.green, color0: v.danger, borderColor: v.green, borderColor0: v.danger },
          emphasis: { itemStyle: { shadowBlur: 8, shadowColor: 'rgba(0,0,0,.4)' } }
        },
        {
          type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: vol.map(x => ({ value: x[1], itemStyle: { color: x[2] === 1 ? v.green : v.danger, opacity: .55 } })),
          barWidth: '62%'
        }
      ]
    };
  });

  /* Treemap */
  echInit('ech-tree', () => {
    const leaf = (n, v) => ({ name: n, value: v });
    return {
      tooltip: Object.assign({ formatter: p => p.name + ': $' + (p.value || p.value === 0 ? p.value.toLocaleString() : '') }, tip),
      series: [{
        type: 'treemap', roam: false, nodeClick: 'zoomToNode', breadcrumb: { show: true },
        data: [
          { name: 'SaaS', children: [leaf('Core', 48200), leaf('Enterprise', 31800), leaf('Pro tiers', 21400)] },
          { name: 'Marketplace', children: [leaf('Licensing', 27600), leaf('Templates', 15100), leaf('Data packs', 9400)] },
          { name: 'Services', children: [leaf('Onboarding', 12100), leaf('Support', 7800), leaf('Training', 4600)] },
          { name: 'Hardware', children: [leaf('Gadgets', 6200), leaf('Accessories', 3100)] }
        ],
        label: { show: true, color: v.text, fontSize: 11 },
        upperLabel: { show: true, height: 22, color: v.text3 },
        itemStyle: { borderColor: v.surface, borderWidth: 2, gapWidth: 2, borderRadius: 4 },
        levels: [
          { itemStyle: { color: v.accentH, opacity: .92 } },
          { itemStyle: { color: v.accent, opacity: .8 } },
          { itemStyle: { color: v.surface3 } }
        ]
      }]
    };
  });

  /* Network graph */
  echInit('ech-graph', () => {
    const nodes = [
      { name: 'api-gw', x: 90, y: 90, symbolSize: 46, itemStyle: { color: v.accent } },
      { name: 'auth', x: 190, y: 50, symbolSize: 30, itemStyle: { color: v.accentH } },
      { name: 'billing', x: 200, y: 150, symbolSize: 30, itemStyle: { color: v.green } },
      { name: 'users', x: 120, y: 165, symbolSize: 30, itemStyle: { color: '#38bdf8' } },
      { name: 'orders', x: 60, y: 60, symbolSize: 26, itemStyle: { color: v.yellow } },
      { name: 'search', x: 250, y: 95, symbolSize: 24, itemStyle: { color: v.danger } },
      { name: 'notify', x: 40, y: 130, symbolSize: 22, itemStyle: { color: v.border2 } },
      { name: 'cdn', x: 165, y: 200, symbolSize: 22, itemStyle: { color: '#818cf8' } }
    ];
    const edges = [
      ['api-gw', 'auth'], ['api-gw', 'billing'], ['api-gw', 'users'], ['api-gw', 'orders'],
      ['api-gw', 'search'], ['api-gw', 'notify'], ['auth', 'users'], ['billing', 'orders'],
      ['orders', 'notify'], ['users', 'cdn'], ['search', 'cdn'], ['notify', 'cdn']
    ];
    return {
      tooltip: tip,
      series: [{
        type: 'graph', layout: 'force', roam: true, draggable: true,
        data: nodes,
        links: edges.map(e => ({ source: e[0], target: e[1] })),
        label: { show: true, position: 'right', color: v.text2, fontSize: 10, fontFamily: "'Ubuntu Mono', monospace" },
        lineStyle: { color: v.border2, width: 1.2, curveness: .05 },
        emphasis: { focus: 'adjacency', lineStyle: { width: 2, color: v.accentH } },
        force: { repulsion: 240, edgeLength: [60, 120], gravity: .12 },
        itemStyle: { borderColor: v.surface, borderWidth: 2 }
      }]
    };
  });
}

window.__chartInit = initCharts;
