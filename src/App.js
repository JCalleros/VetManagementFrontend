import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/DashboardHomePage";
import AppointmentPage from "./pages/AppointmentPage";
import PetsPage from "./pages/PetsPage";
import ReportsPage from "./pages/ReportsPage";
import PetDetail from "./pages/PetDetail";
import CreateAppointment from "./pages/CreateAppointment";
import CalendarPage from "./pages/CalendarPage";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./contexts/AuthContext";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

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
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route path="" element={<DashboardHome />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="pets" element={<PetsPage />} />
                <Route path="pets/:id" element={<PetDetail />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="appointments" element={<AppointmentPage />} />
                <Route
                  path="appointments/new"
                  element={<CreateAppointment />}
                />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
