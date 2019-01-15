import React from 'react'
import MainAppBar from '../Elements/MenuAppBar'
import MainComponent from '../Views/MainMenuComponent.jsx'
import Schedule from './DosenSchedule';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import classNames from "classnames";
import FindDialogComponent from '../Views/FindEmptyRoomDialog'
import ProgressBar from '../Elements/ProgresBar'
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const style = theme =>({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -240,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    minHeight: 200,
  }
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
      error: null, errorInfo: null,
      value : 0
  }
}

componentDidMount(){

  fetch("http://localhost:4001/api/allRuangan")
    .then(response => response.json())
    .then(json => {
      this.setState({
        ruangan: json.response,
      });
    });
  fetch("http://localhost:4001/api/getDosen/"+this.props.location.state.kode)
  .then(response => response.json())
  .then(json => {
      this.setState({
          Actor : json.response,
          loading : false
      });
  });
};

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

handleChangeTab = (event, value) => {
  this.setState({ value });
};

handleChangeTabIndex = index => {
  this.setState({ value: index });
};


render(){
  console.log(this.state.Actor)
  console.log(this.state.ruangan)
  const {classes, theme} = this.props;
  const openProf = Boolean(this.state.anchorEl);

  if( this.state.loading ){
    return (
      <div className = "App">
      < ProgressBar openDrawer = {this.state.openDrawer}></ProgressBar>
      </div>
    )
  }
  else{
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
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label="Jadwal" />
                <Tab label="Peminjaman ruangan"/>
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeTabIndex}
            >
              <TabContainer dir={theme.direction}>
                  <MainComponent 
                    Actor = {this.state.Actor}
                    ruangan = {this.state.ruangan}
                    cariClick = {this.handleClickOpenDialog}
                    button_name = "Lihat Jadwal" >
                  </MainComponent>
                  <FindDialogComponent
                    Actor =  {this.state.Actor}
                    open = {this.state.open}
                    handleClose = {this.handleCloseDialog}>
                  </FindDialogComponent>
              </TabContainer>
                <TabContainer dir={theme.direction}> 
                <Schedule></Schedule>
                </TabContainer>
            </SwipeableViews>
        </div>
      </main>
    </div>
    )
      }
    }
 }

DosenPage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };
  
  
  export default withStyles(style, { withTheme: true })(DosenPage);
  