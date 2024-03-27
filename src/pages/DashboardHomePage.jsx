import { Typography, Box, Grid, Paper } from "@mui/material";
import TodayIcon from "@mui/icons-material/Today";
import PetsIcon from "@mui/icons-material/Pets";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NotificationsIcon from "@mui/icons-material/Notifications";


const DashboardHomePage = () => {
    console.log("Rendering DashboardHomePage")
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

  export default DashboardHomePage;
  