import axios from "axios"
const getEmployeesManager = (username: any) : Promise<any> => 
{
    return new Promise((resolve,reject)=> 
    {
        axios.post("http://localhost:8000/employees/manager/" + username).then(response=>
        {    
            //console.log("getting data or not") 
            console.log(response.data)       
            resolve(response.data)
        }).catch(error=> {
            reject(error)
        });
    });
};

//export default getEmployeesManager;
export default { getEmployeesManager }