import React, { Component } from 'react';
import './App.css';
import LoginComponent from '../Views/LoginComponent.jsx';
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  transition: "fade",
  timeout: 2000,
  position: "bottom center"
};

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="App">
      <Provider template={AlertTemplate} {...options}>
          <LoginComponent />
      </Provider>
      </div>
    );
  }
}

export default Login;
