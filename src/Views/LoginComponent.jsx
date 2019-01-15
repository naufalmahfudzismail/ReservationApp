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
import autoBind from "react-autobind";

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
    autoBind(this);
    this.state = {
      kd_role: "",
      password: "",
      nama: "",
      kelas: "",
      authenticatedMahasiswa: false,
      authenticatedDosen : false,
      result: "",
      loading: false
    };
    this.handleClickMahasiswa.bind(this);
    this.handleClickDosen.bind(this);
    this.handleChange.bind(this);
  }

  handleClickMahasiswa  = async () => {
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        kode: this.state.kd_role,
        password: this.state.password
      })
    };
    const responses = await fetch("http://localhost:4001/api/logMahasiswa", settings)
    .then(response => response.json())
    .then(json => {
      this.setState({
        result: json.success,
        loading: true
      });
    }).catch(e => {
      return e
  });

    if (this.state.result === "login berhasil" && this.state.loading) {
      this.props.alert.success(this.state.result);
      this.setState({
        authenticatedMahasiswa: true
      });
    } else if (this.state.loading) {
      this.props.alert.error(this.state.result);
      this.setState({
        authenticatedMahasiswa: false
      });
    }

    return responses;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleClickDosen = async() => {    // Asynchronus Request
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        kode: this.state.kd_role,
        password: this.state.password
      })
    };
    const responses = await fetch("http://localhost:4001/api/logDosen", settings)
    .then(response => response.json())
    .then(json => {
      this.setState({
        result: json.success,
        loading: true
      });
    }).catch(e => {
      return e
  });

    if (this.state.result === "login berhasil" && this.state.loading) {
      this.props.alert.success(this.state.result);
      this.setState({
        authenticatedDosen: true
      });
    } else if (this.state.loading) {
      this.props.alert.error(this.state.result);
      this.setState({
        authenticatedDosen: false
      });
    }

    return responses;

  };

  render() {
    if (this.state.authenticatedMahasiswa) {
      return (
        <Redirect
          to={{ pathname: "/mainmenu", state: { kode: this.state.kd_role } }}
        />
      );
    }
    else if(this.state.authenticatedDosen){
      return (
        <Redirect
          to={{ pathname: "/dosen", state: { kode: this.state.kd_role } }}
        />
      );
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
                  name="kd_role"
                  type="text"
                  onChange={this.handleChange("kd_role")}
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
                onClick={this.handleClickMahasiswa}
                className={classes.submit}
              >
                Masuk sebagai Mahasiswa
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={this.handleClickDosen}
                className={classes.submit}
              >
                Masuk sebagai Dosen
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
