import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, IconButton, AppBar, Toolbar, Typography, Divider, Tooltip } from '@mui/material';
import { Home, Dashboard, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { sidebarItems } from '../config/sidebarItems';

const drawerWidth = 260;

const colors = {
  sidebar: '#35495e',
  header: '#42b983',
  main: '#f5f5f5'
};

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          width: `calc(100% - ${open ? drawerWidth : 60}px)`,
          ml: `${open ? drawerWidth : 60}px`,
          transition: 'width 0.3s, margin-left 0.3s',
          backgroundColor: colors.header,
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
          width: open ? drawerWidth : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 60,
            transition: 'width 0.3s',
            overflowX: 'hidden',
            height: '100%',
            backgroundColor: colors.sidebar,
            color: '#fff',
            borderRight: 'none',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '64px', backgroundColor: colors.sidebar }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#fff' }}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: '#fff' }} />
        <List>
          {sidebarItems.map(({ text, icon, path }, index) => (
            <Tooltip key={index} title={open ? '' : text} placement="right">
              <ListItem component={Link} to={path} disablePadding>
                <ListItemButton sx={{ minHeight: 48 }}>
                  <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#FFF' }}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: '#FFF' }} />
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
          backgroundColor: colors.main,
          display: 'flex',
          flexGrow: 1,
          p: 2,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
