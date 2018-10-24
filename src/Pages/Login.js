import React, { Component } from 'react';
import './App.css';
import LoginComponent from '../Views/LoginComponent.jsx';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
       <LoginComponent ></LoginComponent>
      </div>
    );
  }
}

export default Login;
