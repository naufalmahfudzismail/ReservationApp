import React, { Component } from 'react';
import './App.css';
import Main from './main';
import MainComponent from '../Views/detail.jsx'

class MainMenu extends Component {

    constructor() {
        super();
        this.state = {
          ruangan: []
        };
      }


    render() {
        return (
        <div className="App">
            <MainComponent></MainComponent>
        </div>
        );
    }
}

export default MainMenu;
