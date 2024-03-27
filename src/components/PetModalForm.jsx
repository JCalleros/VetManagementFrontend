import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import SearchCreateField from './SearchCreateField';

const PetModalForm = ({ open, onClose, onSave, owners}) => {
  
  const [petData, setPetData] = useState({
    name: '',
    species: '',
    breed: '',
    age: '',
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
        <SearchCreateField searchLabel="Owner" searchTerm={searchTerm} handleSearchChange={handleSearchChange} /> 
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
