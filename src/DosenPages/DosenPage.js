 import React from 'react'
 import MainAppBar from '../Elements/MenuAppBar'
 import SwipeComponent from '../Elements/Swipe'
 import MainComponent from '../Views/MainMenuComponent.jsx'
 import Schedule from './DosenSchedule';
 import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classNames from "classnames";
import FindDialogComponent from '../Views/FindEmptyRoomDialog'

const style = theme =>({
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

 class DosenPage extends React.Component{

    constructor(props){
        super(props)

        this.state = {

            loading : true,
            kd_role : '',
            Actor : {},
            ruangan :[],
            open : false,
            anchorEl: null,
            openDialog : false,
            openDrawer : false,
            auth : true,
            error: null, errorInfo: null
        }
    }

    componentDidMount(){

        fetch("http://localhost:4001/api/allRuangan")
          .then(response => response.json())
          .then(json => {
            this.setState({
              ruangan: json.response,
              kd_role : this.props.location.state.kode,
            });
          });
        fetch("http://localhost:4001/api/getDosen/"+this.state.kd_role)
        .then(response => response.json())
        .then(json => {
            this.setState({
                Actor : json.response,
                loading : false
            });
        });
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


     render(){
        const {classes} = this.props;
        const openProf = Boolean(this.state.anchorEl);
        return(
            <div>
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
            [classes.contentShift]: this.state.openDrawer,
             })}>
                <SwipeComponent>
                    titleOne = {"Jadwal"}
                    titleTwo = {"Peminjaman"}
                    itemOne = {this.renderSchedule}
                    itemTwo = {this.renderMain}
                </SwipeComponent>
            </main>
         </div>
         )
     }

     renderMain = () =>{
        return( 
            <div>
                 <MainComponent 
                    Actor = {this.state.Actor}
                    ruangan = {this.state.ruangan}
                    cariClick = {this.handleClickOpenDialog}
                    button_name = "Lihat Jadwal" ></MainComponent>
                <FindDialogComponent
                    Actor =  {this.state.Actor}
                    open = {this.state.open}
                    handleClose = {this.handleCloseDialog}></FindDialogComponent>
            </div>
            )
     }

     renderSchedule = () => {
        return(<Schedule></Schedule>)
     }
 }

DosenPage.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
  
  export default withStyles(style)(DosenPage);
  