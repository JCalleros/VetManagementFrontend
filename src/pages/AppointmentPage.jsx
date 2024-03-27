import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import AppointmentModal from '../components/AppointmentModal';
import { useApi } from '../hooks/useApi';
import { getPets } from '../api/pets';
import { getAppointments } from '../api/appointments';


const AppointmentPage = () => {
  const { data: pets, loading: loadingPets, errorPets } = useApi(getPets);
  const { data: appointments, loading: loadingAppointments, errorAppointments } = useApi(getAppointments);
  
  const [showForm, setShowForm] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowForm(true);
  }

  const handleAddClick = () => {
    setSelectedAppointment(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  if (loadingPets || loadingAppointments) {
    return <h1>Loading...</h1>
  }

  if (errorPets || errorAppointments){
    return <h1>Error</h1>
  }
  
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Appointments
      </Typography>
      <List>
        {appointments.map((appointment) => (
          <React.Fragment key={appointment.id}>
            <ListItem>
              <ListItemText
                primary={appointment.petName}
                secondary={new Date(appointment.date).toLocaleString()}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick(appointment)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <IconButton
        color="primary"
        aria-label="add appointment"
        onClick={handleAddClick}
      >
        <AddIcon />
      </IconButton>
      <AppointmentModal open={showForm} onClose={handleFormClose} appointment={selectedAppointment} pets={pets} />
    </Box>
  );
};

export default AppointmentPage;
