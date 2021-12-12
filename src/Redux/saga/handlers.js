import axios from 'axios'
import {call,put} from 'redux-saga/effects'


export function* loginHandler(action){
 try{
 let  result = yield call(axios.post,"http://localhost:8000/users/signin",action.data)
 console.log(result.data)

 localStorage.setItem("username",result.data.username)
 localStorage.setItem("usertype",result.data.usertype)
 localStorage.setItem("token",result.data.token)

 yield put({type:"LOGIN_SUCCESS",data: 
  {
     username:result.data.username,
     usertype:result.data.usertype,
     token: result.data.token
  }})
    } 
  catch(e){
      yield put({type:"LOGIN_FAILURE"})
  }
 
}

// export function* managerHandler(action){
//   try{
// let  result = yield call(axios.get,"http://localhost:8000/users/manager")
// console.log(result.data)

// yield put({type:"LOAD_EMPLOYEE",data: result.data})
//   } 
// catch(e){
//     yield put({type:"FAILURE"})
// }

// }
export function* managerHandler(action){

  try{
    const token= localStorage.getItem("token");
    const username =  localStorage.getItem("username")
    console.log(token)
    console.log(username)
    alert("ttttest")
    console.log('manager-sagas:',action.data);
    console.log(action.data)
    alert("check")
    const getManagerData = () => {
     // return axios({ method: 'get', url: 'http://localhost:8000/employees/manager/'+'faizal', headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImZhaXphbCIsInBhc3N3b3JkIjoicGFzc0AxMjMiLCJpYXQiOjE2MzkyMDk5MzZ9.bC5tFtO-KjWHs2mch45hLH6EIZcuJW_Jl9kkcKXhQH8' } })
      return axios({ method: 'get', url: 'http://localhost:8000/employees/manager'+username, headers: { 'Authorization': 'Bearer '+token } })
      .then(response => response.data)
      .catch(err => {
        throw err;
      });     
    } 
      
    let  result = yield call(getManagerData)   
        yield put({type:"LOAD_EMPLOYEE",data: result})  
    } 
    catch(e){    
        yield put({type:"FAILURE"})  
    }}

  