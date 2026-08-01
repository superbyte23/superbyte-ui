      <section class="page-section active" id="page-editors">
        <div class="page-head">
          <div><h1>Editors</h1><p>quill 2.0.3 · codemirror 5.65.16 · vendored locally</p></div>
          <div class="d-flex gap-2">
            <button class="btn btn-ghost btn-sm" onclick="resetEditors()"><i class="hgi-stroke hgi-rotate-left-01 me-1"></i> Reset</button>
            <button class="btn btn-primary btn-sm" onclick="showToast('success','Document saved')"><i class="hgi-stroke hgi-save me-1"></i> Save</button>
          </div>
        </div>

        <div class="row g-3 mb-3">
          <div class="col-lg-8">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-content-writing"></i> Rich text</div>
                <span class="card-sub">quill · snow theme</span>
              </div>
              <div class="card-body p-0">
                <div id="quill-editor"></div>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card h-100 panel-fill">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-code"></i> HTML output</div>
                <span class="card-sub">live · escaped</span>
              </div>
              <div class="card-body"><pre class="ql-out" id="ql-out">&lt;p&gt;Start typing…&lt;/p&gt;</pre></div>
            </div>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-lg-4">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-jsx-01"></i> JavaScript</div>
                <span class="card-sub">javascript mode</span>
              </div>
              <div class="card-body p-0"><textarea id="cm-js" spellcheck="false"></textarea></div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-html-5"></i> HTML</div>
                <span class="card-sub">htmlmixed mode</span>
              </div>
              <div class="card-body p-0"><textarea id="cm-html" spellcheck="false"></textarea></div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card h-100">
              <div class="card-header">
                <div class="card-title"><i class="hgi-stroke hgi-python"></i> Python</div>
                <span class="card-sub">python mode</span>
              </div>
              <div class="card-body p-0"><textarea id="cm-py" spellcheck="false"></textarea></div>
            </div>
          </div>
        </div>
      </section>
