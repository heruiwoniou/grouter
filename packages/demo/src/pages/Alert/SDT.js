import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

export default ({ children }) => {
  const handleClose = () => {
    window.history.back();
  };
  return (
    <Dialog open={true}>
      <MuiDialogTitle onClose={handleClose}>
        Alert SDT Manager Page
        <span style={{ float: "right" }} onClick={handleClose}>
          X
        </span>
      </MuiDialogTitle>
      <MuiDialogContent>
        <div className="alert-sdt-content">{children}</div>
      </MuiDialogContent>
    </Dialog>
  );
};
