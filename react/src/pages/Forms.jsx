import { useEffect, useRef } from 'react'
import 'superbyte-admin/vendor/quill/quill.js'
import 'superbyte-admin/vendor/quill/quill.snow.css'
import 'superbyte-admin/vendor/codemirror/codemirror.min.js'
import 'superbyte-admin/vendor/codemirror/codemirror.min.css'
import cmJsModeUrl from 'superbyte-admin/vendor/codemirror/mode/javascript.min.js?url'
import { useApp } from '../theme/AppContext'

export default function Forms() {
  const quillRef = useRef(null)
  const cmRef = useRef(null)
  const { showToast } = useApp()

  useEffect(() => {
    if (window.Quill && quillRef.current && !quillRef.current.dataset.mounted) {
      quillRef.current.dataset.mounted = '1'
      new window.Quill(quillRef.current, {
        theme: 'snow',
        placeholder: 'Write something…',
        modules: { toolbar: [['bold', 'italic', 'underline'], ['blockquote'], [{ list: 'ordered' }, { list: 'bullet' }], ['link']] }
      })
    }
    const mountCm = () => {
      if (!window.CodeMirror || !cmRef.current || cmRef.current.dataset.mounted) return
      cmRef.current.dataset.mounted = '1'
      window.CodeMirror.fromTextArea(cmRef.current, {
        mode: 'javascript',
        lineNumbers: true,
        tabSize: 2,
        theme: 'default'
      })
    }
    if (window.CodeMirror) {
      const s = document.createElement('script')
      s.src = cmJsModeUrl
      s.onload = mountCm
      document.head.appendChild(s)
      mountCm()
    }
  }, [])

  return (
    <section className="page-section active">
      <div className="page-head">
        <div>
          <h1>Forms</h1>
          <p>inputs · selects · switches · rich text &amp; code editors</p>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-edit-02"></i> Project settings
              </div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="f-name"
                  placeholder="Project name"
                  defaultValue="Superbyte UI"
                />
                <label htmlFor="f-name">Project name</label>
              </div>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  id="f-desc"
                  placeholder="Description"
                  style={{ height: '100px' }}
                ></textarea>
                <label htmlFor="f-desc">Description</label>
              </div>
              <div className="d-flex flex-wrap gap-2 align-items-center">
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="f-public" defaultChecked />
                  <label className="form-check-label" htmlFor="f-public">
                    Public project
                  </label>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" id="f-wiki" />
                  <label className="form-check-label" htmlFor="f-wiki">
                    Enable wiki
                  </label>
                </div>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-primary" onClick={() => showToast('success', 'Settings saved')}>
                  <i className="hgi-stroke hgi-tick-01 me-1"></i> Save changes
                </button>
                <button className="btn btn-ghost">Cancel</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-keyboard"></i> Input types
              </div>
              <span className="card-sub">native HTML5</span>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="hgi-stroke hgi-mail-01"></i>
                </span>
                <input type="email" className="form-control" placeholder="Email address" />
              </div>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="hgi-stroke hgi-lock"></i>
                </span>
                <input type="password" className="form-control" placeholder="Password" />
              </div>
              <div className="form-floating">
                <select className="form-select" id="f-plan" defaultValue="pro">
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
                <label htmlFor="f-plan">Plan</label>
              </div>
              <div className="form-floating">
                <input type="range" className="form-range" id="f-members" defaultValue="3" min="1" max="10" />
                <label htmlFor="f-members" style={{ position: 'static' }}>
                  Team members: 3
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-pen-tool-01"></i> Rich text editor
              </div>
              <span className="card-sub">Quill · vendored</span>
            </div>
            <div className="card-body">
              <div ref={quillRef} style={{ height: '260px' }}></div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card h-100">
            <div className="card-header">
              <div className="card-title">
                <i className="hgi-stroke hgi-code"></i> Code editor
              </div>
              <span className="card-sub">CodeMirror · vendored</span>
            </div>
            <div className="card-body">
              <textarea
                ref={cmRef}
                defaultValue={`const grid = (n) => n * 42;\n\nfunction ping(host) {\n  console.log('pong from', host);\n  return true;\n}\n\nconst stats = { requests: 1024, errors: 0 };\n`}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
