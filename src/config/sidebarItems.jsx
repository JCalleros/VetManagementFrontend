import DashboardIcon from "@mui/icons-material/Dashboard";
import PetsIcon from "@mui/icons-material/Pets";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Person2Icon from '@mui/icons-material/Person2';

export const sidebarItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "", info: "View an overview of the clinic's performance and key metrics" },
  { text: "Appointments", icon: <MenuBookIcon />, path: "appointments", info: "Schedule, manage, and view appointments for patients"},
  { text: "Patients", icon: <PetsIcon />, path: "pets", info: "Manage patient records, treatments, and medical history" },
  { text: "Profile", icon: <Person2Icon />, path: "profile", info: "Update your profile information"},
];
