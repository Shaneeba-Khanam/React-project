import * as React from "react";
import { Grid, GridColumn,GridPageChangeEvent,GridCellProps } from "@progress/kendo-react-grid";
import {useEffect,useState} from "react"
import ManagerService from "../services/ManagerService";
import { Modal, Button } from "react-bootstrap";
import {EmployeeProps} from '../Managers/Employee';

interface PageState {
    skip: number;
    take: number;
  }
  
const initialDataState: PageState = { skip: 0, take: 10 };

const WFMHome=()=>{

  const [data, setData] = React.useState<any[]>([])
  const [page, setPage] = React.useState<PageState>(initialDataState);
  const [showModal, setShow] = useState(false);

  useEffect(() => {       
    ManagerService.getEmployeesManager("faizal")
    .then(response => {
      setData(response)
    })
}, [])
  
type WfmInfo={
  EmployeeId:number;
  Requestee: string;
  reqDate:string;
  requestMsg:string
  wfm_manager:string;
}
const initialState:WfmInfo={EmployeeId:0,Requestee:"karan",reqDate:"09/10/2021",requestMsg:"I need this Resource",wfm_manager:"lokesh"}

const handleClose = () => setShow(false);
const [RowData, setRowData] = useState<WfmInfo>(initialState);

const handleShow = (data:any) => 
{
  console.log(data.EmployeeId) 
  setRowData(data);
  setShow(true);
}

//console.log(RowData.EmployeeId)  

const pageChange = (event: GridPageChangeEvent) => {
    setPage(event.page);
};
// const MyCustomCell = (props: GridCellProps | any) => (
//     console.log(props)
//     <td><button className='customEdit RequestLockButton' type="button" onClick={ () => handleShow()}>
//     <span className="fa fa-lock mr-2"></span>View Details</button></td>
// );
const MyCustomCell = (props: GridCellProps | any) => (
  // console.log(props.data)
   <td><button className='customEdit RequestLockButton' type="button" onClick={ () => handleShow(props.dataItem)}>
     <span className="fa fa-lock mr-2"></span>Request Lock</button></td>
 );
return (<>
        <h4 className="text-center mb-4">WFM Home Screen</h4>
        <h5 className="Headings">Request Awaiting Approval</h5>
        <Grid
             data={data.slice(page.skip, page.take + page.skip)}
             skip={page.skip}
             take={page.take}
             total={data.length}
             onPageChange={pageChange}
             pageable={true}
        >
        <GridColumn field="EmployeeId" title="Employee Id" width="100px" />
        <GridColumn field="Requestee" title="Requestee" width="300px" />
        <GridColumn field="Request Date" title="Request Date" width="200px"/>
        <GridColumn field="Employees Manager" title="Employees Manager" width="350px" />
        <GridColumn field="Approve Request" title="" cell= {(row:any) => {return MyCustomCell(row)}} width="332px"/>
        </Grid>
       
        <Modal show={showModal} onHide={handleClose} id="approveLock">
            <Modal.Header>
                <Modal.Title>Soft Lock Request Confirmation</Modal.Title>
                <span className="fa fa-times" onClick={handleClose}></span>
            </Modal.Header>
            <Modal.Body>
            <p className="StatusMsg">Status Update for Request Lock</p>
                <div>
                    <label className="mb-0">Employee ID</label><span>{RowData.EmployeeId}</span>
                </div>
                <div>
                    <label className="mb-0">Requestee</label><span>{RowData.Requestee}</span>
                </div>
                <div>
                    <label className="mb-0">Employee Manager</label><span>{RowData.wfm_manager}</span>
                </div>
                <div>
                    <label className="mb-0">Request Description</label><span>{RowData.requestMsg}</span>
                </div>
                <div>
                    <label className="mb-0">Status</label>
                    <select name="" id="">
                        <option value="Update">Update</option>
                        <option value="Reject">Reject</option>
                    </select>
                </div>     
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
            </Modal.Footer>
      </Modal>


    </>)
}

export default WFMHome