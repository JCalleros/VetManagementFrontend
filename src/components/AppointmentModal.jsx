import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, List, ListItem, ListItemAvatar,InputAdornment, IconButton, Avatar, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const AppointmentModal = ({ open, onClose, appointment, pets }) => {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPets, setFilteredPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(appointment?.pet || null);

  
  useEffect(() => {
    // Debounce the search to avoid performance issues with large datasets
    const delayDebounce = setTimeout(() => {
      if (searchTerm) {
        setFilteredPets(pets.filter(pet =>
          pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.owner.name.toLowerCase().includes(searchTerm.toLowerCase())
        ));
      } else {
        setFilteredPets([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, pets]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
    setSearchTerm('');
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
        <TextField
          label="Search Pet"
          value={searchTerm}
          onChange={handleSearchChange}
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
          {filteredPets.map((pet) => (
            <ListItem button key={pet.id} onClick={() => handlePetSelect(pet)}>
              <ListItemAvatar>
                <Avatar src={pet.photo} alt={pet.name} />
              </ListItemAvatar>
              <ListItemText primary={`${pet.name} - ${pet.species} (${pet.owner.name})`} />
            </ListItem>
          ))}
        </List>
        {/* Add other form fields and the quick add pet feature here */}
        <TextField
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
