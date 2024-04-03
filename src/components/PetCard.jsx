import {Card, CardContent, Typography, Button} from '@mui/material'
import PetsIcon from '@mui/icons-material/Pets';
import { Link } from 'react-router-dom'
import defaultDogPhoto from '../assets/default_dog_photo.jpg';
import defaultCatPhoto from '../assets/default_cat_photo.jpg'
import defaultPetPhoto from '../assets/default_pet_photo.jpg'
import ItemCardImage from './ItemCardImage';
  
const PetCard = ({pet}) => {
    const speciesImages = {
        dog: defaultDogPhoto,
        cat: defaultCatPhoto,
        // add more species and their images here
      };

    return (
      <Card style={{height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <ItemCardImage imageUrl={pet.photoUrl || speciesImages[pet.species.toLowerCase()] || defaultPetPhoto } name={pet.name}/>
        <CardContent>
          <PetsIcon fontSize="large" color={pet.sex === 'M' ? "primary" : "secondary"} />
          <Typography variant="h6" component="h2" gutterBottom sx={{ mt: 2 }}>
            {pet.name}
          </Typography>
          { pet.owner && (
            <Typography key={pet.owner.id} variant="body2" color="textSecondary" gutterBottom>
              Owner: {pet.owner.name}
            </Typography>
          )}
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Species: {pet.species}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Breed: {pet.breed}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Sex: {pet.sex}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Age: {pet.age}
          </Typography>
        </CardContent>
        <Button
          component={Link}
          to={`/dashboard/pets/${pet.id}`}
          variant="contained"
          color={pet.sex === 'M' ? "primary" : "secondary"}
          size="small"
          fullWidth
        >
          View Details
        </Button>
      </Card>
    )
  }

  export default PetCard;