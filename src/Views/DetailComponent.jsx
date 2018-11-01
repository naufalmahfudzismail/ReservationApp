import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";
import green from "@material-ui/core/colors/green";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CheckoutComponent from '../Elements/CheckoutComponent'

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
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  card: {
    Width: 300
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  root: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    minHeight: 200
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
});

class Tablayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        namaDosen : ""
    }
  }

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  getDosen = (kode) => {
    fetch("http://localhost:4001/api/getNamaDosen/"+kode+"")
      .then(response => response.json())
      .then(json => {
        this.setState({
           namaDosen : json.response
        });
      });
    return this.state.namaDosen;
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <main className={classNames(classes.content, {
        [classes.contentShift]: !this.props.openDrawer,
      })}>
      <div className={classes.root}>
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              {" "}
              {this.props.kd_ruang}
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textSecondary"
              paragraph
            />
            <div className={classes.heroButtons}>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick = {this.props.pesanClick}>
                    Pinjam Ruangan 
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Lihat Jadwal Semester ini
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Senin" />
            <Tab label="Selasa" />
            <Tab label="Rabu" />
            <Tab label="Kamis" />
            <Tab label="Jumat" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Grid container spacing={40}>
              {this.props.senin.map((item, index) => (
                <Grid item key={index} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {item.kd_ruang}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {item.nm_jadwal}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {item.tgl}
                      </Typography>
                      <Typography component="p">
                        {item.jam_awal + " - " + item.jam_akhir}
                      </Typography>
                      <Typography component="p">
                       {item.nip}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Grid container spacing={40}>
              {this.props.selasa.map((item, index) => (
                <Grid item key={index} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {item.kd_ruang}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {item.nm_jadwal}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {item.tgl}
                      </Typography>
                      <Typography component="p">
                        {item.jam_awal + " - " + item.jam_akhir}
                        <br />
                        {item.kd_dosen}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Grid container spacing={40}>
              {this.props.rabu.map((item, index) => (
                <Grid item key={index} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {item.kd_ruang}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {item.nm_jadwal}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {item.tgl}
                      </Typography>
                      <Typography component="p">
                        {item.jam_awal + " - " + item.jam_akhir}
                        <br />
                        {item.kd_dosen}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Grid container spacing={40}>
              {this.props.kamis.map((item, index) => (
                <Grid item key={index} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {item.kd_ruang}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {item.nm_jadwal}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {item.tgl}
                      </Typography>
                      <Typography component="p">
                        {item.jam_awal + " - " + item.jam_akhir}
                        <br />
                        {item.kd_dosen}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Grid container spacing={40}>
              {this.props.jumat.map((item, index) => (
                <Grid item key={index} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardContent>
                      <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                      >
                        {item.kd_ruang}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {item.nm_jadwal}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {item.tgl}
                      </Typography>
                      <Typography component="p">
                        {item.jam_awal + " - " + item.jam_akhir}
                        <br />
                        {item.kd_dosen}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabContainer>
        </SwipeableViews>
      </div>
      </main>
    );
  }
}

Tablayout.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Tablayout);
