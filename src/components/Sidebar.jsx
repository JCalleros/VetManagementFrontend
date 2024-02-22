import React from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { sidebarItems } from '../config/sidebarItems';
import Tooltip from '@mui/material/Tooltip';

const Sidebar = ({ open }) => {
  return (
    <List>
      {sidebarItems.map(({ text, icon, path }, index) => (
        <Tooltip key={index} title={open ? '' : text} placement="right">
        <ListItem component={Link} to={path} disablePadding>
          <ListItemButton sx={{ minHeight: 48 }}>
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
              {icon}
            </ListItemIcon>
            <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Tooltip>
      ))}
      <Divider />
    </List>
  );
};

export default Sidebar;
