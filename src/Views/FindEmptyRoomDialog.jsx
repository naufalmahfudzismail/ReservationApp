import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginTop :theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 600
  },

});

class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "",
      start_time: "",
      end_time: ""
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const enabled = this.state.date.lenght > 0 && this.state.start_time.lenght >0 && this.state.end_time.lenght>0;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Cari Ruangan Kosong</DialogTitle>
          <DialogContent>
            <div>
              <form className={classes.container} noValidate>
                <TextField
                  name="date"
                  label="Pada Tanggal"
                  type="date" required
                  onChange={this.handleChange('date')}
                  defaultValue={Date.now()}
                  variant="outlined"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  name="start_time"
                  label="Pada Waktu mulai"
                  type="time" required
                  onChange={this.handleChange('start_time')}
                  defaultValue="00:00"
                  variant="outlined"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 300 // 5 min
                  }}
                />
                <TextField
                  name="end_time"
                  label="Pada Waktu Akhir"
                  type="time" required
                  onChange={this.handleChange('end_time')}
                  defaultValue="00:00"
                  variant="outlined"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  inputProps={{
                    step: 300 // 5 min
                  }}
                />
              </form>
            </div>
          </DialogContent>
          <DialogActions>
            <Button name= "button cancel" onClick={this.props.handleClose}  color="primary">  
              Cancel 
            </Button>
            <Link to={'/result/'+this.state.date+'/'+this.state.start_time+'/'+this.state.end_time} style={{ textDecoration: 'none' }}>
            <Button name = "Button Submit" color="primary" variant="contained">
              Submit
            </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FormDialog);
