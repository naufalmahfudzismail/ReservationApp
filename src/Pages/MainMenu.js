import React, { Component } from 'react';
import './App.css';
import Main from './main';
import MainComponent from '../Views/mainmenu.jsx'

class MainMenu extends Component {

    constructor() {
        super();
        this.state = {
          ruangan: []
        };
      }

      componentDidMount() {
        //ajax call
        fetch("http://localhost:4001/api/allRuangan")
          .then(response => response.json())
          .then(json => {
            this.setState({
              ruangan: json.response
            });
          });
      }

    render() {
        return (
        <div className="App">
            <MainComponent ruangan = {this.state.ruangan} ></MainComponent>
        </div>
        );
    }
}

export default MainMenu;
