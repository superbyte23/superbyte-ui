      <section class="page-section active" id="page-calendar">
        <div class="page-head">
          <div><h1>Calendar</h1><p id="cal-sub">team schedule · this week</p></div>
          <div class="d-flex gap-2">
            <button class="btn btn-ghost btn-sm" onclick="calGo(0)"><i class="hgi-stroke hgi-target-01 me-1"></i> Today</button>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#addEventModal"><i class="hgi-stroke hgi-add-01 me-1"></i> Add event</button>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-lg-3">
            <div class="card mb-3">
              <div class="card-header"><div class="card-title"><i class="hgi-stroke hgi-clock-01"></i> Upcoming</div><span class="card-sub">next 5</span></div>
              <div class="card-body p-0" id="cal-upcoming"></div>
            </div>
            <div class="card">
              <div class="card-header"><div class="card-title"><i class="hgi-stroke hgi-paint-board"></i> Colors</div></div>
              <div class="card-body d-flex flex-column gap-2" style="font-size:12.5px;color:var(--text2)">
                <span><span class="cal-dot" style="background:#6366f1"></span>Meetings</span>
                <span><span class="cal-dot" style="background:#38bdf8"></span>Reviews</span>
                <span><span class="cal-dot" style="background:#22c55e"></span>Releases</span>
                <span><span class="cal-dot" style="background:#f59e0b"></span>Deadlines</span>
                <span><span class="cal-dot" style="background:#ec4899"></span>Personal</span>
              </div>
            </div>
          </div>

          <div class="col-lg-9">
            <div class="card">
              <div class="card-header">
                <div class="d-flex align-items-center gap-2">
                  <button class="icon-btn" style="width:30px;height:30px" onclick="calShift(-1)" title="Previous month"><i class="hgi-stroke hgi-arrow-left-01" style="font-size:10px"></i></button>
                  <button class="icon-btn" style="width:30px;height:30px" onclick="calShift(1)" title="Next month"><i class="hgi-stroke hgi-arrow-right-01" style="font-size:10px"></i></button>
                  <div class="card-title ms-1" id="cal-title" style="margin:0"></div>
                </div>
                <div class="d-flex gap-1">
                  <span class="tag tag-indigo" data-tab="Month">Month</span>
                  <span class="tag tag-slate" data-tab="Week">Week</span>
                  <span class="tag tag-slate" data-tab="Agenda">Agenda</span>
                </div>
              </div>
              <div class="card-body p-0">
                <div class="cal-head"><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div></div>
                <div class="cal-grid" id="cal-grid"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Add event modal -->
      <div class="modal fade" id="addEventModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title"><span class="modal-icon"><i class="hgi-stroke hgi-calendar-add-01"></i></span> Add event</div>
              <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3"><label class="form-label">Title</label><input class="form-control" id="ev-title" placeholder="Retro — Q3 planning"></div>
              <div class="mb-3"><label class="form-label">Date</label><input class="form-control font-mono" id="ev-date" type="date"></div>
              <div class="mb-1"><label class="form-label">Color</label>
                <div class="d-flex gap-2" id="ev-colors">
                  <span class="cal-dot-lg active" style="background:#6366f1" data-c="#6366f1"></span><span class="cal-dot-lg" style="background:#38bdf8" data-c="#38bdf8"></span><span class="cal-dot-lg" style="background:#22c55e" data-c="#22c55e"></span><span class="cal-dot-lg" style="background:#f59e0b" data-c="#f59e0b"></span><span class="cal-dot-lg" style="background:#ec4899" data-c="#ec4899"></span>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-ghost" data-bs-dismiss="modal">Cancel</button>
              <button class="btn btn-primary" data-bs-dismiss="modal" onclick="calAdd()">Add event</button>
            </div>
          </div>
        </div>
      </div>
