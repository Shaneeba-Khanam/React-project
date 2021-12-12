import axios from "axios";

export const loginReducer=(state={username:"NA",token:"NA",usertype:"NA",message:""},action)=>{
    switch(action.type){
        case "LOGIN_SUCCESS":
            console.log(action.data)
            return {...action.data,message:""};
        case "LOGIN_FAILURE":
            console.log(action)
            return {...state,message:"Login Credentials incorrect"}
        default:
            return state
    }
}

// async function peopleRead(){
//     try{
//         let response =await axios.get("http://localhost:8000/users/manager")
          
//          return response.data
//       }
//     catch(e){
//         return []
//     }
// }

export const managerReducer=(state={employeeData:[]},action)=>{
    switch(action.type){
        case "LOAD_EMPLOYEE":
            return {employeeData:action.data};
        default:
                 return state;
}
}