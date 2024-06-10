import React, { useState } from 'react';
import { Modal, Box, Stepper, Step, StepLabel, Button, Slide } from '@mui/material';

const steps = ['Step 1', 'Step 2', 'Step 3']; // Add or remove steps as needed

const StepperModal = ({ open, handleClose, formSteps }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Slide direction="up" in={open}>
        
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                  <p>All steps completed - you're finished</p>
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </div>
            ) : (
              <div>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                  {formSteps[activeStep]}
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
                      Back
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </Box>
              </div>
            )}
          </div>
      </Slide>
    </Modal>
  );
};

export default StepperModal;
