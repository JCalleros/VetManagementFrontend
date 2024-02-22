import { Routes, Route } from 'react-router-dom'
import DashboardLayout from './DashboardLayout';
import RegistrationPage from './RegistrationPage';
import { Typography } from '@mui/material'

const DashboardHome = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Hello Dashboard
      </Typography>
    </div>
  )
}
const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        {/* <Route path="pets" element={<Pets />} /> */}
        {/* <Route path="health" element={<Health />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </DashboardLayout>
  )
}

export default DashboardPage;