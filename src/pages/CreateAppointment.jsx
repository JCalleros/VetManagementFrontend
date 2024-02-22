import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert'
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import dayjs from 'dayjs';

const speciesOptions = ['Dog', 'Cat', 'Bird', 'Reptile', 'Small Mammal'];

const StyledButton = styled(Button)({
  marginTop: '20px',
});

const CreateAppointment = () => {
  const [formData, setFormData] = useState({
    patient: '',
    owner: '',
    species: '',
    reason: '',
    appointmentTime: new Date(),
  });
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSpeciesChange = (event, value) => {
    setFormData({ ...formData, species: value });
  };

  const handleDateTimeChange = (newDate) => {
    setFormData({ ...formData, appointmentTime: newDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission logic (replace with actual API call)
    setTimeout(() => {
      setSubmitSuccess(true);
      setOpenConfirmation(false);
    }, 1000);
  };

  const handleConfirmation = () => {
    // Perform form validation
    if (formData.patient && formData.owner && formData.species && formData.reason) {
      setOpenConfirmation(true);
    } else {
      alert('Please fill out all required fields.');
    }
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create New Appointment
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="patient"
              label="Patient Name"
              variant="outlined"
              fullWidth
              required
              value={formData.patient}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="owner"
              label="Owner Name"
              variant="outlined"
              fullWidth
              required
              value={formData.owner}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              name="species"
              options={speciesOptions}
              fullWidth
              renderInput={(params) => <TextField {...params} label="Species" variant="outlined" required />}
              value={formData.species}
              onChange={handleSpeciesChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="reason"
              label="Reason for Appointment"
              variant="outlined"
              fullWidth
              required
              multiline
              rows={3}
              value={formData.reason}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                label="Appointment Time"
                value={dayjs(formData.appointmentTime)}
                onChange={handleDateTimeChange}
                renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <StyledButton variant="contained" color="primary" fullWidth onClick={handleConfirmation}>
              Create Appointment
            </StyledButton>
          </Grid>
        </Grid>
      </form>
      <Dialog open={openConfirmation} onClose={handleCloseConfirmation}>
        {/* Dialog content for confirmation */}
      </Dialog>
      {submitSuccess && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Appointment created successfully!
        </Alert>
      )}
    </Container>
  );
};

export default CreateAppointment;
