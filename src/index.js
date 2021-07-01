import React from 'react'
import ReactDOM from 'react-dom';
import { Route,Switch, BrowserRouter as Router } from 'react-router-dom'
import Login from './components/login.js';
import CreatePatient from './components/createPatient.js';
import AppMain from './components/app.js';


const routing =(  
    <Router>  
      <div> 
              <Switch>
        <Route path="/" exact component={Login} />  
        <Route path="/app" component={AppMain} />  
        <Route path="/createPatient" component={CreatePatient} />  
               </Switch> 
      </div>  
    </Router>  
  ) 	
  ReactDOM.render(routing, document.getElementById('root')); 
  

