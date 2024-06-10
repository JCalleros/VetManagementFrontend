import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Modal, Box, Typography } from '@mui/material';

const steps = ['Pet Info', 'Owner Info (optional)', 'Confirmation'];

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return (
        <PetInfoForm />
      );
    case 1:
      return (
        <OwnerInfoForm />
      );
    case 2:
      return (
        <ConfirmationForm />
      );
    default:
      throw new Error('Unknown step');
  }
};

const FormStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(true);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '500px',
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '24px',
          animation: 'slide-down 0.3s ease-out',
        }}
      >
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ marginTop: '24px' }}>
          {getStepContent(activeStep)}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Confirm' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const PetInfoForm = () => {
  // form logic for pet info
  return (
    <div>
      {/* form fields for pet info */}
    </div>
  );
};

const OwnerInfoForm = () => {
  // form logic for owner info
  return (
    <div>
      {/* form fields for owner info */}
    </div>
  );
};

const ConfirmationForm = () => {
  // form logic for confirmation
  return (
    <div>
      {/* form fields for confirmation */}
    </div>
  );
};

export default FormStepper;