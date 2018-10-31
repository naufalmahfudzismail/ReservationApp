import React from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Redirect from "react-router-dom/Redirect";
import { withAlert } from "react-alert";
import autoBind from 'react-autobind'

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this)
    this.state = {
      nim: "",
      password: "",
      nama: "",
      kelas: "",
      authenticated: false,
      result: "",
      loading : false
    };
    this.handleClicklogin.bind(this);
    this.handleChange.bind(this);
  }

  handleClicklogin(){
    fetch("http://localhost:4001/api/logMahasiswa", {
      method: "POST",
      body: JSON.stringify({
        kode: this.state.nim,
        password: this.state.password
      }),
      headers: { "Content-type": "application/json" }
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          result: json.success,
          loading : true
        });
      });

      if(this.state.result === "login sucessfull" && this.state.loading){
        this.props.alert.success(this.state.result);
        this.setState({
          authenticated : true
        })
      }
      else if (this.state.loading){
        this.props.alert.error(this.state.result);
        this.setState({
          authenticated : false
        })
      }   
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClickDosen = () => {};

  render() {
    if (this.state.authenticated) {
      return <Redirect to={{pathname:"/mainmenu", state : {kode : this.state.nim}}} />;
    }
    const { classes } = this.props;
    return ( 
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required fullWidth>
                <InputLabel>Nomor Induk</InputLabel>
                <Input
                  id="email"
                  name="nim"
                  type="text"
                  onChange={this.handleChange("nim")}
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel>Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange("password")}
                />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleClicklogin}
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

LoginComponent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAlert(withStyles(styles)(LoginComponent));
