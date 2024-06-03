import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion, AnimatePresence } from 'framer-motion';
import PetCard from '../components/PetCard';
import { usePets } from '../store/pets/usePets';
import PetForm from '../components/PetForm';

const speciesOptions = ['Dog', 'Cat'];
const sexOptions = ['Male', 'Female'];

const PetsPage = () => {
  const { pets, loading, error, filter, handleAddPet, handleUpdatePet, handleSetFilter } = usePets();
  const [search, setSearch] = useState(filter.search || "");
  const [species, setSpecies] = useState(filter.species || "");
  const [sex, setSex] = useState(filter.sex || "");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPet, setEditingPet] = useState(null);

  const openForm = (pet = null) => {
    setEditingPet(pet);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingPet(null);
    setIsFormOpen(false);
  };

  const handleSavePet = (pet) => {
    if (pet.id) {
      handleUpdatePet(pet);
    } else {
      handleAddPet(pet);
    }
  };

  const handleDeletePet = async (petId) => {
    console.log(`Handling delete pet: ${petId}`);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    handleSetFilter({ ...filter, search: e.target.value });
  };

  const handleSpeciesChange = (e) => {
    setSpecies(e.target.value);
    handleSetFilter({ ...filter, species: e.target.value });
  };

  const handleSexChange = (e) => {
    setSex(e.target.value);
    handleSetFilter({ ...filter, sex: e.target.value });
  };

  const handleClearFilter = () => {
    setSearch("");
    setSpecies("");
    setSex("");
    handleSetFilter({ search: "", species: "", sex: "" });
  };

  useEffect(() => {
    setSearch(filter.search);
    setSpecies(filter.species);
    setSex(filter.sex);
  }, [filter]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography variant="h5" color="error">Error!</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowX: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          backgroundColor: '#fff',
          boxShadow: 1,
          borderRadius: 1,
          mb: 2,
        }}
      >
        <TextField
          placeholder="Search pets or owner"
          variant="outlined"
          value={search}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: <SearchIcon color="action" />,
          }}
          sx={{ flexGrow: 1, mr: 2 }}
        />
        <FormControl sx={{ mr: 2, minWidth: 120 }}>
          <InputLabel>Species</InputLabel>
          <Select value={species} label="Species" onChange={handleSpeciesChange}>
            {speciesOptions.map((species, index) => (
              <MenuItem key={index} value={species}>{species}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ mr: 2, minWidth: 120 }}>
          <InputLabel>Sex</InputLabel>
          <Select value={sex} label="Sex" onChange={handleSexChange}>
            {sexOptions.map((sex, index) => (
              <MenuItem key={index} value={sex}>{sex}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleClearFilter}>
          Clear
        </Button>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => openForm()}>
          Add Pet
        </Button>
      </Box>

      <Grid container spacing={3}>
        <AnimatePresence>
          {pets.map((pet) => (
            <Grid key={pet.id} item xs={12} sm={6} md={4} lg={3}>
              <PetCard pet={pet} onDelete={handleDeletePet} onEdit={() => openForm(pet)} />
            </Grid>
          ))}
        </AnimatePresence>
      </Grid>

      <PetForm open={isFormOpen} onClose={closeForm} onSave={handleSavePet} pet={editingPet} />
    </Box>
  );
};

export default PetsPage;
