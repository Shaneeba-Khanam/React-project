import * as React from "react";
import { Grid, GridColumn,GridPageChangeEvent,GridCellProps } from "@progress/kendo-react-grid";
import {useEffect} from "react"
import ManagerService from "../services/ManagerService";
import AcceptLock from './WFMAcceptRequestLock';

interface PageState {
    skip: number;
    take: number;
  }
  
const initialDataState: PageState = { skip: 0, take: 10 };

const WFMHome=()=>{
    const [data, setData] = React.useState<any[]>([])
  const [page, setPage] = React.useState<PageState>(initialDataState);
  useEffect(() => {
        
    ManagerService.getEmployeesManager("faizal")
    .then(response => {
      setData(response)
    })

}, [])
  
   
    
const pageChange = (event: GridPageChangeEvent) => {
    setPage(event.page);
};
const MyCustomCell = (props: GridCellProps) => (
    <td><button className='customEdit RequestLockButton' type="button" data-bs-toggle="modal" data-bs-target="#approveLock">
    <span className="fa fa-lock mr-2"></span>View Details</button></td>
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
        <GridColumn field="Approve Request" title="" cell={MyCustomCell} width="332px"/>
        </Grid>
       
        <AcceptLock/>


    </>)
}

export default WFMHome