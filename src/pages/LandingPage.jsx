import React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCollection from '../hooks/useCollection';


function LandingPage() {
  const { collectionItem, loading } = useCollection('landingPage');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth');
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
        backgroundImage: `url(${collectionItem.landingPageBackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="h2" color="white" gutterBottom>
              {collectionItem.landingPageHeadline}
            </Typography>
            <Typography variant="h5" color="white" paragraph>
              {collectionItem.landingPageSubhead}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={handleClick}
            >
              {collectionItem.landingPageCTA}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src={collectionItem.landingPageImage}
              alt={collectionItem.landingPageImageAlt}
              width="100%"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default LandingPage;
