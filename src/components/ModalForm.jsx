import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  TextField
} from '@mui/material';

const styles = {
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: 'white',
    borderRadius: 5,
    boxShadow: '0 3px 5px 0 rgba(0, 0, 0, 0.08)',
    p: 4,
  },
};

const ModalForm = ({
  open,
  onClose,
  onSubmit,
  form: { title, fields, submitHandler },
}) => {
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (submitHandler) {
      onSubmit(submitHandler(formValues));
    }
  };

  useEffect(() => {
    // Fetch data for the form based on the submitHandler, if it's not a create/new request.
    if (submitHandler && !formValues.id) {
      // Call the function to fetch the initial data if it's an existing record
      submitHandler().then((response) => {
        setFormValues(response.data);
      });
    }
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={styles.paper}>
        <Typography variant="h5" gutterBottom>
          {formValues.id ? 'Update' : 'Create'} {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {fields.map((field) => (
              <Grid item xs={12} key={field.name}>
                <TextField
                  label={field.label}
                  name={field.name}
                  type={field.type || 'text'}
                  value={formValues[field.name]}
                  onChange={handleInputChange}
                  fullWidth
                  required={field.required}
                  InputProps={field.inputProps}
                />
              </Grid>
            ))}
          </Grid>
          <Box mt={2} textAlign="right">
            <Button type="submit" color="primary" variant="contained">
              {formValues.id ? 'Update' : 'Create'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalForm;
