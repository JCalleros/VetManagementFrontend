import React, { useState } from 'react';
import { Box, Button, Container, Grid, Typography, TextField, Checkbox, FormControlLabel, Link } from '@mui/material';
import useCollection from '../hooks/useCollection';

function AuthPage() {
  // Get the current collection item from the CMS
  const { collectionItem, loading } = useCollection('registrationPage');

  // State to manage the form type (login or register)
  const [formType, setFormType] = useState('register');

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: implement your registration logic here
    // Navigate to the dashboard page
    console.log('Form submitted');
  };

  if (loading) {
    return <div>Loading</div>
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
            <form
              onSubmit={handleSubmit}
              sx={{
                margin: 4,
                padding: 4,
                background: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 2,
              }}
            >
              {formType === 'register' && (
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  margin="normal"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
              )}
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="normal"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                autoComplete={formType === 'register' ? 'new-password' : 'current-password'}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
              >
                {formType === 'register' ? collectionItem.registrationPageCTA : 'Login'}
              </Button>
            </form>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {formType === 'register' ? "Already have an account? " : "Don't have an account? "}
              <Link onClick={() => setFormType(formType === 'register' ? 'login' : 'register')}>
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
