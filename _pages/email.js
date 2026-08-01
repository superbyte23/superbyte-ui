/* ── EMAIL CLIENT ───────────────────────────────────────────────────────── */
const MAIL = [
  { id: 1, folder: 'inbox', from: 'Maria Santos', email: 'maria@acme.io', subj: 'Re: Sprint 24 review notes', snip: 'Attached the notes from today’s standup plus the open questions for the pipeline…', time: '09:41', unread: true, starred: true, attach: true,
    body: '<p>Hi John,</p><p>Attached the notes from today’s standup plus the open questions for the pipeline review. Two items need a decision before Friday:</p><ul><li>Contract renewal for Acme Cloud — approve net-30?</li><li>Hiring plan for two backend roles.</li></ul><p>— Maria</p>' },
  { id: 2, folder: 'inbox', from: 'CI Pipeline', email: 'ci@superbyte.app', subj: 'Build #a92f1c succeeded', snip: 'production · 12 min · all 214 tests passed', time: '08:12', unread: true, starred: false, attach: false,
    body: '<p>The production build completed successfully.</p><p><span class="tag tag-green">214 tests passed</span> · 0 failures · deploy window opened.</p>' },
  { id: 3, folder: 'inbox', from: 'Raj Torres', email: 'raj@quanta.io', subj: 'Security audit report', snip: 'Full report is ready for review — summary in the attached doc…', time: 'Yesterday', unread: true, starred: false, attach: true,
    body: '<p>John,</p><p>Full report is ready for review — summary in the attached doc. No critical findings, 2 high items to schedule.</p><p>— Raj</p>' },
  { id: 4, folder: 'inbox', from: 'Acme Cloud', email: 'billing@acme.io', subj: 'Invoice #INV-2091', snip: 'Invoice for August is available in your portal…', time: 'Yesterday', unread: false, starred: false, attach: true,
    body: '<p>Invoice <span class="font-mono">INV-2091</span> for August is available in your billing portal. Amount due: <strong>$1,240.00</strong>.</p>' },
  { id: 5, folder: 'inbox', from: 'Design team', email: 'design@superbyte.app', subj: 'Canvas: compact density audit', snip: 'Comments are in on the density audit — mostly LGTM with small nits…', time: 'Wed', unread: false, starred: false, attach: false,
    body: '<p>Comments are in on the density audit — mostly LGTM with small nits on toolbar height and the compact card padding.</p>' },
  { id: 6, folder: 'inbox', from: 'GitHub', email: 'noreply@github.com', subj: '[superbyte-admin] PR #410 merged', snip: 'rtorres merged 2 commits into main from feat/tooltip-theme…', time: 'Tue', unread: false, starred: true, attach: false,
    body: '<p><span class="font-mono">rtorres</span> merged 2 commits into <span class="font-mono">main</span> from <span class="font-mono">feat/tooltip-theme</span>.</p>' },
  { id: 7, folder: 'sent', from: 'John Canete', email: 'john@superbyte.app', subj: 'Q3 roadmap confirmation', snip: 'Confirming the three pillars for Q3 as discussed…', time: '09:02', unread: false, starred: false, attach: false,
    body: '<p>Confirming the three pillars for Q3 as discussed in the leadership sync.</p>' },
  { id: 8, folder: 'sent', from: 'John Canete', email: 'john@superbyte.app', subj: 'Welcome, new team members', snip: 'Great to have you both onboard — onboarding docs attached…', time: 'Mon', unread: false, starred: false, attach: true,
    body: '<p>Great to have you both onboard — onboarding docs attached below.</p>' },
  { id: 9, folder: 'drafts', from: 'John Canete', email: 'john@superbyte.app', subj: 'Draft: Vendor strategy memo', snip: '…decision on maplibre vs leaflet is deferred to the next platform sync…', time: 'Draft', unread: false, starred: false, attach: false,
    body: '<p>Decision on maplibre vs leaflet is deferred to the next platform sync.</p>' },
  { id: 10, folder: 'drafts', from: 'John Canete', email: 'john@superbyte.app', subj: 'Draft: Re: Ops budget', snip: '…rough numbers for the migration window are looking tight…', time: 'Draft', unread: false, starred: false, attach: false,
    body: '<p>Rough numbers for the migration window are looking tight.</p>' }
];

let mailState = { folder: 'inbox', active: null, query: '' };

