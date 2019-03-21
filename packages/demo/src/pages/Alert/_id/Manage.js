import React from "react";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

export default ({ children }) => {
  const CloseHandle = () => {
    window.history.back();
  };
  return (
    <Dialog open={true}>
      <MuiDialogTitle>
        Alert Manage <span style={{ float: "right", marginLeft: "10px" }} onClick={CloseHandle}>x</span>
      </MuiDialogTitle>
      <MuiDialogContent>
        - put to sdt
        <br />
        - to to device
        <br />
        - add note
        <br />- ack
      </MuiDialogContent>
    </Dialog>
  );
};
