import React, { Component } from 'react';
import './App.css';
import MainComponent from '../Views/MainMenuComponent.jsx'

class MainMenu extends Component {

    constructor(props) {
        super(props);
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
