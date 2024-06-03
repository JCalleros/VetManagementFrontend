import React from 'react';
import { Box, Typography } from '@mui/material';


const DashboardHomePage = () => {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
        <Typography variant="h4">Welcome to the Vet Management System</Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          This is the home page. Here you can find the latest updates and information about your veterinary practice.
        </Typography>
      </Box>
    );
  };

  export default DashboardHomePage;
  