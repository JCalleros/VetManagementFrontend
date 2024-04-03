import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Box,
  Typography,
  useTheme,
} from '@mui/material';

const styles = {
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 5,
    boxShadow: '0 3px 5px 0 rgba(0, 0, 0, 0.08)',
    p: 4
  },
};

const ModalForm = ({ isOpen, onClose, title, children}) => {
  
  const [modalOpen, setModalOpen] = useState(isOpen);
  const theme = useTheme();
  const isSmallScreen = theme.breakpoints.down('sm');
  
  
  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen])

  return (
    <Modal open={modalOpen} onClose={onClose}>
      <Box sx={{ ...styles.paper, width: isSmallScreen ? '100%' : styles.paper.maxWidth }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalForm;
