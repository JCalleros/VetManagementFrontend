import React from 'react';
import { Box, Typography, Grid, Divider } from '@mui/material';

const mockReports = [
  {
    id: 1,
    title: 'Annual Checkup Report',
    description: 'Summary of annual checkups for all pets.',
    date: '2024-02-01',
  },
  {
    id: 2,
    title: 'Vaccination Status Report',
    description: 'List of pets with updated vaccination status.',
    date: '2024-01-15',
  },
  // Add more relevant mock reports related to pets' health
];

const ReportList = ({ reports }) => {
  return (
    <Box mt={2}>
      {reports.map((report) => (
        <Box key={report.id} mb={2}>
          <Typography variant="h6">{report.title}</Typography>
          <Typography variant="subtitle2" color="textSecondary">{report.date}</Typography>
          <Typography>{report.description}</Typography>
        </Box>
      ))}
    </Box>
  );
};

const ReportItem = ({ report }) => {
  return (
    <Box>
      <Typography variant="subtitle1">{report.title}</Typography>
      <Typography variant="subtitle2" color="textSecondary">{report.date}</Typography>
    </Box>
  );
};

const ReportPage = () => {
  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Divider />
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={8}>
          <Box mt={3}>
            <Typography variant="h5">All Reports</Typography>
            <Divider />
            <ReportList reports={mockReports} />
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box mt={3}>
            <Typography variant="h5">Recent Reports</Typography>
            <Divider />
            {mockReports.map((report) => (
              <Box key={report.id} mt={2}>
                <ReportItem report={report} />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportPage;
