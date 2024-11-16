import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CircularProgress } from '@mui/material';

export default function ConfirmDialog({open, setOpen, onConfirm}) {
  const [loading, setLoading] = React.useState(false)
  const handleClose = () => {
    setOpen(false);
    setLoading(false)
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Confirmation"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' onClick={handleClose}>Close</Button>
          <Button color='warning' variant='outlined' onClick={onConfirm} autoFocus>
            {
              loading ? <CircularProgress size="20px"/> : "Confirm"
            }
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
