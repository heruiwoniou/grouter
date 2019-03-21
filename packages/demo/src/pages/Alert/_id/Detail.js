import React from "react";
import { navigate } from "@reach/router"

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

import Button from '@material-ui/core/Button';

export default ({ id, children }) => {
  const CloseHandle = () => {
    window.history.back();
  };
  return (
    <Dialog open={true}>
      <MuiDialogTitle>
        Alert {id} Detail <span style={{ float: "right", marginLeft: "10px" }} onClick={CloseHandle} >x</span>
      </MuiDialogTitle>
      <MuiDialogContent>
        <h3>Alert Info</h3>
      </MuiDialogContent>
      <MuiDialogActions>
        <Button onClick={()=> navigate('Manage')} color="primary">
          Edit
        </Button>
      </MuiDialogActions>
    </Dialog>
  );
};
