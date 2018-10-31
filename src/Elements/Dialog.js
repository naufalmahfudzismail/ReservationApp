import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';

class AlertDialog extends React.Component {

  render() {
    return (
      <div>
        <Dialog open = {true}>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            <Typography color="textSecondary" variant="h2"align= "center" gutterBottom>
             {this.props.text}
             </Typography>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;