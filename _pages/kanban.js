/* ── KANBAN (HTML5 DRAG & DROP) ─────────────────────────────────────────── */
let kbdDragging = null;

document.querySelectorAll('.kbd-card').forEach(card => {
  card.addEventListener('dragstart', e => {
    kbdDragging = card;
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });
  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    kbdDragging = null;
    document.querySelectorAll('.kbd-col').forEach(c => c.classList.remove('over'));
  });
});

document.querySelectorAll('.kbd-lane').forEach(lane => {
  lane.addEventListener('dragover', e => {
    e.preventDefault();
    lane.classList.add('over');
  });
  lane.addEventListener('dragleave', () => lane.classList.remove('over'));
  lane.addEventListener('drop', e => {
    e.preventDefault();
    lane.classList.remove('over');
    if (!kbdDragging) return;
    const before = lane.querySelector('.kbd-card:not(.dragging)');
    lane.insertBefore(kbdDragging, before);
    kbdDragging.classList.remove('dragging');
    kbdDragging = null;
    kbdCounts();
    showToast('success', 'Card moved');
  });
});

function kbdCounts() {
  document.querySelectorAll('.kbd-col').forEach(col => {
    const n = col.querySelectorAll('.kbd-card').length;
    col.querySelector('.kbd-count').textContent = n;
  });
  const total = document.querySelectorAll('.kbd-card').length;
  const sub = document.getElementById('kbd-sub');
  if (sub) sub.textContent = 'sprint 24 · board · ' + total + ' tasks';
}

function kbdFilter(q) {
  q = q.trim().toLowerCase();
  let visible = 0;
  document.querySelectorAll('.kbd-card').forEach(card => {
    const hit = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
    card.style.display = hit ? '' : 'none';
    if (hit) visible++;
  });
  document.querySelectorAll('.kbd-col').forEach(col => {
    const any = Array.from(col.querySelectorAll('.kbd-card')).some(c => c.style.display !== 'none');
    col.classList.toggle('d-none', !any);
  });
  const empty = document.getElementById('kbd-empty');
  if (empty) empty.classList.toggle('d-none', visible !== 0);
}

window.kbdAdd = function () {
  const t = document.getElementById('kbd-title').value.trim();
  if (!t) return showToast('error', 'Title required');
  const col = document.getElementById('kbd-col-sel').value;
  const tag = document.getElementById('kbd-tag-sel').value;
  const lane = document.querySelector('.kbd-col[data-col="' + col + '"] .kbd-lane');
  const card = document.createElement('div');
  card.className = 'kbd-card';
  card.draggable = true;
  card.innerHTML =
    '<div class="kbd-card-top"><span class="tag tag-slate">' + tag + '</span></div>' +
    '<div class="kbd-card-title">' + esc(t) + '</div>' +
    '<div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#6366f1,#a78bfa)">JC</div></div><span class="kbd-due">today</span></div>';
  card.addEventListener('dragstart', e => {
    kbdDragging = card;
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });
  card.addEventListener('dragend', () => {
    card.classList.remove('dragging');
    kbdDragging = null;
    document.querySelectorAll('.kbd-col').forEach(c => c.classList.remove('over'));
  });
  lane.appendChild(card);
  document.getElementById('kbd-title').value = '';
  kbdCounts();
  showToast('success', 'Card added to ' + document.querySelector('.kbd-col[data-col="' + col + '"] .kbd-title').textContent.trim());
};
