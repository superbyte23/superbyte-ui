<div class="row g-4">
  <div class="col-lg-5">
    <div class="card">
      <div class="card-header">
        <h3 class="mb-0">Theme lab</h3>
        <div class="muted">Pick a combo yourself or let the dice roll — then copy the preset.</div>
      </div>
      <div class="card-body">
        <button type="button" class="btn btn-primary w-100 mb-4" id="create-random"><i class="hgi-stroke hgi-shuffle me-2"></i>Surprise me — random theme</button>

        <div class="customizer-section">
          <label class="customizer-label">Base color</label>
          <div class="swatch-grid" id="create-swatches">
            <div class="swatch active" data-key="indigo" title="Indigo" style="background:#6366f1"></div>
            <div class="swatch" data-key="violet" title="Violet" style="background:#8b5cf6"></div>
            <div class="swatch" data-key="fuchsia" title="Fuchsia" style="background:#d946ef"></div>
            <div class="swatch" data-key="pink" title="Pink" style="background:#ec4899"></div>
            <div class="swatch" data-key="rose" title="Rose" style="background:#f43f5e"></div>
            <div class="swatch" data-key="red" title="Red" style="background:#ef4444"></div>
            <div class="swatch" data-key="orange" title="Orange" style="background:#f97316"></div>
            <div class="swatch" data-key="amber" title="Amber" style="background:#f59e0b"></div>
            <div class="swatch" data-key="yellow" title="Yellow" style="background:#eab308"></div>
            <div class="swatch" data-key="lime" title="Lime" style="background:#84cc16"></div>
            <div class="swatch" data-key="green" title="Green" style="background:#22c55e"></div>
            <div class="swatch" data-key="emerald" title="Emerald" style="background:#10b981"></div>
            <div class="swatch" data-key="teal" title="Teal" style="background:#14b8a6"></div>
            <div class="swatch" data-key="cyan" title="Cyan" style="background:#06b6d4"></div>
            <div class="swatch" data-key="sky" title="Sky" style="background:#0ea5e9"></div>
            <div class="swatch" data-key="blue" title="Blue" style="background:#3b82f6"></div>
            <div class="swatch" data-key="purple" title="Purple" style="background:#a855f7"></div>
          </div>
        </div>

        <div class="customizer-section">
          <label class="customizer-label">Base theme</label>
          <div class="base-theme-grid" id="create-base-themes">
            <button type="button" class="base-theme-opt active" data-key="neutral" title="Neutral"><span class="dot" style="background:#6b7280"></span><span class="nm">Neutral</span></button>
            <button type="button" class="base-theme-opt" data-key="stone" title="Stone"><span class="dot" style="background:#78716c"></span><span class="nm">Stone</span></button>
            <button type="button" class="base-theme-opt" data-key="zinc" title="Zinc"><span class="dot" style="background:#71717a"></span><span class="nm">Zinc</span></button>
            <button type="button" class="base-theme-opt" data-key="mauve" title="Mauve"><span class="dot" style="background:#8b7f9e"></span><span class="nm">Mauve</span></button>
            <button type="button" class="base-theme-opt" data-key="olive" title="Olive"><span class="dot" style="background:#6e7459"></span><span class="nm">Olive</span></button>
            <button type="button" class="base-theme-opt" data-key="mist" title="Mist"><span class="dot" style="background:#7a8a99"></span><span class="nm">Mist</span></button>
            <button type="button" class="base-theme-opt" data-key="taupe" title="Taupe"><span class="dot" style="background:#8b8172"></span><span class="nm">Taupe</span></button>
          </div>
        </div>

        <div class="customizer-section">
          <label class="customizer-label">Font</label>
          <div class="d-flex align-items-center gap-3">
            <select class="form-select flex-grow-1" id="create-font">
              <option value="ubuntu" style="font-family:'Ubuntu',sans-serif">Ubuntu</option>
              <option value="inter" style="font-family:'Inter',sans-serif">Inter</option>
              <option value="notosans" style="font-family:'Noto Sans',sans-serif">Noto Sans</option>
              <option value="nunitosans" style="font-family:'Nunito Sans',sans-serif">Nunito Sans</option>
              <option value="figtree" style="font-family:'Figtree',sans-serif">Figtree</option>
              <option value="roboto" style="font-family:'Roboto',sans-serif">Roboto</option>
              <option value="raleway" style="font-family:'Raleway',sans-serif">Raleway</option>
              <option value="dmsans" style="font-family:'DM Sans',sans-serif">DM Sans</option>
              <option value="publicsans" style="font-family:'Public Sans',sans-serif">Public Sans</option>
              <option value="outfit" style="font-family:'Outfit',sans-serif">Outfit</option>
              <option value="oxanium" style="font-family:'Oxanium',sans-serif">Oxanium</option>
              <option value="manrope" style="font-family:'Manrope',sans-serif">Manrope</option>
              <option value="spacegrotesk" style="font-family:'Space Grotesk',sans-serif">Space Grotesk</option>
              <option value="montserrat" style="font-family:'Montserrat',sans-serif">Montserrat</option>
              <option value="ibmplexsans" style="font-family:'IBM Plex Sans',sans-serif">IBM Plex Sans</option>
              <option value="sourcesans3" style="font-family:'Source Sans 3',sans-serif">Source Sans 3</option>
              <option value="instrumentsans" style="font-family:'Instrument Sans',sans-serif">Instrument Sans</option>
            </select>
            <span class="font-preview" id="create-font-preview" style="font-family:'Ubuntu',sans-serif">Aa</span>
          </div>
        </div>

        <div class="customizer-section">
          <label class="customizer-label">Style</label>
          <select class="form-select" id="create-style">
            <option value="default">Default</option>
            <option value="newyork">New York</option>
            <option value="radix">Radix</option>
            <option value="bold">Bold accent</option>
          </select>
        </div>

        <div class="customizer-section">
          <label class="customizer-label">Corner radius</label>
          <div class="d-flex gap-2" id="create-radius">
            <button type="button" class="radius-opt" data-r="4px" data-rs="2px">Sharp</button>
            <button type="button" class="radius-opt" data-r="8px" data-rs="4px">Default</button>
            <button type="button" class="radius-opt active" data-r="14px" data-rs="8px">Round</button>
          </div>
        </div>

        <div class="customizer-section">
          <label class="customizer-label">Appearance</label>
          <div class="d-flex gap-2" id="create-appearance">
            <button type="button" class="radius-opt active" data-mode="light"><i class="hgi-stroke hgi-sun-01 me-1"></i> Light</button>
            <button type="button" class="radius-opt" data-mode="dark"><i class="hgi-stroke hgi-moon-01 me-1"></i> Dark</button>
          </div>
        </div>

        <div class="customizer-section">
          <label class="customizer-label">Layout</label>
          <div class="row g-2">
            <div class="col-6"><button type="button" class="radius-opt w-100" id="create-compact">Compact</button></div>
            <div class="col-6"><button type="button" class="radius-opt w-100 active" id="create-roomy">Roomy</button></div>
            <div class="col-6"><button type="button" class="radius-opt w-100 active" id="create-fluid">Fluid</button></div>
            <div class="col-6"><button type="button" class="radius-opt w-100" id="create-boxed">Boxed</button></div>
          </div>
        </div>

        <div class="customizer-section mb-0">
          <label class="customizer-label">Base font size</label>
          <div class="d-flex align-items-center gap-3">
            <input type="range" class="form-range flex-grow-1" id="create-fs" min="13" max="17" step="1" value="14">
            <span id="create-fs-out" style="font-family:var(--mono);font-size:12px;color:var(--text2);min-width:34px;text-align:right">14px</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="col-lg-7">
    <div class="card">
      <div class="card-header d-flex align-items-center gap-2">
        <h3 class="mb-0 me-auto">Preview</h3>
        <button type="button" class="btn btn-sm btn-primary" id="create-copy-cmd"><i class="hgi-stroke hgi-copy-01 me-1"></i> Copy command</button>
      </div>
      <div class="card-body">
        <div class="preview-frame">
          <div class="d-flex align-items-center gap-2 pb-3 mb-3 border-bottom">
            <div class="preview-logo"><i class="hgi-stroke hgi-cube"></i></div>
            <div class="fw-semibold">Acme Dashboard</div>
            <div class="ms-auto d-flex align-items-center gap-2">
              <span class="badge text-bg-primary">v2.0</span>
              <div class="avatar-circle" style="width:26px;height:26px;font-size:11px">JD</div>
            </div>
          </div>
          <div class="row g-3">
            <div class="col-6 col-md-4"><div class="preview-stat"><div class="preview-stat-n">2,481</div><div class="preview-stat-l">Total users</div></div></div>
            <div class="col-6 col-md-4"><div class="preview-stat"><div class="preview-stat-n">$12.4k</div><div class="preview-stat-l">Revenue</div></div></div>
            <div class="col-6 col-md-4"><div class="preview-stat"><div class="preview-stat-n">98.2%</div><div class="preview-stat-l">Uptime</div></div></div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-3 mb-1">
            <span class="preview-stat-l">Quarterly goal</span><span class="preview-stat-l">64%</span>
          </div>
          <div class="progress" style="height:8px"><div class="progress-bar" style="width:64%"></div></div>
          <div class="d-flex flex-wrap gap-2 mt-3">
            <button type="button" class="btn btn-sm btn-primary"><i class="hgi-stroke hgi-add-01 me-1"></i>Create project</button>
            <button type="button" class="btn btn-sm btn-outline-secondary">Cancel</button>
            <button type="button" class="btn btn-sm" style="background:var(--accent-bg);color:var(--accent-h)">Soft accent</button>
          </div>
          <input type="text" class="form-control form-control-sm mt-3" placeholder="name@company.com" disabled>
        </div>
      </div>
    </div>

    <div class="card mt-4">
      <div class="card-header d-flex align-items-center gap-2">
        <h3 class="mb-0 me-auto">Generated preset</h3>
        <span class="badge text-bg-secondary">npx superbyte</span>
      </div>
      <div class="card-body p-0">
        <pre class="preset-code" id="preset-cmd"></pre>
        <pre class="preset-code preset-json" id="preset-json"></pre>
      </div>
    </div>
  </div>
</div>
