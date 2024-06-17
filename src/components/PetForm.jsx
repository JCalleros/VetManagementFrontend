import React, { useState, useEffect } from 'react';
import {
  Modal, Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Typography,
  CircularProgress, Stepper, Step, StepLabel, Snackbar, IconButton, Chip
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { usePets } from '../store/pets/usePets';
import { useOwners } from '../store/owners/useOwners';

const speciesOptions = ['Dog', 'Cat'];
const sexOptions = ['M', 'F'];

const steps = ['Pet Details', 'Owner Details', 'Review'];

const PetForm = ({ open, onClose, pet, onSave }) => {
  const { owners, loading, handleAddOwner } = useOwners();
  const [formValues, setFormValues] = useState(getInitialFormValues(pet));
  const [newOwner, setNewOwner] = useState(getInitialNewOwnerValues());
  const [creatingOwner, setCreatingOwner] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    setFormValues(getInitialFormValues(pet));
  }, [pet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleOwnerChange = (e) => {
    setFormValues((prev) => ({ ...prev, owners: e.target.value }));
  };

  const handleNewOwnerChange = (e) => {
    const { name, value } = e.target;
    setNewOwner((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setFormValues((prev) => ({ ...prev, photo: e.target.files[0] }));
  };

  const handleCreateOwner = async () => {
    try {
      const createdOwner = await handleAddOwner(newOwner);
      setFormValues((prev) => ({ ...prev, owners: [...prev.owners, createdOwner.id] }));
      setCreatingOwner(false);
      setNewOwner(getInitialNewOwnerValues());
      setSnackbar({ open: true, message: 'Owner created successfully!', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to create owner!', severity: 'error' });
    }
  };

  const handleRemoveOwner = (ownerId) => {
    setFormValues((prev) => ({
      ...prev,
      owners: prev.owners.filter((id) => id !== ownerId),
    }));
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(activeStep)) {
      onSave(formValues);
      onClose();
    }
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = 'This field is required';
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateStep = (step) => {
    let valid = true;
    const requiredFields = step === 0
      ? ['name', 'species', 'sex']
      : step === 1 && creatingOwner
      ? ['full_name', 'phone_number']
      : [];
    requiredFields.forEach((field) => {
      if (!formValues[field]) {
        setErrors((prev) => ({ ...prev, [field]: 'This field is required' }));
        valid = false;
      }
    });
    return valid;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Pet Name"
                fullWidth
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.species}>
                <InputLabel>Species</InputLabel>
                <Select
                  name="species"
                  value={formValues.species}
                  onChange={handleChange}
                >
                  {speciesOptions.map((species) => (
                    <MenuItem key={species} value={species}>{species}</MenuItem>
                  ))}
                </Select>
                <Typography variant="body2" color="error">{errors.species}</Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required error={!!errors.sex}>
                <InputLabel>Sex</InputLabel>
                <Select
                  name="sex"
                  value={formValues.sex}
                  onChange={handleChange}
                >
                  {sexOptions.map((sex) => (
                    <MenuItem key={sex} value={sex}>{sex === 'M' ? 'Male' : 'Female'}</MenuItem>
                  ))}
                </Select>
                <Typography variant="body2" color="error">{errors.sex}</Typography>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Breed"
                fullWidth
                name="breed"
                value={formValues.breed}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Color"
                fullWidth
                name="color"
                value={formValues.color}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Age (Years)"
                fullWidth
                name="age_years"
                value={formValues.age_years}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Age (Months)"
                fullWidth
                name="age_months"
                value={formValues.age_months}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Age (Weeks)"
                fullWidth
                name="age_weeks"
                value={formValues.age_weeks}
                onChange={handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="photo-upload"
                type="file"
                onChange={handlePhotoChange}
              />
              <label htmlFor="photo-upload">
                <Button variant="contained" component="span">
                  Upload Photo
                </Button>
              </label>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Owner</InputLabel>
                <Select
                  name="owners"
                  value={formValues.owners}
                  onChange={handleOwnerChange}
                  multiple
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((id) => {
                        const owner = owners.find((owner) => owner.id === id);
                        return owner ? (
                          <Chip
                            key={id}
                            label={owner.full_name}
                            onDelete={() => handleRemoveOwner(id)}
                          />
                        ) : null;
                      })}
                    </Box>
                  )}
                >
                  {owners.map((owner) => (
                    <MenuItem key={owner.id} value={owner.id}>{owner.full_name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {creatingOwner ? (
              <OwnerForm
                newOwner={newOwner}
                errors={errors}
                handleNewOwnerChange={handleNewOwnerChange}
                handleCreateOwner={handleCreateOwner}
                setCreatingOwner={setCreatingOwner}
              />
            ) : (
              <Grid item xs={12}>
                <Button variant="outlined" onClick={() => setCreatingOwner(true)}>
                  Add New Owner
                </Button>
              </Grid>
            )}
          </Grid>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Review</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Pet Name:</strong> {formValues.name}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Species:</strong> {formValues.species}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Sex:</strong> {formValues.sex}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Breed:</strong> {formValues.breed}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Color:</strong> {formValues.color}</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1"><strong>Age:</strong> {formValues.age_years} Years, {formValues.age_months} Months, {formValues.age_weeks} Weeks</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1"><strong>Owners:</strong> {formValues.owners.map((id) => {
                  const owner = owners.find((owner) => owner.id === id);
                  return owner ? owner.full_name : '';
                }).join(', ')}</Typography>
              </Grid>
              <Grid item xs={12}>
                {formValues.photo && (
                  <>
                    <Typography variant="body1"><strong>Photo:</strong></Typography>
                    <img
                      src={URL.createObjectURL(formValues.photo)}
                      alt="Pet"
                      style={{ maxWidth: '100%', height: 'auto', maxHeight: '300px' }}
                    />
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle, width: '50%' }}>
        <Typography variant="h6" mb={2}>{pet ? 'Edit Pet' : 'Add New Pet'}</Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Save
            </Button>
          ) : (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </Box>
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          <MuiAlert elevation={6} variant="filled" severity={snackbar.severity}>
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Modal>
  );
};

const OwnerForm = ({ newOwner, errors, handleNewOwnerChange, handleCreateOwner, setCreatingOwner }) => (
  <>
    <Grid item xs={12}>
      <Typography variant="h6">New Owner Details</Typography>
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Full Name"
        fullWidth
        name="full_name"
        value={newOwner.full_name}
        onChange={handleNewOwnerChange}
        required
        error={!!errors.full_name}
        helperText={errors.full_name}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Phone Number"
        fullWidth
        name="phone_number"
        value={newOwner.phone_number}
        onChange={handleNewOwnerChange}
        required
        error={!!errors.phone_number}
        helperText={errors.phone_number}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Contact"
        fullWidth
        name="contact"
        value={newOwner.contact}
        onChange={handleNewOwnerChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Address"
        fullWidth
        name="address"
        value={newOwner.address}
        onChange={handleNewOwnerChange}
      />
    </Grid>
    <Grid item xs={12} display="flex" justifyContent="flex-end">
      <Button variant="contained" color="primary" onClick={handleCreateOwner}>
        Save Owner
      </Button>
      <Button variant="outlined" color="secondary" onClick={() => setCreatingOwner(false)} sx={{ ml: 2 }}>
        Cancel
      </Button>
    </Grid>
  </>
);

const getInitialFormValues = (pet) => ({
  name: pet?.name || '',
  species: pet?.species || '',
  sex: pet?.sex || '',
  breed: pet?.breed || '',
  age_years: pet?.age_years !== undefined ? pet.age_years : null,
  age_months: pet?.age_months !== undefined ? pet.age_months : null,
  age_weeks: pet?.age_weeks !== undefined ? pet.age_weeks : null,
  color: pet?.color || '',
  photo: pet?.photo || null,
  owners: pet ? pet.owners.map((owner) => owner.id) : [],
});

const getInitialNewOwnerValues = () => ({
  full_name: '',
  phone_number: '',
  contact: '',
  address: '',
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

export default PetForm;
