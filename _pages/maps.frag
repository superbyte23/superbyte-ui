      <section class="page-section active" id="page-maps">
        <div class="page-head">
          <div><h1>Maps</h1><p>leaflet 1.9.4 · vendored locally · tiles at runtime</p></div>
          <div class="d-flex gap-2">
            <button class="btn btn-ghost btn-sm" onclick="mapFit()"><i class="hgi-stroke hgi-target-03 me-1"></i> Re-center</button>
            <button class="btn btn-primary btn-sm" onclick="showToast('success','Live tracking on')"><i class="hgi-stroke hgi-target-01 me-1"></i> Track</button>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-6 col-xl-3">
            <div class="card stat-card">
              <div class="top"><div class="stat-icon" style="background:var(--accent-bg);color:var(--accent-h)"><i class="hgi-stroke hgi-store-01"></i></div><span class="stat-delta up"><i class="hgi-stroke hgi-arrow-up-01"></i> 2</span></div>
              <div class="value">12</div>
              <div class="label">Active stores</div>
            </div>
          </div>
          <div class="col-6 col-xl-3">
            <div class="card stat-card">
              <div class="top"><div class="stat-icon" style="background:var(--green-bg);color:var(--green)"><i class="hgi-stroke hgi-radar-01"></i></div><span class="stat-delta up"><i class="hgi-stroke hgi-arrow-up-01"></i> 4.1%</span></div>
              <div class="value">48 km</div>
              <div class="label">Coverage radius</div>
            </div>
          </div>
          <div class="col-6 col-xl-3">
            <div class="card stat-card">
              <div class="top"><div class="stat-icon" style="background:var(--yellow-bg);color:var(--yellow)"><i class="hgi-stroke hgi-delivery-truck-02"></i></div><span class="stat-delta up"><i class="hgi-stroke hgi-arrow-up-01"></i> 12</span></div>
              <div class="value">214</div>
              <div class="label">Routes today</div>
            </div>
          </div>
          <div class="col-6 col-xl-3">
            <div class="card stat-card">
              <div class="top"><div class="stat-icon" style="background:var(--danger-bg);color:var(--danger)"><i class="hgi-stroke hgi-clock-01"></i></div><span class="stat-delta down"><i class="hgi-stroke hgi-arrow-down-01"></i> 0.6</span></div>
              <div class="value">3.4 min</div>
              <div class="label">ETA variance</div>
            </div>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-lg-8">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-location-01"></i> Store locations</div>
                <span class="card-sub">metro area · 12 venues</span>
              </div>
              <div class="card-body p-0"><div class="map-embed" id="map-stores"></div></div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-route-01"></i> Delivery zones</div>
                <span class="card-sub">same-day · 30 km</span>
              </div>
              <div class="card-body p-0"><div class="map-embed" id="map-zones"></div></div>
            </div>
          </div>
        </div>

        <div class="row g-3 mt-0">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-user-group"></i> Customer density</div>
                <div class="d-flex gap-1">
                  <span class="tag tag-indigo"><i class="hgi-stroke hgi-circle"></i> 0–50</span>
                  <span class="tag tag-sky"><i class="hgi-stroke hgi-circle"></i> 50–200</span>
                  <span class="tag tag-green"><i class="hgi-stroke hgi-circle"></i> 200+</span>
                </div>
              </div>
              <div class="card-body p-0"><div class="map-embed" id="map-heat" style="height:360px"></div></div>
            </div>
          </div>
        </div>
      </section>
