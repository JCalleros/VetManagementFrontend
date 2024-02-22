import DashboardIcon from "@mui/icons-material/Dashboard";
import PetsIcon from "@mui/icons-material/Pets";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import MenuBookIcon from '@mui/icons-material/MenuBook';

export const sidebarItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "", info: "View an overview of the clinic's performance and key metrics" },
  { text: "Calendar", icon: <CalendarMonthIcon />, path: "calendar", info: "View previous, and up-coming appointments"},
  { 
    text: "Appointments", 
    icon: <MenuBookIcon />, 
    path: "appointments", 
    info: "Schedule, manage, and view appointments for patients", 
    subItems: [
      { text: "Create Appointment", path: "new", info: "Schedule a new appointment" },
      { text: "Manage Appointments", path: "manage", info: "Manage existing appointments" }
    ] 
  },
  { text: "Patients", icon: <PetsIcon />, path: "pets", info: "Manage patient records, treatments, and medical history" },
  { text: "Billing", icon: <ReceiptLongIcon />, path: "billing", info: "Generate invoices, track payments, and manage financial transactions" },
  { text: "Reports", icon: <AssessmentIcon />, path: "reports", info: "Access reports and analytics for clinic performance and patient data" },
  { text: "Settings", icon: <SettingsIcon />, path: "settings", info: "Customize application settings and preferences" },
  { text: "Help & Support", icon: <HelpIcon />, path: "help", info: "Access documentation, FAQs, and contact information for support" },
  { text: "Medical Services", icon: <MedicalServicesIcon />, path: "medical-services", info: "Manage medical services offered by the clinic" },

];
