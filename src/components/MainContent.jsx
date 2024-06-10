import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';


const MainContent = ({ open, children }) => {
  const theme = useTheme();
  return (
    <Box 
      sx={{
        position: 'relative',
        flexGrow:1,
        padding: theme.spacing(3),
        transition: theme.transitions.create(['margin'],{
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        })
      }} 
      open={open}>
        <Toolbar />
        {children}
    </Box>
  );
};

export default MainContent;
