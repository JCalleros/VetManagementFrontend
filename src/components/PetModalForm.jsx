import React, { useCallback, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, FormControl, Select, MenuItem } from '@mui/material';
import SearchCreateField from './SearchCreateField';
import ModalForm from './ModalForm';
import OwnerForm from './OwnerForm';

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

const PetModalForm = ({ open, onClose, onSave, owners}) => {
  const [formValues, setFormValues] = useState({});
  const [errors, setErrors] = useState({});
  const [openExtraModal, setOpen] = useState(false);
  const [owner, setSelectedOwner] = useState({});
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
    sex: '',
    photo: null,
  });

  
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData({ ...petData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setPetData({ ...petData, photo: e.target.files[0] });
  };

  const handleSave = () => {
    onSave(petData);
    onClose();
  };

  const handleOpen = useCallback(() => {
    setFormValues({});
    setErrors({});
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = (values) => {
    console.log('Form submitted with values:', values);
    handleClose();
  };

  const onItemSelect = (owner) => {
    setSelectedOwner(owner);
    setSearchTerm('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a New Pet</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Pet's Name"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="species"
          label="Species"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="breed"
          label="Breed"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          name="age"
          label="Age"
          type="text"
          fullWidth
          variant="outlined"
          onChange={handleInputChange}
        />
        <FormControl>
          <Select
            value={petData.sex || 'M'}
            name="sex"
            defaultValue='M'
            onChange={handleInputChange}
            margin="dense"
            fullWidth
            variant="outlined"
          >
            <MenuItem value="M">Male</MenuItem>
            <MenuItem value="F">Female</MenuItem>
          </Select>
        </FormControl>
        <SearchCreateField searchLabel="Owners" searchTerm={searchTerm} data={owners} handleSearchChange={handleSearchChange} openCreate={handleOpen} onItemSelect={onItemSelect}/>
        <ModalForm
          isOpen={openExtraModal}
          onClose={handleClose}
          title={'Create Owner'}
        >
          <OwnerForm onSubmit={handleSubmit} />
        </ModalForm>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
          onChange={handlePhotoChange}
        />
        <label htmlFor="raised-button-file">
          <Button variant="contained" component="span">
            Upload Photo
          </Button>
        </label>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PetModalForm;
