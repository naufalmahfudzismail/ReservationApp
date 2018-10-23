import React, { Component } from 'react';
import './App.css';
import LoginComponent from '../Views/LoginComponent.jsx';

class Login extends Component {

  render() {
    return (
      <div className="App">
       <LoginComponent  link = {this.routeLink}></LoginComponent>
      </div>
    );
  }
}

export default Login;
