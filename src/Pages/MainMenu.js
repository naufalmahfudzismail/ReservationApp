import React, { Component } from 'react';
import './App.css';
import MainComponent from '../Views/MainMenuComponent.jsx'
import FindDialogComponent from '../Views/FindEmptyRoomDialog'
import MainAppBar from '../Elements/MenuApp'

class MainMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
          nim :'',
          ruangan: [],
          open : ''
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

      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    render() {
        return (
        <div className="App">
         <MainAppBar />
            <MainComponent 
            ruangan = {this.state.ruangan}
            cariClick = {this.handleClickOpen}
            button_name = "Lihat Jadwal" ></MainComponent>
            <FindDialogComponent
              open = {this.state.open}
              handleClose = {this.handleClose}></FindDialogComponent>
        </div>
        );
    }
}

export default MainMenu;
