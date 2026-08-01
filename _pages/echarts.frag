      <section class="page-section active" id="page-echarts">
        <div class="page-head">
          <div><h1>ECharts</h1><p>echarts 5.5.1 · vendored locally · advanced chart gallery</p></div>
          <div class="d-flex gap-2">
            <button class="btn btn-ghost btn-sm" onclick="showToast('success','Palette re-read from tokens')"><i class="hgi-stroke hgi-refresh me-1"></i> Re-render</button>
            <button class="btn btn-primary btn-sm" onclick="echartShot()"><i class="hgi-stroke hgi-download-01 me-1"></i> Export PNG</button>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-lg-6">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-fire-02"></i> Engagement heatmap</div>
                <span class="card-sub">activity by hour × weekday</span>
              </div>
              <div class="card-body"><div class="ech-embed" id="ech-heat"></div></div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-chart-candlestick"></i> Stock candlestick</div>
                <span class="card-sub">GRDL · 60 sessions · + volume</span>
              </div>
              <div class="card-body"><div class="ech-embed" id="ech-candle"></div></div>
            </div>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-lg-7">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-hierarchy"></i> Revenue treemap</div>
                <span class="card-sub">Q2 · by product line</span>
              </div>
              <div class="card-body"><div class="ech-embed" id="ech-tree"></div></div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-hierarchy-square-01"></i> Service graph</div>
                <span class="card-sub">force layout · drag nodes</span>
              </div>
              <div class="card-body"><div class="ech-embed" id="ech-graph"></div></div>
            </div>
          </div>
        </div>
      </section>
