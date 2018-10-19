import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
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
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      ruangan: []
    };
  }

  componentDidMount() {
    //ajax call
    fetch("http://localhost:4001/api/allRuangan")
      .then(response => response.json())
      .then(json => {
        this.setState({
          ruangan: json.response
        });
      });
  }

  renderRuangan(item, index){
    return <Grid item key={index} sm={6} md={4} lg={3}>
    <Card>
      <CardMedia
        image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
        title={item.kd_ruang}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        {item.kd_ruang}
        </Typography>
        <Typography>
        {item.nm_ruang}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" variant="contained">
          Lihat Jadwal
        </Button>
      </CardActions>
    </Card>
  </Grid>
  }
  render() {
    console.log(this.state.ruangan)
    return (
      <div styles = {style.border}>
          <Grid container spacing={40}>
            {this.state.ruangan.map(this.renderRuangan)}
          </Grid>
      </div>
    );
  }
}

const style = {
   nani : {

        margin : 20,
        justifyContent : "center",
        alignItems : "center",
        display : "flex"
    },

    border :{
        JustifyContent : "center",
        alignItems : "center",
        display : "flex"
    }
}

export default Main;
