      <section class="page-section active" id="page-crm">
        <div class="page-head">
          <div><h1>CRM</h1><p>pipeline · leads · 342 active accounts</p></div>
          <div class="d-flex gap-2">
            <button class="btn btn-ghost btn-sm" onclick="showToast('success','Filters reset')"><i class="hgi-stroke hgi-filter-horizontal me-1"></i> Filter</button>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#newDealModal"><i class="hgi-stroke hgi-add-01 me-1"></i> New deal</button>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-6 col-xl-3">
            <div class="card stat-card">
              <div class="top"><div class="stat-icon" style="background:var(--accent-bg);color:var(--accent-h)"><i class="hgi-stroke hgi-money-01"></i></div><span class="stat-delta up"><i class="hgi-stroke hgi-arrow-up-01"></i> 8.2%</span></div>
              <div class="value">$184K</div>
              <div class="label">Pipeline value</div>
            </div>
          </div>
          <div class="col-6 col-xl-3">
            <div class="card stat-card">
              <div class="top"><div class="stat-icon" style="background:var(--green-bg);color:var(--green)"><i class="hgi-stroke hgi-hand-helping"></i></div><span class="stat-delta up"><i class="hgi-stroke hgi-arrow-up-01"></i> 6</span></div>
              <div class="value">36</div>
              <div class="label">Open deals</div>
            </div>
          </div>
          <div class="col-6 col-xl-3">
            <div class="card stat-card">
              <div class="top"><div class="stat-icon" style="background:var(--yellow-bg);color:var(--yellow)"><i class="hgi-stroke hgi-target-02"></i></div><span class="stat-delta up"><i class="hgi-stroke hgi-arrow-up-01"></i> 2.4%</span></div>
              <div class="value">42%</div>
              <div class="label">Win rate</div>
            </div>
          </div>
          <div class="col-6 col-xl-3">
            <div class="card stat-card">
              <div class="top"><div class="stat-icon" style="background:var(--danger-bg);color:var(--danger)"><i class="hgi-stroke hgi-target-03"></i></div><span class="stat-delta down"><i class="hgi-stroke hgi-arrow-down-01"></i> 0.9%</span></div>
              <div class="value">$5.1K</div>
              <div class="label">Avg deal size</div>
            </div>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-lg-8">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-dollar-circle"></i> Deal pipeline</div>
                <span class="card-sub">Q3 · 36 open deals</span>
              </div>
              <div class="card-body d-flex flex-column gap-2">
                <div class="funnel-bar" style="width:100%;background:linear-gradient(90deg,var(--accent),var(--accent-h))"><span>Qualified · $62K · 21 deals</span></div>
                <div class="funnel-bar" style="width:78%;background:linear-gradient(90deg,var(--accent-h),#a78bfa)"><span>Opportunity · $48K · 9 deals</span></div>
                <div class="funnel-bar" style="width:56%;background:linear-gradient(90deg,#38bdf8,#818cf8)"><span>Proposal · $34K · 4 deals</span></div>
                <div class="funnel-bar" style="width:38%;background:linear-gradient(90deg,#f59e0b,#fbbf24)"><span>Negotiation · $23K · 2 deals</span></div>
                <div class="funnel-bar" style="width:24%;background:linear-gradient(90deg,#22c55e,#4ade80)"><span>Closing · $17K · 1 deal</span></div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card h-100">
              <div class="card-header"><div class="card-title"><i class="hgi-stroke hgi-pie-chart-01"></i> Win rate</div></div>
              <div class="card-body d-flex flex-column align-items-center">
                <div class="w-100" style="height:180px"><canvas id="crmWinChart"></canvas></div>
                <div class="w-100 mt-3">
                  <div class="d-flex justify-content-between mb-2" style="font-size:12px"><span><span class="legend-dot" style="background:var(--green)"></span>Won</span><span class="font-mono" style="color:var(--text2)">42%</span></div>
                  <div class="d-flex justify-content-between mb-2" style="font-size:12px"><span><span class="legend-dot" style="background:var(--yellow)"></span>In progress</span><span class="font-mono" style="color:var(--text2)">32%</span></div>
                  <div class="d-flex justify-content-between" style="font-size:12px"><span><span class="legend-dot" style="background:var(--danger)"></span>Lost</span><span class="font-mono" style="color:var(--text2)">18%</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-lg-7">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-user-multiple-02"></i> Active leads</div>
                <span class="card-sub">8 shown · 342 total</span>
              </div>
              <div class="table-toolbar" style="border-bottom:none;padding-bottom:0">
                <div class="input-group input-group-sm" style="max-width:260px">
                  <span class="input-group-text"><i class="hgi-stroke hgi-search-02" style="font-size:11px"></i></span>
                  <input class="form-control" id="crm-search" placeholder="Search leads…" oninput="crmFilter(this.value)">
                </div>
                <div class="d-flex gap-2">
                  <button class="btn btn-ghost btn-sm" onclick="showToast('success','Leads exported')"><i class="hgi-stroke hgi-download-01 me-1"></i> Export</button>
                </div>
              </div>
              <table class="data-table" id="crm-table">
                <thead><tr><th>Lead</th><th>Stage</th><th>Value</th><th>Owner</th><th></th></tr></thead>
                <tbody id="crm-rows">
                  <tr data-lead="nova"><td class="name-cell"><div style="display:flex;align-items:center;gap:10px"><div class="avatar-circle" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#a78bfa);font-size:10px">AC</div><div><div>Acme Cloud</div><div style="font-size:11px;color:var(--text3)">nova@acme.io</div></div></div></td><td><span class="tag tag-indigo">Opportunity</span></td><td class="mono-cell">$18,400</td><td style="font-size:12px">R. Torres</td><td><div class="row-actions"><button class="row-btn" onclick="showToast('success','Deal updated')"><i class="hgi-stroke hgi-pen-01"></i></button><button class="row-btn del" onclick="showToast('error','Lead archived')"><i class="hgi-stroke hgi-delete-01"></i></button></div></td></tr>
                  <tr data-lead="northwind"><td class="name-cell"><div style="display:flex;align-items:center;gap:10px"><div class="avatar-circle" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#4ade80);font-size:10px">NW</div><div><div>Northwind Labs</div><div style="font-size:11px;color:var(--text3)">ops@northwind.dev</div></div></div></td><td><span class="tag tag-sky">Proposal</span></td><td class="mono-cell">$12,750</td><td style="font-size:12px">M. Santos</td><td><div class="row-actions"><button class="row-btn" onclick="showToast('success','Deal updated')"><i class="hgi-stroke hgi-pen-01"></i></button><button class="row-btn del" onclick="showToast('error','Lead archived')"><i class="hgi-stroke hgi-delete-01"></i></button></div></td></tr>
                  <tr data-lead="beam"><td class="name-cell"><div style="display:flex;align-items:center;gap:10px"><div class="avatar-circle" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#fbbf24);font-size:10px">BS</div><div><div>Beam Systems</div><div style="font-size:11px;color:var(--text3)">hello@beam.systems</div></div></div></td><td><span class="tag tag-amber">Negotiation</span></td><td class="mono-cell">$9,200</td><td style="font-size:12px">J. Canete</td><td><div class="row-actions"><button class="row-btn" onclick="showToast('success','Deal updated')"><i class="hgi-stroke hgi-pen-01"></i></button><button class="row-btn del" onclick="showToast('error','Lead archived')"><i class="hgi-stroke hgi-delete-01"></i></button></div></td></tr>
                  <tr data-lead="cobalt"><td class="name-cell"><div style="display:flex;align-items:center;gap:10px"><div class="avatar-circle" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#ec4899,#f472b6);font-size:10px">CV</div><div><div>Cobalt Ventures</div><div style="font-size:11px;color:var(--text3)">info@cobalt.vc</div></div></div></td><td><span class="tag tag-green">Closing</span></td><td class="mono-cell">$7,600</td><td style="font-size:12px">M. Santos</td><td><div class="row-actions"><button class="row-btn" onclick="showToast('success','Deal updated')"><i class="hgi-stroke hgi-pen-01"></i></button><button class="row-btn del" onclick="showToast('error','Lead archived')"><i class="hgi-stroke hgi-delete-01"></i></button></div></td></tr>
                  <tr data-lead="orbital"><td class="name-cell"><div style="display:flex;align-items:center;gap:10px"><div class="avatar-circle" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#0ea5e9,#38bdf8);font-size:10px">OL</div><div><div>Orbital Logistics</div><div style="font-size:11px;color:var(--text3)">dispatch@orbital.com</div></div></div></td><td><span class="tag tag-indigo">Qualified</span></td><td class="mono-cell">$5,300</td><td style="font-size:12px">R. Torres</td><td><div class="row-actions"><button class="row-btn" onclick="showToast('success','Deal updated')"><i class="hgi-stroke hgi-pen-01"></i></button><button class="row-btn del" onclick="showToast('error','Lead archived')"><i class="hgi-stroke hgi-delete-01"></i></button></div></td></tr>
                  <tr data-lead="quanta"><td class="name-cell"><div style="display:flex;align-items:center;gap:10px"><div class="avatar-circle" style="width:26px;height:26px;border-radius:50%;background:linear-gradient(135deg,#84cc16,#a3e635);font-size:10px">QP</div><div><div>Quanta Partners</div><div style="font-size:11px;color:var(--text3)">team@quanta.io</div></div></div></td><td><span class="tag tag-slate">Qualified</span></td><td class="mono-cell">$4,100</td><td style="font-size:12px">J. Canete</td><td><div class="row-actions"><button class="row-btn" onclick="showToast('success','Deal updated')"><i class="hgi-stroke hgi-pen-01"></i></button><button class="row-btn del" onclick="showToast('error','Lead archived')"><i class="hgi-stroke hgi-delete-01"></i></button></div></td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-check-list"></i> Upcoming tasks</div>
                <span class="card-sub">today · 4 due</span>
              </div>
              <div class="card-body">
                <div class="timeline">
                  <div class="timeline-item"><div class="t-time">09:30 · call</div><div class="t-title">Intro call — Acme Cloud</div><div class="t-desc">R. Torres · demo deck v3</div></div>
                  <div class="timeline-item green"><div class="t-time">11:00 · proposal</div><div class="t-title">Send revised SOW to Northwind</div><div class="t-desc">M. Santos · scope +$2.1K</div></div>
                  <div class="timeline-item warn"><div class="t-time">13:15 · follow-up</div><div class="t-title">Nudge Beam Systems on terms</div><div class="t-desc">J. Canete · net-30 offer</div></div>
                  <div class="timeline-item danger"><div class="t-time">15:00 · review</div><div class="t-title">Pipeline review — stage moves</div><div class="t-desc">weekly · sales team</div></div>
                  <div class="timeline-item"><div class="t-time">17:30 · email</div><div class="t-title">Wrap-up: close Cobalt pricing</div><div class="t-desc">M. Santos · 15-min call</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- New deal modal -->
      <div class="modal fade" id="newDealModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <div class="modal-title"><span class="modal-icon"><i class="hgi-stroke hgi-hand-helping"></i></span> New deal</div>
              <button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3"><label class="form-label">Company</label><input class="form-control" placeholder="Acme Inc."></div>
              <div class="row g-3">
                <div class="col-6"><label class="form-label">Value</label><input class="form-control font-mono" placeholder="12,000"></div>
                <div class="col-6"><label class="form-label">Stage</label><select class="form-select"><option>Qualified</option><option>Opportunity</option><option>Proposal</option><option>Negotiation</option><option>Closing</option></select></div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-ghost" data-bs-dismiss="modal">Cancel</button>
              <button class="btn btn-primary" data-bs-dismiss="modal" onclick="showToast('success','Deal created')">Create deal</button>
            </div>
          </div>
        </div>
      </div>
