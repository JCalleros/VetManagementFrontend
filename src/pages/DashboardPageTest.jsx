import { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import { Outlet, useNavigate, Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import useCollection from '../hooks/useCollection';

function DashboardPage() {
  const { collectionItem, loading } = useCollection('dashboardPage');
  const navigate = useNavigate();
  const drawerWidth = 240;
  const navItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Pets', icon: <PetsIcon />, path: '/pets' },
    { text: 'Clients', icon: <PeopleIcon />, path: '/clients' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {collectionItem.dashboardPageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={open}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.text} component={RouterLink} to={item.path} onClick={handleDrawerClose}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        <Toolbar />
        <List>
          {navItems.map((item) => (
            <ListItem button key={item.text} component={RouterLink} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardPage;
