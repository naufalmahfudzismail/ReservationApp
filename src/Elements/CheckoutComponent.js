import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dateformat from 'dateformat';
import { withAlert } from "react-alert";
import DialogAlert from './DialogAlert'

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500
  }
});

class FormDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Mahasiswa : {},
      nm_jadwal: "",
      date: "",
      start_time: "",
      end_time: "",
      tujuan: "",
      kd_ruang: "",
      hari: "",
      result: ""
    };
  }

  componentDidMount(){
    this.setState({
      Mahasiswa : this.props.Mahasiswa,
      kd_ruang : this.props.kd_ruang,
      date : this.props.date,
      start_time : this.props.start_time,
      end_time : this.props.end_time
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  }; 


  handleClickSubmit = async() => {
    var responses;
    if (this.state.nm_jadwal.length === 0 || this.state.tujuan.length === 0) {
     alert("Semua data harus di isi");
    } else {
      responses = await fetch("http://localhost:4001/api/addPeminjaman", {
        method: "POST",
        body: JSON.stringify({
          kd_role: this.state.Mahasiswa[0].NIM,
          nm_jadwal: this.state.nm_jadwal,
          tgl: this.state.date,
          jam_pinjam: this.state.start_time,
          jam_selesai: this.state.end_time,
          tujuan: this.state.tujuan,
          kd_ruang: this.props.kd_ruang,
          hari: dateformat(this.state.date, "dddd")
        }),
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      })
        .then(response => response.json())
        .then(json => {
          this.setState({
            result: json.success
          });
        });

        alert("Permintaan Peminjaman ruangan berhasi dikirim");
        this.props.handleClose();
      }

      return responses;
  };

  render() {
    dateformat.i18n = {
      dayNames: [
          'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
          'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'
      ],
      monthNames: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
      ],
      timeNames: [
          'a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM'
      ]
  };
    console.log(this.state.Mahasiswa)
    const { classes } = this.props;
    console.log(dateformat(this.props.date, "dddd"));

    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form className={classes.container} onSubmit={this.hand}>
            <DialogTitle id="form-dialog-title" align="center">
              Pemesanan Ruangan {this.props.kd_ruang}
            </DialogTitle>
            <DialogContent>
              <div>
                <TextField
                  disabled={this.props.disableInput}
                  name="date"
                  label="Pada Tanggal"
                  type="date"
                  onChange={this.handleChange("date")}
                  defaultValue={this.props.date}
                  value={this.state.tgl}
                  variant="outlined"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
                <TextField
                  disabled={this.props.disableInput}
                  name="start_time"
                  label="Pada Waktu mulai"
                  type="time"
                  onChange={this.handleChange("start_time")}
                  defaultValue={this.props.start_time}
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
                  disabled={this.props.disableInput}
                  name="end_time"
                  label="Pada Waktu Akhir"
                  type="time"
                  onChange={this.handleChange("end_time")}
                  defaultValue={this.props.end_time}
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
                  name="nm_jadwal"
                  label="tujuan anda"
                  type="text"
                  required
                  onChange={this.handleChange("nm_jadwal")}
                  variant="outlined"
                  className={classes.textField}
                />

                <TextField
                  margin="normal"
                  id="outlined-multiline-static"
                  rows="4"
                  name="tujuan"
                  label="Keterangan tujuan anda"
                  type="text"
                  required
                  onChange={this.handleChange("tujuan")}
                  variant="outlined"
                  className={classes.textField}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                name="button cancel"
                onClick={this.props.handleClose}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                name="Button Submit"
                color="primary"
                variant="contained"
                onClick={this.handleClickSubmit}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

FormDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withAlert(withStyles(styles)(FormDialog));
