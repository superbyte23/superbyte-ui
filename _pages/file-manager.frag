      <section class="page-section active" id="page-files">
        <div class="page-head">
          <div><h1>File manager</h1><p id="fm-sub">home / projects / superbyte-admin · 14 items</p></div>
          <div class="d-flex gap-2">
            <div class="search-wrap">
              <i class="hgi-stroke hgi-search-01 search-icon"></i>
              <input class="search-input" id="fm-search" placeholder="Search files…" autocomplete="off" oninput="fmFilter(this.value)">
            </div>
            <button class="btn btn-ghost btn-sm" data-bs-toggle="modal" data-bs-target="#createModal"><i class="hgi-stroke hgi-folder-add me-1"></i> New folder</button>
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#uploadModal"><i class="hgi-stroke hgi-cloud-upload me-1"></i> Upload</button>
          </div>
        </div>

        <div class="card">
          <div class="table-toolbar">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item" role="button" onclick="fmGo(0)" style="cursor:pointer">Home</li>
                <li class="breadcrumb-item" role="button" onclick="fmGo(1)" style="cursor:pointer">Projects</li>
                <li class="breadcrumb-item active" aria-current="page">superbyte-admin</li>
              </ol>
            </nav>
            <div class="d-flex gap-2 align-items-center">
              <span class="font-mono" id="fm-count" style="font-size:11.5px;color:var(--text3)">14 files · 3.2 MB</span>
              <div class="d-flex gap-1">
                <button class="icon-btn active" style="width:30px;height:30px" id="fm-list-btn" onclick="fmView('list')" title="List view"><i class="hgi-stroke hgi-left-to-right-list-bullet" style="font-size:11px"></i></button>
                <button class="icon-btn" style="width:30px;height:30px" id="fm-grid-btn" onclick="fmView('grid')" title="Grid view"><i class="hgi-stroke hgi-grid-view" style="font-size:11px"></i></button>
              </div>
            </div>
          </div>
          <div id="fm-list"></div>
          <div id="fm-grid" class="d-none"></div>
        </div>

        <div class="sel-pill-wrap">
          <div id="sel-bar" role="toolbar">
            <span><span class="sel-count" id="sel-count">0</span> selected</span>
            <span class="sep"></span>
            <span role="button" onclick="fmBulk('Download')"><i class="hgi-stroke hgi-download-01 me-1"></i>Download</span>
            <span role="button" onclick="fmBulk('Share')"><i class="hgi-stroke hgi-share-07 me-1"></i>Share</span>
            <span role="button" onclick="fmBulk('Archive')"><i class="hgi-stroke hgi-archive-01 me-1"></i>Archive</span>
            <span role="button" class="text-danger" onclick="fmBulk('Delete')"><i class="hgi-stroke hgi-delete-01 me-1"></i>Delete</span>
          </div>
        </div>
      </section>
