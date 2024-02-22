import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Typography, Box, Grid, Paper } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DashboardLayout from "./pages/DashboardLayout";
import TestPage from "./pages/TestPage";
import TodayIcon from "@mui/icons-material/Today";
import PetsIcon from "@mui/icons-material/Pets";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Appointments from "./pages/Appointments";
import Pets from "./pages/Pets";
import ReportsPage from "./pages/ReportsPage";
import PetDetail from "./pages/PetDetail";
import CreateAppointment from "./pages/CreateAppointment";
import CalendarPage from "./pages/CalendarPage";
import AuthPage from "./pages/AuthPage";
// import Dashboard from "./components/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";

const DashboardHome = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Overview
      </Typography>
      <Grid container spacing={3}>
        {/* Appointments */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#f0f0f0",
            }}
          >
            <TodayIcon sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Appointments</Typography>
              <Typography variant="subtitle1">Upcoming: 20</Typography>
            </Box>
          </Paper>
        </Grid>
        {/* Patients */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#f0f0f0",
            }}
          >
            <PetsIcon sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Patients</Typography>
              <Typography variant="subtitle1">Total: 150</Typography>
            </Box>
          </Paper>
        </Grid>
        {/* Reports */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#f0f0f0",
            }}
          >
            <AssessmentIcon sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Reports</Typography>
              <Typography variant="subtitle1">Generated: 10</Typography>
            </Box>
          </Paper>
        </Grid>
        {/* Notifications */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#f0f0f0",
            }}
          >
            <NotificationsIcon sx={{ fontSize: 40 }} />
            <Box>
              <Typography variant="h6">Notifications</Typography>
              <Typography variant="subtitle1">New: 5</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

const PetRegistration = () => {
  return (
    <Typography variant="h4" component="h1" gutterBottom>
      Pet Registration
    </Typography>
  );
};
// Create a custom theme with your preferred colors and fonts
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="" element={<DashboardHome />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="pets" element={<Pets />} />
            <Route path="pets/:id" element={<PetDetail />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="appointments/new" element={<CreateAppointment />} />
            <Route path="pet-register" element={<PetRegistration />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
