import { useState, useEffect } from "react";
import { TextField, List, ListItem, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const SearchCreateField = ({ 
  searchTerm, 
  handleSearchChange, 
  filterOptions, 
  handleOptionSelect, 
  selectedOption,
  openCreate,
  optionDisplayFields,
  renderOption,

}) => {

const [selectedOptionName, setSelectedOptionName] = useState(
  selectedOption ? selectedOption.name : ''
);

useEffect(() => {
  if (selectedOption) {
    console.log(`Selected option: ${JSON.stringify(selectedOption)}`)
    setSelectedOptionName(selectedOption.name);
  }
}, [selectedOption]);


return (
  <>
  <TextField
        label="Search"
        value={searchTerm}
        onChange={handleSearchChange}
        defaultValue={selectedOptionName}
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
      <List>
      {filterOptions &&
        filterOptions.map((option) => (
          <ListItem button key={option.id} onClick={() => handleOptionSelect(option)}>
            {renderOption(option, optionDisplayFields)}
          </ListItem>
        ))}
    </List>
  </>
)
}

export default SearchCreateField;