import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import PetsIcon from '@mui/icons-material/Pets';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import { createPet, getPets } from '../api/pets';
import { styled } from '@mui/material/styles';
import defaultDogPhoto from '../assets/default_dog_photo.jpg';
import PetModalForm from '../components/PetModalForm';
import { useApi } from '../hooks/useApi';

const speciesImages = {
  dog: defaultDogPhoto,
  // cat: catImage,
  // add more species and their images here
};

const PetCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: theme.shadows[3],
}));

const PetImage = styled('img')(({theme}) => ({
  width: '100%',
  objectFit: 'cover',
  maxHeight: '200px',
}));


const PetsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(6);
  const [openDialog, setOpenDialog] = useState(false);
  const { data: pets, loading, error } = useApi(getPets);
  

  const handleOpenDialog = () => {
    setOpenDialog(true);
  }

  const handleCloseDialog = () => {
    setOpenDialog(false);
  }

  const handleSubmit = async () => {
    // Do the sumit and close the dialog if succeded.
    handleCloseDialog();
  }

  const filteredPets = useMemo(() =>
    pets.filter((pet) =>
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.owner.name.toLowerCase().includes(searchQuery.toLowerCase())
  ), [pets, searchQuery]);

  const currentPets = useMemo(() => {
    const indexOfLastPet = currentPage * petsPerPage;
    const indexOfFirstPet = indexOfLastPet - petsPerPage;
    return filteredPets.slice(indexOfFirstPet, indexOfLastPet);
  }, [filteredPets, currentPage, petsPerPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Box maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Pets
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TextField
            placeholder="Search pets or owner"
            fullWidth
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon color="action" />
              ),
            }}
          />
        </Grid>
        <Grid item xs={2} sm={2} md={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenDialog}
          fullWidth
          sx={{ height: '100%' }}
        >
          Add Pet
        </Button>
      </Grid>
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={3}>
        {currentPets.map((pet) => (
          <Grid key={pet.id} item xs={12} sm={6} md={4} lg={3}>
            <PetCard elevation={3}>
  <PetImage src={pet.photoUrl || speciesImages[pet.species.toLowerCase()] } alt={pet.name} />
  <CardContent>
    <PetsIcon fontSize="large" color={pet.sex === 'M' ? "primary" : "secondary"} />
    <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
      {pet.name}
    </Typography>
    { pet.owner && (
      <Typography key={pet.owner.id} variant="body2" color="textSecondary" gutterBottom>
        Owner: {pet.owner.name}
      </Typography>
    )}
    <Typography variant="body2" color="textSecondary" gutterBottom>
      Species: {pet.species}
    </Typography>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      Breed: {pet.breed}
    </Typography>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      Sex: {pet.sex}
    </Typography>
    <Typography variant="body2" color="textSecondary" gutterBottom>
      Age: {pet.age}
    </Typography>
  </CardContent>
  <Button
    component={Link}
    to={`/dashboard/pets/${pet.id}`}
    variant="contained"
    color="primary"
    size="small"
    fullWidth
  >
    View Details
  </Button>
</PetCard>
          </Grid>
        ))}
        
      </Grid>
      <Pagination
        count={Math.ceil(filteredPets.length / petsPerPage)}
        page={currentPage}
        onChange={(event, page) => paginate(page)}
        color="primary"
        sx={{ mt: 4, justifyContent: 'center' }}
      />
    <PetModalForm
        open={openDialog}
        onClose={handleCloseDialog}
        onSave={handleSubmit}
      />

    </Box>
  );
};

export default PetsPage;
