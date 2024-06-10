import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Typography
} from '@mui/material';

const ModalForm = ({ isOpen, onClose, title, children}) => {
  console.log(`Modal Form opened: ${isOpen}`)
  const [modalOpen, setModalOpen] = useState(isOpen);
  
  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen])

  return (
    <Modal open={modalOpen} onClose={onClose}>
      <Box>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalForm;
