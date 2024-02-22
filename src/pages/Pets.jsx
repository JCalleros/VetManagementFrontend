import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
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
import { styled, useTheme } from '@mui/material/styles';

const PetCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: theme.shadows[3],
}));

const AddPetCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: theme.shadows[3],
}));

const Pets = () => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage] = useState(6);

  const pets = [
    { id: 1, name: 'Buddy', owner: 'John Doe', species: 'Dog', breed: 'Golden Retriever', age: 3 },
    { id: 2, name: 'Max', owner: 'Jane Smith', species: 'Cat', breed: 'Siamese', age: 5 },
    { id: 3, name: 'Bella', owner: 'Michael Johnson', species: 'Dog', breed: 'Labrador Retriever', age: 2 },
    { id: 4, name: 'Luna', owner: 'Emily Brown', species: 'Dog', breed: 'Poodle', age: 4 },
    { id: 5, name: 'Charlie', owner: 'David Wilson', species: 'Dog', breed: 'German Shepherd', age: 6 },
    { id: 6, name: 'Lucy', owner: 'Sarah Martinez', species: 'Cat', breed: 'Persian', age: 4 },
    { id: 7, name: 'Cooper', owner: 'Lisa Jones', species: 'Dog', breed: 'Beagle', age: 3 },
    { id: 8, name: 'Oliver', owner: 'Daniel Taylor', species: 'Cat', breed: 'Maine Coon', age: 5 },
    { id: 9, name: 'Milo', owner: 'Michelle Clark', species: 'Dog', breed: 'Dachshund', age: 2 },
    { id: 10, name: 'Bella', owner: 'Nicole Hall', species: 'Dog', breed: 'Golden Retriever', age: 7 },
    { id: 12, name: 'Charlie', owner: 'David Wilson', species: 'Dog', breed: 'German Shepherd', age: 6 },
    { id: 13, name: 'Lucy', owner: 'Sarah Martinez', species: 'Cat', breed: 'Persian', age: 4 },
    { id: 14, name: 'Cooper', owner: 'Lisa Jones', species: 'Dog', breed: 'Beagle', age: 3 },
    { id: 15, name: 'Oliver', owner: 'Daniel Taylor', species: 'Cat', breed: 'Maine Coon', age: 5 },
    { id: 16, name: 'Milo', owner: 'Michelle Clark', species: 'Dog', breed: 'Dachshund', age: 2 },
    { id: 17, name: 'Bella', owner: 'Nicole Hall', species: 'Dog', breed: 'Golden Retriever', age: 7 },
    // Add more pets as needed
  ];

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = filteredPets.slice(indexOfFirstPet, indexOfLastPet);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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
      </Grid>
      <Divider sx={{ my: 4 }} />
      <Grid container spacing={3}>
        {currentPets.map((pet) => (
          <Grid key={pet.id} item xs={12} sm={6} md={4} lg={3}>
            <PetCard elevation={3}>
              <CardContent>
                <PetsIcon fontSize="large" color="primary" />
                <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
                  {pet.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Owner: {pet.owner}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Species: {pet.species}
                </Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Breed: {pet.breed}
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
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AddPetCard elevation={3}>
            <CardContent>
              <AddIcon fontSize="large" color="primary" />
              <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
                Add New Pet
              </Typography>
            </CardContent>
            <Button
              component={Link}
              to="/pets/new"
              variant="contained"
              color="primary"
              size="small"
              fullWidth
              sx={{ mt: 2 }}
            >
              Add
            </Button>
          </AddPetCard>
        </Grid>
      </Grid>
      <Pagination
        count={Math.ceil(filteredPets.length / petsPerPage)}
        page={currentPage}
        onChange={(event, page) => paginate(page)}
        color="primary"
        sx={{ mt: 4, justifyContent: 'center' }}
      />
    </Container>
  );
};

export default Pets;
