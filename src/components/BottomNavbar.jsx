import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material';
import { Home, Dashboard } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { sidebarItems } from '../config/sidebarItems';


export default function BottomNavbar() {
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1300 }} elevation={3}>
      <BottomNavigation showLabels>
        {sidebarItems.map((item, index)=>(
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
