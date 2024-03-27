import React, { useState } from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import UserRegisterForm from '../components/UserRegistrationForm';
import LoginForm from '../components/LoginForm';
import useCollection from '../hooks/useCollection';
import Loader from '../components/Loader';

function AuthPage() {
  const { collectionItem, loading } = useCollection('registrationPage');
  const [formType, setFormType] = useState('register');

  const handleFormTypeChange = (newFormType) => {
    setFormType(newFormType);
  };

  if (loading){
    return <Loader />;
  }
  
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${collectionItem.registrationPageBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" color="white" gutterBottom>
              {collectionItem.registrationPageHeadline}
            </Typography>
            <Typography variant="h5" color="white" paragraph>
              {collectionItem.registrationPageSubhead}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            {formType === 'register' ? (
              <UserRegisterForm />
            ) : (
              <LoginForm />
            )}
            <Typography variant="body1" sx={{ mt: 2 }}>
              {formType === 'register' ? "Already have an account? " : "Don't have an account? "}
              <Link onClick={() => handleFormTypeChange(formType === 'register' ? 'login' : 'register')}>
                {formType === 'register' ? 'Login' : 'Register'}
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AuthPage;
