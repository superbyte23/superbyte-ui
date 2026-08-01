      <section class="page-section active" id="page-kanban">
        <div class="page-head">
          <div><h1>Kanban</h1><p id="kbd-sub">sprint 24 · board · 14 tasks</p></div>
          <div class="d-flex gap-2">
            <div class="search-wrap">
              <i class="hgi-stroke hgi-search-01 search-icon"></i>
              <input class="search-input" id="kbd-search" placeholder="Filter cards…" autocomplete="off" oninput="kbdFilter(this.value)">
            </div>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#kbdAddModal"><i class="hgi-stroke hgi-add-01 me-1"></i> Add card</button>
          </div>
        </div>

        <div class="kbd-board" id="kbd-board">
          <div class="kbd-col" data-col="backlog">
            <div class="kbd-col-head"><div class="kbd-title"><span class="cal-dot" style="background:#64748b"></span>Backlog</div><span class="kbd-count">3</span></div>
            <div class="kbd-lane">
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-slate">research</span></div>
                <div class="kbd-card-title">Interview 4 power users about export flows</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#6366f1,#a78bfa)">RT</div></div><span style="display:flex;align-items:center;gap:4px"><i class="hgi-stroke hgi-comment-01"></i> 3</span></div>
              </div>
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-sky">docs</span></div>
                <div class="kbd-card-title">Draft API reference for v2.5 endpoints</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#0ea5e9,#38bdf8)">MS</div></div><span style="display:flex;align-items:center;gap:4px"><i class="hgi-stroke hgi-comment-01"></i> 1</span></div>
              </div>
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-pink">design</span></div>
                <div class="kbd-card-title">Empty states for the reports module</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#ec4899,#f472b6)">JD</div></div><span class="kbd-due">Aug 08</span></div>
              </div>
            </div>
          </div>

          <div class="kbd-col" data-col="progress">
            <div class="kbd-col-head"><div class="kbd-title"><span class="cal-dot" style="background:#f59e0b"></span>In progress</div><span class="kbd-count">4</span></div>
            <div class="kbd-lane">
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-indigo">frontend</span></div>
                <div class="kbd-card-title">RTL polish pass on tables and modals</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#6366f1,#a78bfa)">RT</div><div class="avatar-circle" style="background:linear-gradient(135deg,#22c55e,#4ade80)">MS</div></div><span class="kbd-due">today</span></div>
              </div>
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-amber">backend</span></div>
                <div class="kbd-card-title">Rate limiting middleware for webhooks</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#f59e0b,#fbbf24)">JC</div></div><span style="display:flex;align-items:center;gap:4px"><i class="hgi-stroke hgi-comment-01"></i> 2</span></div>
              </div>
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-green">platform</span></div>
                <div class="kbd-card-title">Vendor Leaflet + ECharts bundles locally</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#22c55e,#4ade80)">MS</div></div><span style="display:flex;align-items:center;gap:4px"><i class="hgi-stroke hgi-comment-01"></i> 5</span></div>
              </div>
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-sky">docs</span></div>
                <div class="kbd-card-title">Changelog + upgrade notes for 2.5</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#0ea5e9,#38bdf8)">MS</div></div><span class="kbd-due">Aug 03</span></div>
              </div>
            </div>
          </div>

          <div class="kbd-col" data-col="review">
            <div class="kbd-col-head"><div class="kbd-title"><span class="cal-dot" style="background:#38bdf8"></span>In review</div><span class="kbd-count">3</span></div>
            <div class="kbd-lane">
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-pink">design</span><span class="tag tag-slate">PR #412</span></div>
                <div class="kbd-card-title">Compact mode density audit</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#ec4899,#f472b6)">JD</div></div><span class="kbd-due">review</span></div>
              </div>
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-indigo">frontend</span><span class="tag tag-slate">PR #410</span></div>
                <div class="kbd-card-title">Tooltip + popover theme overrides</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#6366f1,#a78bfa)">RT</div></div><span class="kbd-due">review</span></div>
              </div>
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-green">platform</span><span class="tag tag-slate">PR #408</span></div>
                <div class="kbd-card-title">Auth pages regression sweep</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#22c55e,#4ade80)">MS</div></div><span style="display:flex;align-items:center;gap:4px"><i class="hgi-stroke hgi-comment-01"></i> 4</span></div>
              </div>
            </div>
          </div>

          <div class="kbd-col" data-col="done">
            <div class="kbd-col-head"><div class="kbd-title"><span class="cal-dot" style="background:#22c55e"></span>Done</div><span class="kbd-count">4</span></div>
            <div class="kbd-lane">
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-green">platform</span></div>
                <div class="kbd-card-title">Vendor Bootstrap 5.3.3 + icons</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#22c55e,#4ade80)">MS</div></div><span class="tag tag-green" style="font-size:10px">shipped</span></div>
              </div>
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-amber">backend</span></div>
                <div class="kbd-card-title">Health check endpoint + uptime probe</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#f59e0b,#fbbf24)">JC</div></div><span class="tag tag-green" style="font-size:10px">shipped</span></div>
              </div>
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-sky">docs</span></div>
                <div class="kbd-card-title">Contributing guide rewrite</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#0ea5e9,#38bdf8)">MS</div></div><span class="tag tag-green" style="font-size:10px">shipped</span></div>
              </div>
              <div class="kbd-card" draggable="true">
                <div class="kbd-card-top"><span class="tag tag-indigo">frontend</span></div>
                <div class="kbd-card-title">Shell generator + verify harness</div>
                <div class="kbd-card-foot"><div class="avatar-stack"><div class="avatar-circle" style="background:linear-gradient(135deg,#6366f1,#a78bfa)">RT</div></div><span class="tag tag-green" style="font-size:10px">shipped</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="empty-state d-none" id="kbd-empty"><i class="hgi-stroke hgi-search-02"></i><p>No cards match that filter</p></div>
      </section>

      <!-- Add card modal -->
      <div class="modal fade" id="kbdAddModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title"><span class="modal-icon"><i class="hgi-stroke hgi-add-square"></i></span> Add card</div>
              <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3"><label class="form-label">Title</label><input class="form-control" id="kbd-title" placeholder="New task…"></div>
              <div class="row g-3">
                <div class="col-6"><label class="form-label">Column</label><select class="form-select" id="kbd-col-sel"><option value="backlog">Backlog</option><option value="progress">In progress</option><option value="review">In review</option><option value="done">Done</option></select></div>
                <div class="col-6"><label class="form-label">Tag</label><select class="form-select" id="kbd-tag-sel"><option>frontend</option><option>backend</option><option>design</option><option>docs</option><option>research</option><option>platform</option></select></div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-ghost" data-bs-dismiss="modal">Cancel</button>
              <button class="btn btn-primary" data-bs-dismiss="modal" onclick="kbdAdd()">Add card</button>
            </div>
          </div>
        </div>
      </div>
