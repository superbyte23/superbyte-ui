/* ── E-COMMERCE CHARTS ──────────────────────────────────────────────────── */
function initCharts() {
  const v = themeVars();
  Chart.defaults.color = v.text3;
  Chart.defaults.font.family = "'Ubuntu Mono', monospace";
  Chart.defaults.font.size = 11;

  if (window._ecRevenue) window._ecRevenue.destroy();
  if (window._ecStatus) window._ecStatus.destroy();
  if (window._ecCats) window._ecCats.destroy();

  window._ecRevenue = new Chart(document.getElementById('ecRevenueChart'), {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        { label: 'This week', data: [31, 38, 35, 44, 41, 52, 42.8], borderColor: v.accent, backgroundColor: `rgba(${v.rgb},.12)`, fill: true, tension: .35, pointRadius: 0, borderWidth: 2 },
        { label: 'Last week', data: [28, 34, 33, 40, 39, 47, 39], borderColor: v.border2, borderDash: [4, 4], fill: false, tension: .35, pointRadius: 0, borderWidth: 2 }
      ]
    },
    options: { plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: v.grid } } }, maintainAspectRatio: false }
  });

  window._ecStatus = new Chart(document.getElementById('ecStatusChart'), {
    type: 'doughnut',
    data: {
      labels: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
      datasets: [{ data: [214, 388, 542, 60], backgroundColor: [v.accent, v.accentHi, v.green, v.danger], borderColor: v.border, borderWidth: 3 }]
    },
    options: { plugins: { legend: { display: false } }, cutout: '70%', maintainAspectRatio: false }
  });

  window._ecCats = new Chart(document.getElementById('ecCatsChart'), {
    type: 'bar',
    data: {
      labels: ['Electronics', 'Apparel', 'Home', 'Beauty', 'Grocery'],
      datasets: [{
        label: 'Revenue $K', data: [52, 38, 27, 19, 12],
        backgroundColor: [v.accent, v.accentHi, '#38bdf8', v.green, v.yellow],
        borderRadius: 4, barThickness: 18
      }]
    },
    options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { grid: { color: v.grid } }, y: { grid: { display: false } } }, maintainAspectRatio: false }
  });
}

window.__chartInit = initCharts;
