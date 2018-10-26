import React, { Component } from 'react';
import './App.css';
import MainComponent from '../Views/MainMenuComponent.jsx'
import FindDialogComponent from '../Views/FindEmptyRoomDialog'
import MainAppBar from '../Elements/MenuApp'
import ProgressBar from '../Elements/ProgresBar'
import Typography from "@material-ui/core/Typography";

class MainMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
          nim :'',
          ruangan: [],
          open : '',
          loading : true,
          error : false
        };
      }

      componentDidMount() {
        //ajax call
        fetch("http://localhost:4001/api/allRuangan")
          .then(response => response.json())
          .then(json => {
            this.setState({
              ruangan: json.response,
              loading : false
            });
          });
      };

      componentDidCatch(){

        this.setState({
          error : true
        })

      }

      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    render() {

      if(this.error)
      {
        return (
          <div>
            <Typography component="h1"
                    variant="h2" align = 'center'>
              404, Terdapat Error pada server
              </Typography>
          </div>
        )
      }
      else{

      if( this.state.loading ){
        return (
          <div className = "App">
          <MainAppBar />
          < ProgressBar></ProgressBar>
          </div>
        )
      }
      else{
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
  }
}

export default MainMenu;
