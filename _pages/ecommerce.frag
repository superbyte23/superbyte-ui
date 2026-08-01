      <section class="page-section active" id="page-ecommerce">
        <div class="page-head">
          <div><h1>E-commerce</h1><p>storefront · orders · live since 08:00</p></div>
          <div class="d-flex gap-2">
            <button class="btn btn-ghost btn-sm"><i class="hgi-stroke hgi-filter-horizontal me-1"></i> Filter</button>
            <button class="btn btn-primary btn-sm"><i class="hgi-stroke hgi-shopping-cart-add-01 me-1"></i> New order</button>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-6 col-xl-3">
            <div class="card stat-card">
              <div class="top"><div class="stat-icon" style="background:var(--accent-bg);color:var(--accent-h)"><i class="hgi-stroke hgi-dollar-01"></i></div><span class="stat-delta up"><i class="hgi-stroke hgi-arrow-up-01"></i> 9.2%</span></div>
              <div class="value">$42.8K</div>
              <div class="label">Revenue today</div>
            </div>
          </div>
          <div class="col-6 col-xl-3">
            <div class="card stat-card">
              <div class="top"><div class="stat-icon" style="background:var(--green-bg);color:var(--green)"><i class="hgi-stroke hgi-shopping-cart-01"></i></div><span class="stat-delta up"><i class="hgi-stroke hgi-arrow-up-01"></i> 4.6%</span></div>
              <div class="value">1,204</div>
              <div class="label">Orders</div>
            </div>
          </div>
          <div class="col-6 col-xl-3">
            <div class="card stat-card">
              <div class="top"><div class="stat-icon" style="background:var(--yellow-bg);color:var(--yellow)"><i class="hgi-stroke hgi-receipt-text"></i></div><span class="stat-delta up"><i class="hgi-stroke hgi-arrow-up-01"></i> 1.1%</span></div>
              <div class="value">$35.60</div>
              <div class="label">Avg order value</div>
            </div>
          </div>
          <div class="col-6 col-xl-3">
            <div class="card stat-card">
              <div class="top"><div class="stat-icon" style="background:var(--danger-bg);color:var(--danger)"><i class="hgi-stroke hgi-percent"></i></div><span class="stat-delta down"><i class="hgi-stroke hgi-arrow-down-01"></i> 0.2%</span></div>
              <div class="value">3.4%</div>
              <div class="label">Conversion rate</div>
            </div>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-lg-8">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-chart-area"></i> Revenue</div>
                <div class="d-flex gap-1">
                  <span class="tag tag-indigo"><i class="hgi-stroke hgi-circle"></i> This week</span>
                  <span class="tag tag-slate"><i class="hgi-stroke hgi-circle"></i> Last week</span>
                </div>
              </div>
              <div class="card-body"><div style="height:230px"><canvas id="ecRevenueChart"></canvas></div></div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card h-100">
              <div class="card-header"><div class="card-title"><i class="hgi-stroke hgi-delivery-truck-01"></i> Order status</div></div>
              <div class="card-body d-flex flex-column align-items-center">
                <div class="w-100" style="height:170px"><canvas id="ecStatusChart"></canvas></div>
                <div class="w-100 mt-3">
                  <div class="d-flex justify-content-between mb-2" style="font-size:12px"><span><span class="legend-dot" style="background:var(--accent)"></span>Pending</span><span class="font-mono" style="color:var(--text2)">214</span></div>
                  <div class="d-flex justify-content-between mb-2" style="font-size:12px"><span><span class="legend-dot" style="background:var(--accent-h)"></span>Shipped</span><span class="font-mono" style="color:var(--text2)">388</span></div>
                  <div class="d-flex justify-content-between mb-2" style="font-size:12px"><span><span class="legend-dot" style="background:var(--green)"></span>Delivered</span><span class="font-mono" style="color:var(--text2)">542</span></div>
                  <div class="d-flex justify-content-between" style="font-size:12px"><span><span class="legend-dot" style="background:var(--danger)"></span>Cancelled</span><span class="font-mono" style="color:var(--text2)">60</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-lg-7">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-package-01"></i> Top products</div>
                <span class="card-sub">this week · by revenue</span>
              </div>
              <table class="data-table">
                <thead><tr><th>Product</th><th>Category</th><th>Sold</th><th>Revenue</th><th>Trend</th></tr></thead>
                <tbody>
                  <tr><td class="name-cell">Superbyte Pro Keyboard</td><td><span class="tag tag-indigo">Accessories</span></td><td class="mono-cell">412</td><td class="mono-cell">$18,540</td><td><span class="stat-delta up"><i class="hgi-stroke hgi-arrow-up-01"></i> 18%</span></td></tr>
                  <tr><td class="name-cell">Aero Desk Lamp</td><td><span class="tag tag-sky">Home</span></td><td class="mono-cell">298</td><td class="mono-cell">$11,324</td><td><span class="stat-delta up"><i class="hgi-stroke hgi-arrow-up-01"></i> 9%</span></td></tr>
                  <tr><td class="name-cell">Volt Monitor 27″</td><td><span class="tag tag-amber">Electronics</span></td><td class="mono-cell">173</td><td class="mono-cell">$9,515</td><td><span class="stat-delta down"><i class="hgi-stroke hgi-arrow-down-01"></i> 4%</span></td></tr>
                  <tr><td class="name-cell">Cloud Cushion Chair</td><td><span class="tag tag-green">Furniture</span></td><td class="mono-cell">141</td><td class="mono-cell">$8,883</td><td><span class="stat-delta up"><i class="hgi-stroke hgi-arrow-up-01"></i> 22%</span></td></tr>
                  <tr><td class="name-cell">Pulse Smart Watch</td><td><span class="tag tag-pink">Wearables</span></td><td class="mono-cell">205</td><td class="mono-cell">$7,790</td><td><span class="stat-delta down"><i class="hgi-stroke hgi-arrow-down-01"></i> 2%</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="card h-100">
              <div class="card-header"><div class="card-title"><i class="hgi-stroke hgi-chart-column"></i> Sales by category</div></div>
              <div class="card-body"><div style="height:230px"><canvas id="ecCatsChart"></canvas></div></div>
            </div>
          </div>
        </div>
      </section>
