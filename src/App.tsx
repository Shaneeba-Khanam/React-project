import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute';
import LoginHOC from './Redux/HOC/LoginHOC';
import ManagerHome from './Managers/Home';

const App=()=>{
     return(<div className="App">
    <Router>
      <Switch>
        <Route path="/login">
          <LoginHOC/>
        </Route>
        <ProtectedRoute path="/home" >
         
          <ManagerHome/>
        </ProtectedRoute>
        <Route exact path="/">
          <Redirect exact from="/" to="home" />
        </Route>
        <Route path="*">
          <Redirect exact from="/" to="home" />
        </Route>
      </Switch>
    </Router>
    </div>)
}
export default App;
