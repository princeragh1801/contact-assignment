import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { addContact, updateContact } from '../services/contactService';
import { CircularProgress } from '@mui/material';
import toast from 'react-hot-toast';

export default function EditModal({ setOpen, open, contact = null, setConfirmOperation }) {
  const isEditMode = contact !== null;
  const [loading, setLoading] = React.useState(false)
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      setLoading(true)
      const formData = new FormData(event.currentTarget);
      const formJson = Object.fromEntries(formData.entries());
      let response;
      if(isEditMode) {
        response = await updateContact(contact._id, formJson); // `contact.id` assumes your contact object has an `id`
        console.log("Update Response: ", response);
      } else {
        response = await addContact(formJson);
        console.log("Add Response: ", response);
      }

      if(response.status) {
        setConfirmOperation(true)
        setOpen(false); // Close modal on successful response
        toast.success(response.message)
      }else{
        toast.error(response.message)
      }

    } catch (error) {
      console.error("Error occurred while submitting the data: ", error);
      toast.error(error.message);
    }finally{
      setLoading(false)
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ component: 'form', onSubmit: handleSubmit }}>
      <DialogTitle>{isEditMode ? "Edit" : "Add"} Information</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={contact ? contact.firstName : ""}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              margin="dense"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={contact ? contact.lastName : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              defaultValue={contact ? contact.email : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              margin="dense"
              id="phoneNumber"
              name="phoneNumber"
              label="Phone Number"
              type="tel"
              fullWidth
              variant="outlined"
              defaultValue={contact ? contact.phoneNumber : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              margin="dense"
              id="company"
              name="company"
              label="Company"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={contact ? contact.company : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              margin="dense"
              id="jobTitle"
              name="jobTitle"
              label="Job Title"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={contact ? contact.jobTitle : ""}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={loading} type="submit" variant="outlined" color="success">
          {loading 
            ? <CircularProgress size="20px" /> 
            : (isEditMode ? 'Update' : 'Add')
          }
        </Button>
      </DialogActions>
    </Dialog>
  );
}
