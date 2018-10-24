import React from 'react';
import PropTypes from "prop-types";
import classNames from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import MainAppBar from "../Elements/MenuApp";
import { Link } from "react-router-dom";
import CheckoutComponent from '../Views/CheckoutComponent'

const styles = theme => ({
    appBar: {
      position: "relative"
    },
    icon: {
      marginRight: theme.spacing.unit * 2
    },
    heroUnit: {
      backgroundColor: theme.palette.background.paper
    },
    heroContent: {
      maxWidth: 600,
      margin: "0 auto",
      padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
    },
    heroButtons: {
      marginTop: theme.spacing.unit * 4
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
        width: 1100,
        marginLeft: "auto",
        marginRight: "auto"
      }
    },
    cardGrid: {
      padding: `${theme.spacing.unit * 8}px 0`
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    cardMedia: {
      paddingTop: "56.25%" // 16:9
    },
    cardContent: {
      flexGrow: 1
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing.unit * 6
    },
  
    submit: {
      justifyContent: "center"
    }
  });


class Result extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            nim : '',
            ruangan :[],
            namaRuangan : '',
            open : false
        }

        this.handleClickOpen.bind(this);
    }

    componentDidMount(){
    
        fetch("http://localhost:4001/api/cariRuangan/"+this.props.match.params.date+"/"+this.props.match.params.start_time+"/"+this.props.match.params.end_time)
          .then(response => response.json())
          .then(json => {
            this.setState({
              ruangan: json.response
            });
          });
    }

    handleClickOpen = (roomName) => {
      this.setState({ 
          open: true,
          namaRuangan : roomName
         });
      };
  
    handleClose = () => {
      this.setState({ 
        open: false, 
         namaRuangan : '' 
      });
    };
    


    render(){
    const {classes} = this.props

    if(this.state.ruangan.lenght != 0){
                  return( <div className = "App">
                          <MainAppBar />
                          <main>
                            
                              <div className={classes.heroUnit}>
                              <div className={classes.heroContent}>
                                  <Typography
                                  variant="h6"
                                  align="center"
                                  color="textSecondary"
                                  paragraph
                                  >
                                  Ruangan kosong pada
                                  </Typography>
                                  <Typography
                                  variant="h6"
                                  align="center"
                                  color="textPrimary"
                                  gutterBottom
                                  >
                                  {this.props.match.params.date}, {this.props.match.params.start_time} - {this.props.match.params.end_time}
                                  </Typography>
                              </div>
                              </div>
                              <div className={classNames(classes.layout, classes.cardGrid)}>
            
                              <Grid container spacing={40}>
                                  {this.state.ruangan.map((item, index) => (
                                  <Grid item key={index} sm={7} md={5} lg={4}>
                                      <Card className={classes.card}>
                                      <CardMedia
                                          className={classes.cardMedia}
                                          image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
                                          title="Image title"
                                      />
                                      <CardContent className={classes.cardContent}>
                                          <Typography gutterBottom variant="h5" component="h2">
                                          {item.kd_ruang}
                                          </Typography>
                                          <Typography>{item.nm_ruang}</Typography>
                                      </CardContent>
                                      <CardActions className={classes.submit}>
                                          <Button color="primary" variant="contained" onClick = {() =>this.handleClickOpen(item.kd_ruang)}>
                                              Pinjam Ruangan
                                          </Button>
                                      </CardActions>
                                      </Card>
                                  </Grid>
                                  ))}
                              </Grid>
                              </div>
                          </main>
                         
                          <footer className={classes.footer}>
                              <Typography variant="h6" align="center" gutterBottom>
                              Footer
                              </Typography>
                              <Typography
                              variant="subtitle1"
                              align="center"
                              color="textSecondary"
                              component="p"
                              >
                              Something here to give the footer a purpose!
                              </Typography>
                          </footer>
                          }
                 
                    <CheckoutComponent
                    handleClose = {this.handleClose}
                    date = {this.props.match.params.date}
                    start_time = {this.props.match.params.start_time}
                    end_time = {this.props.match.params.end_time}
                    nim = {this.props.match.params.nim}
                    open = {this.state.open}
                    kd_ruang = {this.state.namaRuangan}
                    
                    ></CheckoutComponent>
                    </div>)
          }
          else{
                return( <div>
                  <MainAppBar />
                  <main>
                     
                      <div className={classes.heroUnit}>
                      <div className={classes.heroContent}>
                          <Typography
                          variant="h6"
                          align="center"
                          color="textSecondary"
                          paragraph
                          >
                          Ruangan kosong pada
                          </Typography>
                          <Typography
                          variant="h6"
                          align="center"
                          color="textPrimary"
                          gutterBottom
                          >
                          {this.props.match.params.date}, {this.props.match.params.start_time} - {this.props.match.params.end_time}
                          </Typography>
                      </div>
                      </div>
                      <div className={classNames(classes.layout, classes.cardGrid)}>
                      <Typography component="h2" variant="display2"  align = "center" gutterBottom>
                         Oops, Tidak ada Ruangan yang tersedia :(
                        </Typography>
                      </div>
                  </main>
              
                  <footer className={classes.footer}>
                      <Typography variant="h6" align="center" gutterBottom>
                      Footer
                      </Typography>
                      <Typography
                      variant="subtitle1"
                      align="center"
                      color="textSecondary"
                      component="p"
                      >
                      Something here to give the footer a purpose!
                      </Typography>
                  </footer>
                  }
           
            <CheckoutComponent
            handleClose = {this.handleClose}
            date = {this.props.match.params.date}
            start_time = {this.props.match.params.start_time}
            end_time = {this.props.match.params.end_time}
            nim = {this.props.match.params.nim}
            open = {this.state.open}
            kd_ruang = {this.state.namaRuangan}
            
            ></CheckoutComponent>
            </div>)

          }
    }
}

Result.propTypes = {
    classes: PropTypes.object.isRequired
  };
  
export default withStyles(styles)(Result);