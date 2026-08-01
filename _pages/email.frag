      <section class="page-section active" id="page-email">
        <div class="page-head">
          <div><h1>Email</h1><p id="mail-sub">inbox · 3 unread</p></div>
          <div class="d-flex gap-2">
            <div class="search-wrap">
              <i class="hgi-stroke hgi-search-01 search-icon"></i>
              <input class="search-input" id="mail-search" placeholder="Search mail…" autocomplete="off" oninput="mailSearch(this.value)">
            </div>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#composeModal"><i class="hgi-stroke hgi-pen-01 me-1"></i> Compose</button>
          </div>
        </div>

        <div class="card mail-card">
          <div class="mail-layout">
            <div class="mail-folders">
              <a class="mail-folder active" data-folder="inbox" onclick="mailFolder('inbox')"><i class="hgi-stroke hgi-inbox"></i> Inbox <span class="ms-auto">6</span></a>
              <a class="mail-folder" data-folder="starred" onclick="mailFolder('starred')"><i class="hgi-stroke hgi-star"></i> Starred <span class="ms-auto">2</span></a>
              <a class="mail-folder" data-folder="sent" onclick="mailFolder('sent')"><i class="hgi-stroke hgi-navigation"></i> Sent <span class="ms-auto">4</span></a>
              <a class="mail-folder" data-folder="drafts" onclick="mailFolder('drafts')"><i class="hgi-stroke hgi-file-pen"></i> Drafts <span class="ms-auto">2</span></a>
              <div class="mail-folder-sep"></div>
              <a class="mail-folder" data-folder="archive" onclick="mailFolder('archive')"><i class="hgi-stroke hgi-archive-01"></i> Archive</a>
              <a class="mail-folder" data-folder="trash" onclick="mailFolder('trash')"><i class="hgi-stroke hgi-delete-01"></i> Trash</a>
              <div class="mail-folder-sep"></div>
              <div class="mail-labels">
                <span class="cal-dot" style="background:#6366f1"></span>Work<br>
                <span class="cal-dot" style="background:#22c55e"></span>Personal<br>
                <span class="cal-dot" style="background:#f59e0b"></span>Finance
              </div>
            </div>

            <div class="mail-list" id="mail-list"></div>
            <div class="mail-pane" id="mail-pane">
              <div class="empty-state" style="height:100%;justify-content:center"><i class="hgi-stroke hgi-mail-open-01"></i><p>Select a message to read it here</p></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Compose modal -->
      <div class="modal fade" id="composeModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title"><span class="modal-icon"><i class="hgi-stroke hgi-pen-01"></i></span> New message</div>
              <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3"><input class="form-control" id="mail-to" placeholder="To: someone@example.com"></div>
              <div class="mb-3"><input class="form-control" id="mail-subject" placeholder="Subject"></div>
              <textarea class="form-control font-mono" id="mail-body" rows="6" placeholder="Write your message…"></textarea>
            </div>
            <div class="modal-footer">
              <button class="btn btn-ghost" data-bs-dismiss="modal">Save draft</button>
              <button class="btn btn-primary" data-bs-dismiss="modal" onclick="mailSend()"><i class="hgi-stroke hgi-navigation me-1"></i> Send</button>
            </div>
          </div>
        </div>
      </div>
