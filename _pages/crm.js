/* ── CRM CHARTS ──────────────────────────────────────────────────────────── */
function initCharts() {
  const v = themeVars();
  Chart.defaults.color = v.text3;
  Chart.defaults.font.family = "'Ubuntu Mono', monospace";
  Chart.defaults.font.size = 11;

  if (window._crmWinChart) window._crmWinChart.destroy();
  window._crmWinChart = new Chart(document.getElementById('crmWinChart'), {
    type: 'doughnut',
    data: {
      labels: ['Won', 'In progress', 'Lost'],
      datasets: [{ data: [42, 32, 18], backgroundColor: [v.green, v.yellow, v.danger], borderColor: v.border, borderWidth: 3 }]
    },
    options: { plugins: { legend: { display: false } }, cutout: '72%', maintainAspectRatio: false }
  });
}

function crmFilter(q) {
  q = q.trim().toLowerCase();
  document.querySelectorAll('#crm-rows tr').forEach(tr => {
    tr.style.display = (tr.textContent.toLowerCase().indexOf(q) !== -1 || !q) ? '' : 'none';
  });
}

window.__chartInit = initCharts;
