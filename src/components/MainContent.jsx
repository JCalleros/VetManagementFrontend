import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

const MainContentWrapper = styled(Box)(({ theme, open, drawerWidth }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: open ? drawerWidth : theme.spacing(2),
  transition: theme.transitions.create(['margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const MainContent = ({ open, children, drawerWidth }) => {
  return (
    <MainContentWrapper open={open} drawerWidth={drawerWidth}>
      <Toolbar />
      {children}
    </MainContentWrapper>
  );
};

export default MainContent;
