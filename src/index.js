import React from 'react'
import ReactDOM from 'react-dom';
import { Route, Link,Switch, BrowserRouter as Router } from 'react-router-dom'
import Login from './login.js';
import CreatePatient from './createPatient.js';
import AppMain from './app.js';

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
  

