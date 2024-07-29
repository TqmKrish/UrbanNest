import { Alert, Snackbar } from "@mui/material";
import React from "react";
const SnackbarComponent = ({
  open,
  onClose,
  type,
  content,
  autoHideDuration = 6000,
}: any) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      message={content}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {content}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
