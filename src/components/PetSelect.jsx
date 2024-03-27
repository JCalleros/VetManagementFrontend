import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from '@mui/material';


const PetSelect = ({pets, value, onChange }) => {
    return (
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor='pet'>Select a pet</InputLabel>
          <Select
            id="pet"
            name="pet"
            value={value}
            onChange={onChange}
          >
            <MenuItem value="">Select a pet</MenuItem>
            {pets.map((pet) => (
            <MenuItem key={pet.id} value={pet.id}>
                {pet.name}
            </MenuItem> 
            ))}
          </Select>
        </FormControl>
    )
}

export default PetSelect;