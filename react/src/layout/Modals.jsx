export default function Modals({ showToast }) {
  return (
    <>
      <div className="modal fade" id="createModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <span className="modal-icon">
                  <i className="hgi-stroke hgi-folder-add"></i>
                </span>{' '}
                New folder
              </div>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-floating">
                <input className="form-control" id="create-name" placeholder="new-folder" />
                <label htmlFor="create-name">Folder name</label>
              </div>
              <div className="form-text mt-2">Folder names must be unique within the current directory.</div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => showToast('success', 'Folder created')}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="uploadModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <span className="modal-icon">
                  <i className="hgi-stroke hgi-cloud-upload"></i>
                </span>{' '}
                Upload files
              </div>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div
                className="dropzone"
                style={{
                  border: '2px dashed var(--border2)',
                  borderRadius: 'var(--radius)',
                  padding: '26px',
                  textAlign: 'center',
                  color: 'var(--text3)',
                  fontSize: '13px'
                }}
              >
                <i className="hgi-stroke hgi-cloud-upload d-block mb-2" style={{ fontSize: '22px' }}></i>
                Drop files here or click to browse
                <br />
                <small style={{ fontSize: '11px' }}>Max 50 MB per file</small>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => showToast('success', 'Upload complete')}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <span className="modal-icon danger">
                  <i className="hgi-stroke hgi-alert-02"></i>
                </span>{' '}
                Confirm delete
              </div>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text2)', fontSize: '13px', margin: '0' }}>
                This action cannot be undone. The item will be permanently removed.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" data-bs-dismiss="modal">
                Cancel
              </button>
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => showToast('success', 'Item deleted')}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
