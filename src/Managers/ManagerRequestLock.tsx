
const RequestLockComponent = (props:any) => {
    return(<>
<div className="modal fade" id="requestLock" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Raise Soft Lock Request</h5>
        <a className="" data-bs-dismiss="modal" aria-label="Close" href="#"><span className="fa fa-times"></span></a>
      </div>
      <div className="modal-body">      
        <label className="mb-2">Please confirm the lock request for <span>{props.employeeId}</span></label>
        <p className="mb-0">Request Message (must be atleast 10 char long)</p>
        <textarea className="form-control" rows={3}></textarea>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" className="btn btn-primary">Send Request</button>
      </div>
    </div>
  </div>
</div>
   </>)
}
export default RequestLockComponent;