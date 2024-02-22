import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { Divider } from '@mui/material';

// Define the layout for the Appointments component
const Appointments = () => {
  // Mock data for appointments
  const appointments = [
    { id: 1, time: '09:00 AM', patient: 'Buddy', owner: 'John Doe', species: 'Dog', reason: 'Regular Checkup' },
    { id: 2, time: '10:30 AM', patient: 'Fluffy', owner: 'Jane Smith', species: 'Cat', reason: 'Vaccination' },
    { id: 3, time: '02:00 PM', patient: 'Max', owner: 'Michael Johnson', species: 'Dog', reason: 'Dental Cleaning' },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Appointments
      </Typography>
      <List sx={{ width: '100%', maxWidth: 600 }}>
        {appointments.map(appointment => (
          <React.Fragment key={appointment.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <EventAvailableIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={appointment.patient}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`Time: ${appointment.time}`}
                    </Typography>
                    <br />
                    {`Owner: ${appointment.owner}`}
                    <br />
                    {`Species: ${appointment.species}`}
                    <br />
                    {`Reason: ${appointment.reason}`}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default Appointments;
