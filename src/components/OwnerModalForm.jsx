import { useEffect, useState } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  Grid,
  InputAdornment,
  IconButton,
  TextField,
  FormHelperText,
} from '@mui/material';
import ModalForm from './ModalForm'
// ...

const useFormInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    return {
      value,
      onChange: handleChange
    };
  };

  
const fetchOwner = async (id) => {
  const response = await fetch(`/api/owners/${id}`);
  const data = await response.json();
  return data;
};

const OwnerForm = () => {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});

  const emailInput = useFormInput(formValues.email || '');
  const fullNameInput = useFormInput(formValues.full_name || '');
  const phoneNumberInput = useFormInput(formValues.phone_number || '');
  const contactInput = useFormInput(formValues.contact || '');
  const addressInput = useFormInput(formValues.address || '');

  const handleSubmit = (data) => {
    // Perform your submission logic here.
  };

  const handleOpen = () => {
    setFormValues({});
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (formValues.id) {
      fetchOwner(formValues.id).then((owner) => {
        setFormValues(owner);
      });
    }
  }, [formValues.id]);

  const handleInputChange = (event, inputName) => {
    setFormValues({
      ...formValues,
      [inputName]: event.target.value,
    });

    setErrors({
      ...errors,
      [inputName]: '',
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneNumber = phoneNumberInput.value;
    if (!(phoneNumber.match(/^\+?1?\d{9,15}$/))) {
      newErrors.phone_number = 'Phone number must be entered in the format: +999999999. Up to 15 digits allowed.';
    }
    return newErrors;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      handleSubmit(formValues);
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Register Owner
      </Button>
      <ModalForm
        open={open}
        onClose={handleClose}
        onSubmit={handleFormSubmit}
        form={{
          title: 'Owner',
          fields: [
            {
              name: 'full_name',
              label: 'Full Name',
              ...fullNameInput,
              inputProps: {
                required: true,
              },
            },
            {
              name: 'phone_number',
              label: 'Phone Number',
              type: 'tel',
              ...phoneNumberInput,
              inputProps: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      {/* Add your phone number icon component here. */}
                    </IconButton>
                  </InputAdornment>
                ),
              },validate: (value) =>
                !value.match(/^\+?1?\d{9,15}$/)
                  ? 'Phone number must be entered in the format: +999999999. Up to 15 digits allowed.'
                  : '',
              required: true,
              error: errors.phone_number,
            },
            {
              name: 'email',
              label: 'Email',
              ...emailInput,
              inputProps: {
                type: 'email',
                required: true,
              },
              error: errors.email,
            },
            {
              name: 'contact',
              label: 'Contact',
              ...contactInput,
              inputProps: {
                required: true,
              },
              error: errors.contact,
            },
            {
              name: 'address',
              label: 'Address',
              ...addressInput,
              inputProps: {
                required: true,
              },
              error: errors.address,
            },
          ],
          submitHandler: () => handleSubmit(formValues),
        }}
      />
    </div>
  );
};

export default OwnerForm;