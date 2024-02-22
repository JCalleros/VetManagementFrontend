import React from 'react';
import { Box, Typography, Button, Divider, Grid } from '@mui/material';
import ReportItem from './ReportItem'; // Assuming we have a ReportItem component

const ReportList = ({ reports }) => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Divider />
      <Grid container spacing={2}>
        {reports.map((report) => (
          <Grid item xs={12} sm={6} md={4} key={report.id}>
            <ReportItem report={report} />
          </Grid>
        ))}
      </Grid>
      <Box mt={4} textAlign="center">
        <Button variant="contained" color="primary">
          Load More
        </Button>
      </Box>
    </Box>
  );
};

export default ReportList;
