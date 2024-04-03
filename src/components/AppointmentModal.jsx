import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemAvatar,InputAdornment, IconButton, Avatar, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const SearchField = ({ 
    searchTerm, 
    handleSearchChange, 
    filterOptions, 
    handleOptionSelect, 
    selectedOption,
    optionDisplayFields,
  }) => {
 
  const [selectedOptionName, setSelectedOptionName] = useState(
    selectedOption ? selectedOption.name : ''
  );

  useEffect(() => {
    if (selectedOption) {
      console.log(`Selected option: ${JSON.stringify(selectedOption)}`)
      setSelectedOptionName(selectedOption.name);
    }
  }, [selectedOption]);
  

  const renderOption = (option) => {
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

  return (
    <>
    <TextField
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          defaultValue={selectedOptionName}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={()=>{}}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
        {filterOptions &&
          filterOptions.map((option) => (
            <ListItem button key={option.id} onClick={() => handleOptionSelect(option)}>
              {renderOption(option)}
            </ListItem>
          ))}
      </List>
    </>
  )
}



const AppointmentModal = ({ open, onClose, appointment, pets }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(appointment?.pet || null);

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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
    setSearchTerm(pet.name);
    setFilteredPets([]);
  };

  const handleSubmit = () => {
    // API call to save the appointment
    console.log({ ...appointment, pet: selectedPet });
    onClose();
  };

  
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{appointment?.id ? 'Update Appointment' : 'New Appointment'}</DialogTitle>
      <DialogContent>
        <SearchField searchTerm={searchTerm} handleSearchChange={handleSearchChange} filterOptions={filteredPets}
          handleOptionSelect={handlePetSelect}
          selectedOption={selectedPet}
          optionDisplayFields={{
            photo: 'photo',
            name: 'name',
            sex: 'sex',
            owners: 'owners',
        }}/>
        {/* Add other form fields and the quick add pet feature here */}
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
  );
};

export default AppointmentModal;
