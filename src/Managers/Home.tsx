import * as React from "react";
import { Grid, GridColumn,GridPageChangeEvent,GridCellProps } from "@progress/kendo-react-grid";
import {useEffect,useState} from "react"
import ManagerService from "../services/ManagerService";
import { EmployeeProps } from "./Employee";
import { Modal, Button } from "react-bootstrap";
import Logout from "../Logout";
import Login from '../Login';

interface PageState {
    skip: number;
    take: number;
  }
  
const initialDataState: PageState = { skip: 0, take: 10 };

const ManagerHome=({ children, ...rest }:any)=>{

    const [data, setData] = React.useState<EmployeeProps[]>([])
    const [page, setPage] = React.useState<PageState>(initialDataState);
    const [showModal, setShow] = useState(false);
    const [EmployeeId, setEmployeeId] = useState(0);
    
    useEffect(() => {        
      ManagerService.getEmployeesManager("karan")
      .then(response => {
        setData(response)
       console.log(response);
      })
    },[])
    
    const handleClose = (e:any) => {
      setShow(false);
     // e.preventDefault(console.log("refresh"))
     //e.stopImmediatePropagation()
    }
    const handleShow = (Id:any) => 
    {
      console.log(Id)
      setEmployeeId(Id);
      setShow(true);
    }

    const pageChange = (event: GridPageChangeEvent) => {
      setPage(event.page);
    };

    const MyCustomCell = (props: GridCellProps | any) => (
     // console.log(props.data)
      <td><button className='customEdit RequestLockButton' type="button" onClick={ () => handleShow(props.dataItem.EmployeeId)}>
        <span className="fa fa-lock mr-2"></span>Request Lock</button></td>
    );
    return (<>     
        <h4 className="text-center mb-4">Manager Home Screen</h4>
        <h5 className="Headings">Managers Request Lock Table</h5> 
        <Logout/>
        <Grid
             data={data.slice(page.skip, page.take + page.skip)}
             skip={page.skip}
             take={page.take}
             total={data.length}
             onPageChange={pageChange}
             pageable={true}
        >
        <GridColumn field="EmployeeId" title="Employee Id" width="100px" />
        <GridColumn field="Name" title="Name" width="250px" />
        <GridColumn field="Skills" title="Skills" width="400px"/>
        <GridColumn field="Experience" title="Experience" width="150px" />
        <GridColumn field="Manager" title="Manager" width="150px" />
        <GridColumn field="Request Lock" title="" cell= {(row:any) => {return MyCustomCell(row)}} width="232px"/>
        </Grid>
       
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>Raise Soft Lock Request</Modal.Title>
                <span className="fa fa-times" onClick={handleClose}></span>
            </Modal.Header>
            <Modal.Body>
                <label className="mb-2">Please confirm the lock request for <span>{EmployeeId}</span></label>
                <p className="mb-0">Request Message (must be atleast 10 char long)</p>
                <textarea className="form-control" rows={3}></textarea>
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

export default ManagerHome