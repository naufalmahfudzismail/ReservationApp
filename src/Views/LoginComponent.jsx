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
import Redirect from 'react-router-dom/Redirect';

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

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nim: "",
      password: "",
      nama: "",
      kelas: "",
      authenticated : false
    };
    this.handleClicklogin.bind(this);
    this.handleChange.bind(this);
  }

  handleClicklogin = () =>{
    fetch(
      "http://localhost:4001/api/logMahasiswa/" +
        this.state.nim +
        "/" +
        this.state.password
    )
      .then(response => response.json())
      .then(json => {
        this.setState({
          nim: json.response.kd_role
        });
      });

    if (this.state.nim.length == 0) {
      alert("NIM atau Password salah!");
    } else {
      fetch("http://localhost:4001/api/getMahasiswa/" + this.state.nim)
        .then(response => response.json())
        .then(json => {
          this.setState({
            nama: json.response.nm_mhs,
            kelas: json.response.kd_kelas,
          });
        });

        fakeAuth.authenticate(() => {
          this.setState({ authenticated: true });
        });
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
      return <Redirect to={'/MainMenu'} />;
    }

    console.log(this.state.nim)
    console.log(this.state.authenticated)

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
                <InputLabel>Email Address</InputLabel>
                <Input 
                id="email" 
                name="nim" 
                type ="text"
                onChange = {this.handleChange("nim")}
                autoFocus required
                />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel >Password</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange ={this.handleChange("password")}
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
                onClick = {this.handleClicklogin}
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

export default withStyles(styles)(LoginComponent);
