import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Box,
  IconButton,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Tooltip
} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import defaultDogPhoto from '../assets/default_dog_photo.jpg';
import defaultCatPhoto from '../assets/default_cat_photo.jpg';

const DeleteConfirmationDialog = ({ open, handleClose, title, confirmation_question, handleDelete }) => (
  <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title" style={{ color: 'red' }}>
      {title}
    </DialogTitle>
    <DialogContent>
      <Typography id="alert-dialog-description">
        {confirmation_question}
      </Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={handleDelete} color="error">
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

const PetCard = ({ pet, onDelete }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [petIdToDelete, setPetIdToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setPetIdToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (petIdToDelete) {
      onDelete(petIdToDelete);
    }
    setOpenDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const speciesImages = {
    dog: defaultDogPhoto,
    cat: defaultCatPhoto,
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#f3f5f5',
              m: 0.5,
              borderRadius: 2,
              transition: '.3s',
              '&:hover': {
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
                transform: 'scale(1.05)',
              },
              p: 1,
            }}
          >
            <Link to={`/dashboard/pets/${pet.id}`} style={{ textDecoration: 'none' }}>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={pet.photo || speciesImages[pet.species.toLowerCase()] || defaultDogPhoto}
                  alt={pet.name}
                  sx={{ borderRadius: 2 }}
                />
              </Box>
              <CardContent sx={{ padding: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                    {pet.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography variant="body2" color="text.secondary">
                      {pet.species}
                    </Typography>
                    {pet.sex === 'M' ? <MaleIcon color="primary" /> : <FemaleIcon color="secondary" />}
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Breed: {pet.breed || 'Unknown'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {pet.age_years ? `${pet.age_years} years` : ''}
                  {pet.age_months ? ` ${pet.age_months} months` : ''}
                  {pet.age_weeks ? ` ${pet.age_weeks} weeks` : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Color: {pet.color || 'Unknown'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {pet.owners && pet.owners.length > 0
                    ? `Owners: ${pet.owners.map(owner => owner.full_name).join(', ')}`
                    : 'Owners: No Owner'}
                </Typography>
              </CardContent>
            </Link>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Tooltip title="Delete Pet" placement="top">
                <IconButton
                  onClick={() => handleDeleteClick(pet.id)}
                  sx={{
                    color: 'error.main',
                    transition: 'transform .3s',
                    '&:hover': {
                      transform: 'scale(1.2)',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Box>
      </motion.div>
      <DeleteConfirmationDialog
        open={openDeleteDialog}
        handleClose={handleDeleteCancel}
        title="Delete Pet"
        confirmation_question="Are you sure you want to delete this pet?"
        handleDelete={handleDeleteConfirm}
      />
    </>
  );
};

export default PetCard;
