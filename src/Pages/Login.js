import React, { Component } from 'react';
import './App.css';
import Main from './main';
import LoginComponent from '../Views/LoginComponent.jsx';
import MainMenu from './MainMenu'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Login extends Component {


 routeLink () {
     return (
     <Router>
         <Link to = "/MainMenu" >MainMenu</Link>
            <Route path = "/MainMenu" component={MainMenu}></Route>
     </Router>
     )
 };
  render() {
    return (
      <div className="App">
       <LoginComponent  link = {this.routeLink}></LoginComponent>
      </div>
    );
  }
}

export default Login;
