import React, { Component } from 'react';
import './App.css';
import MainComponent from '../Views/MainMenuComponent.jsx'
import FindDialogComponent from '../Views/FindEmptyRoomDialog'
import MainAppBar from '../Elements/MenuAppBar'
import ProgressBar from '../Elements/ProgresBar'
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classNames from "classnames";

const styles = theme =>({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 240,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
})

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Actor : {},
          kd_role :'',
          ruangan: [],
          open : false,
          loading : true,
          anchorEl: null,
          openDialog : false,
          openDrawer : false,
          auth : true,
          error: null, errorInfo: null
        };
      }

      componentDidMount() {
        //ajax call
        fetch("http://localhost:4001/api/allRuangan")
          .then(response => response.json())
          .then(json => {
            this.setState({
              ruangan: json.response,
              kd_role : this.props.location.state.kode,
            });
          });

          fetch("http://localhost:4001/api/getMahasiswa/"+ this.props.location.state.kode)
          .then(response => response.json())
          .then(json => {
            this.setState({
              Actor : json.response,
              loading : false
            });
          });
      };

      componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
          error: error,
          errorInfo: errorInfo
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

      console.log(this.state.Actor)
      const openProf = Boolean(this.state.anchorEl);
      const { classes } = this.props;

      if (this.state.errorInfo) {
        // Error path
        return (
          <div>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
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
                Actor = {this.state.Actor}
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
          <main  className={classNames(classes.content, {
            [classes.contentShift]: !this.state.openDrawer,
          })}> {'handle content when open / close drawer'}
          <MainComponent 
                Actor = {this.state.Actor}
                ruangan = {this.state.ruangan}
                cariClick = {this.handleClickOpenDialog}
                button_name = "Lihat Jadwal" ></MainComponent>
            <FindDialogComponent
              Actor =  {this.state.Actor}
              open = {this.state.open}
              handleClose = {this.handleCloseDialog}></FindDialogComponent>
              </main>
        </div>
        );
      }
    }
  }
}

MainMenu.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(MainMenu);
