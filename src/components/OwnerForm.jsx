import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  FormHelperText,
} from '@mui/material';
import {createOwner} from '../api/owners'

const phoneRegex = /^\+?1?\d{9,15}$/;

const OwnerForm = ({ onSubmit }) => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });

  const [formErrors, setFormErrors] = useState({
    phoneNumber: '',
  });
  

  const handleChange = (e) => {
    if (e.target.name === 'fullName') {
      setFormValues({ ...formValues, fullName: e.target.value });
    } else if (e.target.name === 'phoneNumber') {
      setFormValues({ ...formValues, phoneNumber: e.target.value });
      setFormErrors({
        phoneNumber:
          !phoneRegex.test(e.target.value) && e.target.value.length > 0
            ? 'Phone number must be entered in the format: +999999999. Up to 15 digits allowed.'
            : '',
      });
    } else if (e.target.name === 'email') {
      setFormValues({ ...formValues, email: e.target.value });
    } 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName: full_name, phoneNumber: phone_number, email } = formValues;
      try {
        const response = await createOwner({ full_name, phone_number, email });
        console.log(`Owner Created: ${response.data}`);
      }catch(error){
        console.error(error);
      }
    onSubmit(formValues);
  };

  return (
    <Box component="form" id="owner-form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="fullName"
        label="Full Name"
        name="fullName"
        autoComplete="fullName"
        autoFocus
        value={formValues.fullName}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        fullWidth
        id="phoneNumber"
        label="Phone Number"
        name="phoneNumber"
        autoComplete="phoneNumber"
        value={formValues.phoneNumber}
        onChange={handleChange}
        error={!!formErrors.phoneNumber}
        helperText={formErrors.phoneNumber}
      />
      <TextField
        margin="normal"
        fullWidth
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        value={formValues.email}
        onChange={handleChange}
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default OwnerForm;