function mailList() {
  const box = document.getElementById('mail-list');
  const q = mailState.query.toLowerCase();
  const items = MAIL.filter(m => m.folder === mailState.folder)
    .filter(m => !q || (m.from + ' ' + m.subj + ' ' + m.snip).toLowerCase().indexOf(q) !== -1);
  box.innerHTML = '';
  if (!items.length) { box.innerHTML = '<div class="empty-state"><i class="hgi-stroke hgi-inbox"></i><p>No messages</p></div>'; return; }
  items.forEach(m => {
    const row = document.createElement('div');
    row.className = 'mail-row' + (m.unread ? ' unread' : '') + (mailState.active === m.id ? ' active' : '');
    row.innerHTML =
      '<i class="hgi-stroke hgi-star mail-star' + (m.starred ? ' on' : '') + '" onclick="mailStar(event,' + m.id + ')"></i>' +
      '<div class="mail-av">' + initials(m.from) + '</div>' +
      '<div class="mail-meta"><div class="mail-from">' + esc(m.from) + '</div><div class="mail-subj">' + esc(m.subj) + '</div><div class="mail-snip">' + esc(m.snip) + '</div></div>' +
      '<div class="mail-right">' + (m.attach ? '<i class="hgi-stroke hgi-attachment-01"></i>' : '') + '<div class="mail-time">' + m.time + '</div></div>';
    row.addEventListener('click', () => mailOpen(m.id));
    box.appendChild(row);
  });
}

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function mailOpen(id) {
  const m = MAIL.find(x => x.id === id);
  if (!m) return;
  mailState.active = id;
  m.unread = false;
  const pane = document.getElementById('mail-pane');
  pane.innerHTML =
    '<div class="mail-pane-head">' +
      '<div class="mail-av lg">' + initials(m.from) + '</div>' +
      '<div class="flex-fill">' +
        '<div class="mail-from lg">' + esc(m.from) + '</div>' +
        '<div class="mail-subj">' + esc(m.subj) + '</div>' +
      '</div>' +
      '<div class="d-flex gap-2">' +
        '<button class="btn btn-ghost btn-sm" onclick="showToast(\'success\',\'Marked as spam\')"><i class="hgi-stroke hgi-blocked"></i></button>' +
        '<button class="btn btn-ghost btn-sm" onclick="mailDel(' + id + ')"><i class="hgi-stroke hgi-delete-01"></i></button>' +
      '</div>' +
    '</div>' +
    '<div class="mail-pane-body">' + m.body + '</div>' +
    '<div class="mail-pane-foot">' +
      '<input class="form-control font-mono" placeholder="Reply…">' +
      '<button class="btn btn-primary btn-sm" onclick="showToast(\'success\',\'Reply sent\')"><i class="hgi-stroke hgi-undo me-1"></i> Reply</button>' +
    '</div>';
  mailList();
  document.getElementById('mail-sub').textContent = (mailState.folder === 'inbox' ? 'inbox' : mailState.folder) + ' · ' + MAIL.filter(x => x.unread).length + ' unread';
}

function mailStar(ev, id) {
  ev.stopPropagation();
  const m = MAIL.find(x => x.id === id);
  m.starred = !m.starred;
  mailList();
}

function mailDel(id) {
  const m = MAIL.find(x => x.id === id);
  m.folder = 'trash';
  m.unread = false;
  if (mailState.active === id) mailState.active = null;
  mailFolder(mailState.folder);
  showToast('success', 'Message moved to trash');
}

window.mailFolder = function (f) {
  mailState.folder = f;
  mailState.active = null;
  document.querySelectorAll('.mail-folder').forEach(x => x.classList.toggle('active', x.dataset.folder === f));
  document.getElementById('mail-pane').innerHTML = '<div class="empty-state" style="height:100%;justify-content:center"><i class="hgi-stroke hgi-mail-open-01"></i><p>Select a message to read it here</p></div>';
  mailList();
  const sub = document.getElementById('mail-sub');
  if (sub) sub.textContent = (f === 'inbox' ? 'inbox' : f) + ' · ' + MAIL.filter(x => x.unread && x.folder === f).length + ' unread';
};

function mailSearch(q) {
  mailState.query = q;
  mailList();
}

window.mailSend = function () {
  const subj = document.getElementById('mail-subject').value.trim() || '(no subject)';
  const to = document.getElementById('mail-to').value.trim();
  if (!to) return showToast('error', 'Recipient required');
  showToast('success', 'Message sent to ' + to);
  document.getElementById('mail-to').value = '';
  document.getElementById('mail-subject').value = '';
  document.getElementById('mail-body').value = '';
};

window.__pageInit = mailList;
