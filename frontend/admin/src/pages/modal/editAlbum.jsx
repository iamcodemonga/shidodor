import React from 'react'

export default function editAlbum({ children }) {

    

  return (
    <div className="modal fade" role="dialog" tabIndex={-1} id="edit-album">
        <div className="modal-dialog" role="document">
            <div className="modal-content">
            <div className="modal-header border-0">
                <h4 className="modal-title fw-bold text-success">Edit album</h4><button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
                {/* <form>
                <div><label className="form-label">Title</label><input className="form-control" type="text" placeholder="album title" /></div>
                <div className="mt-3"><label className="form-label">Date (optional)</label><input className="form-control" type="text" placeholder="Date of creation" /></div><button className="btn btn-success mt-3 btn-brand" type="button">submit</button>
                </form> */}
                {children}
            </div>
            <div className="modal-footer border-0"><button className="btn btn-light" type="button" data-bs-dismiss="modal">Close</button></div>
            </div>
        </div>
    </div>
  )
}
