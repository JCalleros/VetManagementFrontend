import React from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

const PetDetailContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
}));

const PetDetail = () => {
  const { id } = useParams(); // Get the pet ID from the URL params

  // Dummy data for demonstration
  const pet = {
    id: 1,
    name: 'Buddy',
    owner: 'John Doe',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 3,
    imageUrl: 'https://via.placeholder.com/150', // Replace with actual image URL
    medicalHistory: [
      { date: '2022-01-01', diagnosis: 'Fever', treatment: 'Prescribed antibiotics' },
      { date: '2022-02-15', diagnosis: 'Injury', treatment: 'Administered pain relief' },
      // Add more medical history entries as needed
    ],
    // Add more details if needed
  };

  return (
    <PetDetailContainer maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Pet Details
      </Typography>
      <Typography variant="h6" gutterBottom>
        {pet.name}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <img src={pet.imageUrl} alt={pet.name} style={{ maxWidth: '100%', height: 'auto' }} />
      <Typography variant="body1" gutterBottom>
        <strong>Owner:</strong> {pet.owner}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Species:</strong> {pet.species}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Breed:</strong> {pet.breed}
      </Typography>
      <Typography variant="body1" gutterBottom>
        <strong>Age:</strong> {pet.age}
      </Typography>
      {/* Medical history section */}
      <Typography variant="h6" gutterBottom>
        Medical History
      </Typography>
      {pet.medicalHistory.map((record, index) => (
        <div key={index}>
          <Typography variant="body1" gutterBottom>
            <strong>Date:</strong> {record.date}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Diagnosis:</strong> {record.diagnosis}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Treatment:</strong> {record.treatment}
          </Typography>
          <Divider sx={{ my: 2 }} />
        </div>
      ))}
      {/* Add more pet details here */}
      <Button
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
        onClick={() => window.history.back()} // Go back to previous page
        sx={{ mt: 2 }}
      >
        Back
      </Button>
    </PetDetailContainer>
  );
};

export default PetDetail;
