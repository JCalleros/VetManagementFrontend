import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const SearchCreateField = ({searchLabel, searchTerm, handleSearchChange, openCreate}) => {
    return (
        <TextField
          label={`Search ${searchLabel}`}
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={openCreate}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </InputAdornment>
            ),
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
    )
}

export default SearchCreateField;