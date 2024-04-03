import { useState, useEffect } from 'react';
import { TextField, InputAdornment, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModalForm from './ModalForm';

const SearchCreateField = ({ searchLabel, searchTerm, data, itemKey, onItemSelect, handleSearchChange, openCreate }) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    let filteredData = data;
    if (searchTerm && filteredData) {
      filteredData = data.filter(item => {
        const values = Object.values(item);
        return values.some(val => val && val.toString().toLowerCase().includes(searchTerm.toLowerCase()));
      });
    }
    console.log(`Filtered data: ${JSON.stringify(filteredData)}`);
    setFilteredData(filteredData);
    
  }, [searchTerm, data, searchLabel]);
  
  return (
      <>
        <TextField
          label={`Search ${searchLabel}`}
          value={searchTerm}
          onChange={handleSearchChange}
          fullWidth
          margin="normal"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={openCreate} variant="text" size="small">
                  <AddCircleOutlineIcon />
                </Button>
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
        {filteredData && filteredData.map((item) => (
          <ListItem button key={item['full_name']} onClick={() => onItemSelect(item)}>
            <ListItemText primary={`${item['full_name']}`} />
          </ListItem>
        ))}
      </List>
      </>
    )
}

export default SearchCreateField;