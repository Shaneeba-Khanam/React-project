import * as React from "react";
import { Grid, GridColumn,GridPageChangeEvent,GridCellProps } from "@progress/kendo-react-grid";
import {useEffect,useState} from "react"
import ManagerService from "../services/ManagerService";
import RequestLockComponent from './ManagerRequestLock';
import { EmployeeProps } from "./Employee";

interface PageState {
    skip: number;
    take: number;
  }
  
const initialDataState: PageState = { skip: 0, take: 10 };

const ManagerHome=()=>{
  const [data, setData] = React.useState<EmployeeProps[]>([])
  const [page, setPage] = React.useState<PageState>(initialDataState);
  useEffect(() => {
        
    ManagerService.getEmployeesManager("faizal")
    .then(response => {
      setData(response)
    })
 

}, [])

  const [name,setName]=useState("")
    const pageChange = (event: GridPageChangeEvent) => {
      setPage(event.page);
    };
    const MyCustomCell = (props: GridCellProps) => (
      
      <td><button className='customEdit RequestLockButton' type="button" data-bs-toggle="modal" data-bs-target="#requestLock">
        <span className="fa fa-lock mr-2"></span>Request Lock</button></td>
    );
    
    return (<>
        <h4 className="text-center mb-4">Manager Home Screen</h4>
        <h5 className="Headings">Managers Request Lock Table</h5>
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
        {/* <GridColumn field="Request Lock" title="" cell={MyCustomCell} width="232px"/> */}
        <GridColumn field="Request Lock" cell={(row:any) => {console.log(row.dataItem.EmployeeId);return<> <td><button className='customEdit RequestLockButton' type="button" data-bs-toggle="modal" data-bs-target="#requestLock">
        <span className="fa fa-lock mr-2"></span>Request Lock</button><RequestLockComponent employeeId={row.dataItem.EmployeeId}/></td></>}} width="232px"
        />
        {/* <GridColumn field="Request Lock" cell={(row:any) => {console.log(row.dataItem.EmployeeId);return<> <td><button className='customEdit RequestLockButton' value={name}  onClick={(e)=>{setName(row.target.value)}} type="button" data-bs-toggle="modal" data-bs-target="#requestLock">
        <span className="fa fa-lock mr-2"></span>Request Lock</button><RequestLockComponent employeeId={row.dataItem.EmployeeId}/></td></>}} width="200px"
        /> */}
        </Grid>
       
     


    </>)
}

export default ManagerHome