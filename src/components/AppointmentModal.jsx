import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import SearchCreateField from './SearchCreateField';
import ModalForm from './ModalForm';
import PetForm from './PetForm';

const AppointmentModal = ({ open, onClose, appointment, pets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(appointment?.pet || null);
  const [openExtraModal, setOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
    setSearchTerm(pet.name);
    setFilteredPets([]);
  };

  const handleSubmit = () => {
    console.log({ ...appointment, pet: selectedPet });
    onClose();
  };

  const handleExtraSubmit = () => {
    console.log({ ...appointment, pet: selectedPet });
    setOpen(false)
  }

  const handleClose = () => {
    setOpen(false);
  }

  const renderOption = (option, optionDisplayFields) => {
    return (
      <>
        {optionDisplayFields.photo && option[optionDisplayFields.photo] && (
          <ListItemAvatar>
            <Avatar src={option[optionDisplayFields.avatar]} alt={option.name} />
          </ListItemAvatar>
        )}
        <ListItemText
          primary={
            optionDisplayFields.name &&
            option[optionDisplayFields.name] &&
            `${option[optionDisplayFields.name]} - ${
              option.breed
            }`
          }
        />
      </>
    );
  };

  

  useEffect(() => {
    try{
      const delayDebounce   = setTimeout(() => {
        if (searchTerm) {
          console.log(`Search in useEffect appointment: ${searchTerm}`)
          console.log(`Searching in pets: ${JSON.stringify(pets)}`)
          setFilteredPets(pets.filter(pet =>
            pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (pet.owner && pet.owner.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
          ));
        } else {
          setFilteredPets([]);
        }
      }, 300);

    
    return () => clearTimeout(delayDebounce);
  }catch(error){
    console.error(`Error in use Effect filtering: ${error}`)
  }
  }, [searchTerm, pets]);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{appointment?.id ? 'Update Appointment' : 'New Appointment'}</DialogTitle>
        <DialogContent>
          <SearchCreateField searchTerm={searchTerm} handleSearchChange={handleSearchChange} filterOptions={filteredPets}
            handleOptionSelect={handlePetSelect}
            selectedOption={selectedPet}
            openCreate={handleOpen}
            optionDisplayFields={{
              photo: 'photo',
              name: 'name',
              sex: 'sex',
              owners: 'owners',
            }}
            renderOption={renderOption}
          />
          <TextField
            type='Date'
            label="Date"
            value={appointment?.date || ''}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Details"
            value={appointment?.details || ''}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
      <ModalForm
        isOpen={openExtraModal}
        onClose={handleClose}
        title={'Create Pet'}
      >
        <PetForm onSubmit={handleExtraSubmit} />
      </ModalForm>
  </>
  );
};

export default AppointmentModal;
