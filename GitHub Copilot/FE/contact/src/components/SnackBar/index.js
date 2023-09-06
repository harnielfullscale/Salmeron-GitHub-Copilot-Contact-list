//  Create a snackbar component using mui

// Path: contact/src/components/snackBar/index.js

import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const SnackBar = ({ open, setOpen, message, severity }) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(null);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
