import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import purple from '@material-ui/core/colors/purple';
import classNames from "classnames";

const styles = theme => ({
  progress: {
    width : 600,
    Height : 600,
    marginTop: theme.spacing.unit * 20,
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

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <div>
      <main className={classNames(classes.content, {
            [classes.contentShift]: !props.openDrawer,
          })}>
      <CircularProgress className={classes.progress} style={{ color: purple[500] }} thickness={20} />
      </main>
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);