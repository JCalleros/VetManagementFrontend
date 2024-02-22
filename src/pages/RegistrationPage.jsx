import React from 'react';
import { Box, Button, Container, Grid, Typography, TextField, Checkbox, FormControlLabel, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import useCollection from '../hooks/useCollection';

function RegistrationPage() {
  // Get the current collection item from the CMS
  const { collectionItem, loading } = useCollection('registrationPage');

  // Get the navigate function from react router
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: implement your registration logic here
    // Navigate to the dashboard page
    navigate('/dashboard');
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
                autoComplete="new-password"
              />
              <FormControlLabel
                control={<Checkbox required name="terms" color="primary" />}
                label={
                  <Typography variant="body2">
                    I agree to the{' '}
                    <Link component={RouterLink} to="/terms">
                      terms and conditions
                    </Link>{' '}
                    of this site.
                  </Typography>
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{ mt: 2 }}
              >
                {collectionItem.registrationPageCTA}
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default RegistrationPage;
