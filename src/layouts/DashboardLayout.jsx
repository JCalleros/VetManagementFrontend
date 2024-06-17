import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, CssBaseline, Paper, BottomNavigation, BottomNavigationAction, ListItemText, ListItemButton, IconButton, AppBar, Toolbar, Typography, Divider, Tooltip } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { sidebarItems } from '../config/sidebarItems';
import { useTheme } from '@mui/material/styles';
const drawerWidth = 260;


export function BottomNavbar() {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1300 }} elevation={3}>
      <BottomNavigation showLabels>
        {sidebarItems.map((item, index) => (
          <BottomNavigationAction
            key={index}
            label={item.text}
            icon={item.icon}
            component={Link}
            to={item.path}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}


export default function DashboardLayout() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: { xs: '100%', sm: `calc(100% - ${open ? drawerWidth : 60}px)` },
          ml: `${open ? drawerWidth : 60}px`,
          transition: 'width 0.3s, margin-left 0.3s',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Vet Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: open ? drawerWidth : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 60,
            transition: 'width 0.3s',
            overflowX: 'hidden',
            height: '100%',
            backgroundColor: theme.palette.background.main,
            color: theme.palette.primary.contrastText,
            color: '#fff',
            borderRight: 'none',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px', backgroundColor: theme.palette.background.main }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: theme.palette.primary.contrastText }}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: theme.palette.primary.contrastText }} />
        <List>
          {sidebarItems.map(({ text, icon, path }, index) => (
            <Tooltip key={index} title={open ? '' : text} placement="right">
              <ListItem component={Link} to={path} disablePadding>
                <ListItemButton sx={{ minHeight: 48 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: theme.palette.primary.contrastText }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: theme.palette.primary.contrastText }} />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          transition: 'margin-left 0.3s',
          mt: '64px',
          backgroundColor: '#0002',
          mb: { xs: '56px', sm: 0 }, // Ensure the outlet has space for the bottom navbar on small screens
          display: 'flex',
          flexGrow: 1,
          p: 2,
        }}
      >
        <Outlet />
      </Box>
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        <BottomNavbar />
      </Box>
    </Box>
  );
}
