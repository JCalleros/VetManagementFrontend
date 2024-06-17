import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { styled } from '@mui/system';
import { Box, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Dialog, DialogTitle, DialogContent, Typography, Card, CardContent, CardActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const localizer = momentLocalizer(moment);

function EventDialog({ event, open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{event.title}</DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Typography variant="body1">
              Start: {moment(event.start).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
            <Typography variant="body1">
              End: {moment(event.end).format('MMMM Do YYYY, h:mm:ss a')}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </CardActions>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

const StyledCalendar = styled(Calendar)`
  .rbc-calendar {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const events = [
  {
    start: moment().startOf('day').add(10, 'hours').toDate(),
    end: moment().startOf('day').add(11, 'hours').toDate(),
    title: 'Checkup for Buddy',
    description: 'Regular checkup appointment for Buddy',
  },
  {
    start: moment().startOf('day').add(14, 'hours').toDate(),
    end: moment().startOf('day').add(15, 'hours').toDate(),
    title: 'Max - Vaccination',
    description: 'Vaccination appointment for Max',
  },
  {
    start: moment().add(2, 'days').startOf('day').add(12, 'hours').toDate(),
    end: moment().add(2, 'days').startOf('day').add(13, 'hours').toDate(),
    title: 'Luna - Dental Cleaning',
    description: 'Dental cleaning appointment for Luna',
  },
  {
    start: moment().add(3, 'days').startOf('day').add(11, 'hours').toDate(),
    end: moment().add(3, 'days').startOf('day').add(12, 'hours').toDate(),
    title: 'Lucy - Grooming',
    description: 'Grooming appointment for Lucy',
  },
  {
    start: moment().add(4, 'days').startOf('day').add(13, 'hours').toDate(),
    end: moment().add(4, 'days').startOf('day').add(14, 'hours').toDate(),
    title: 'Cooper - Surgery',
    description: 'Surgery appointment for Cooper',
  },
];

function MyCalendar() {
  const [value, setValue] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleDateChange = (date) => {
    setValue(date.toDate());
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleDialogClose = () => {
    setSelectedEvent(null);
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflowX: 'hidden' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          backgroundColor: '#fff',
          boxShadow: 1,
          borderRadius: 1,
          mb: 2,
        }}
      >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Go to date"
          value={dayjs(value)}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
          sx={{ mb: 2 }}
        />
      </LocalizationProvider>
      </Box>
      <StyledCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={value}
        onNavigate={(newDate) => setValue(newDate)}
        onSelectEvent={handleEventClick}
        style={{ height: 500 }}
      />
      {selectedEvent && 
        <EventDialog event={selectedEvent} open={Boolean(selectedEvent)} onClose={handleDialogClose} />
      }
      
    </Box>
  );
}

export default MyCalendar;
