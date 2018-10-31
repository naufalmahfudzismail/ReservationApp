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
          Mahasiswa : {},
          nim :'',
          ruangan: [],
          open : false,
          loading : true,
          error : false,
          anchorEl: null,
          openDialog : false,
          openDrawer : false,
          auth : true,
        };
      }

      componentDidMount() {
        //ajax call
        fetch("http://localhost:4001/api/allRuangan")
          .then(response => response.json())
          .then(json => {
            this.setState({
              ruangan: json.response,
              nim : this.props.location.state.kode,
            });
          });

          fetch("http://localhost:4001/api/getMahasiswa/"+ this.props.location.state.kode)
          .then(response => response.json())
          .then(json => {
            this.setState({
              Mahasiswa : json.response,
              loading : false
            });
          });
      };

      componentDidCatch(){

        this.setState({
          error : true
        })

      }

      handleClickOpenDialog = () => {
        this.setState({ open: true });
      };
    
      handleCloseDialog = () => {
        this.setState({ open: false });
      };

      // App barr Handle

      handleChange = event => {
        this.setState({ auth: event.target.checked });
      };
    
      handleProfil = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleCloseProfil = () => {
        this.setState({ anchorEl: null });
      };
    
      handleDrawerOpen = () => {
        this.setState({ openDrawer: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ openDrawer: false });
      };

      

    render() {

      
      console.log(this.state.Mahasiswa)
      const openProf = Boolean(this.state.anchorEl);

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
          < ProgressBar openDrawer = {this.state.openDrawer}></ProgressBar>
          </div>
        )
      }
      else{
        return (
        <div className="App">
          <MainAppBar 
                Mahasiswa = {this.state.Mahasiswa}
                open = {this.state.openDrawer}
                handleCloseProfil = {this.handleCloseProfil}
                handleMenu = {this.handleProfil}
                handleDrawerOpen = {this.handleDrawerOpen}
                handleDrawerClose = {this.handleDrawerClose}
                auth = {this.state.auth}
                anchorEl = {this.state.anchorEl}
                handleChange = {this.handleChange}
                openProf = {openProf}>
          </MainAppBar>
          <MainComponent 
                Mahasiswa = {this.state.Mahasiswa}
                openDrawer = {this.state.openDrawer}
                ruangan = {this.state.ruangan}
                cariClick = {this.handleClickOpenDialog}
                button_name = "Lihat Jadwal" ></MainComponent>
            <FindDialogComponent
              Mahasiswa =  {this.state.Mahasiswa}
              open = {this.state.open}
              handleClose = {this.handleCloseDialog}></FindDialogComponent>
        </div>
        );
      }
    }
  }
}

export default MainMenu;
