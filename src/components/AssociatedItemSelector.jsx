import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ListItemText from '@mui/material/ListItemText';
import { ListItemAvatar, Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import SearchCreateField from './SearchCreateField';

const AssociatedItemSelector = ({ open, handleClose, items, title }) => {
  console.log(`Associated Items: ${JSON.stringify(items)}`)
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [page, setPage] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setSearchTerm(item.name);
    setFilteredItems([]);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const renderOption = (option, optionDisplayFields) => {
    return (
      <>
        <ListItemText
          primary={
            optionDisplayFields.full_name &&
            option[optionDisplayFields.name] &&
            `${option[optionDisplayFields.name]} - ${
              option.breed
            }`
          }
        />
      </>
    );
  };


  useEffect(() => {
    try{
      const delayDebounce   = setTimeout(() => {
        if (searchTerm) {
          console.log(`Search in useEffect appointment: ${searchTerm}`)
          console.log(`Searching in items: ${JSON.stringify(items)}`)
          setFilteredItems(items.filter(item =>
            item.full_name.toLowerCase().includes(searchTerm.toLowerCase())
          ));
        } else {
          setFilteredItems([]);
        }
      }, 300);

    
    return () => clearTimeout(delayDebounce);
  }catch(error){
    console.error(`Error in use Effect filtering: ${error}`)
  }
  }, [searchTerm, items]);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
      <DialogContent >
        <DialogContentText>{title}</DialogContentText>
        <SearchCreateField 
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          filterOptions={filteredItems}
          handleOptionSelect={handleItemSelect}
          selectedOption={selectedItem}
          optionDisplayFields={{
            name: 'name',
            sex: 'sex',
            owners: 'owners',
          }}
          renderOption={renderOption}
        />
        <Grid container spacing={2} sx={{ mt: 2, width: '100%' }}>
          {filteredItems.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card sx={{
                backgroundColor: 'white',
                color: 'black',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}>
                <CardContent sx={{ flexGrow: 1, padding: '16px' }}>
                  <ListItemText primary={<strong>{item.full_name}</strong>} />
                  <ListItemText primary={item.phone_number} />
                  <ListItemText secondary={item.email} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <DialogContentText>
          {filteredItems.length} items
        </DialogContentText>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleClose}>Close</Button>
          <div>
            <span>
              Items per page:
              {' '}
              <Select
                value={rowsPerPage}
                onChange={handleChangeRowsPerPage}
                sx={{
                 backgroundColor: 'white',
                  color: 'black',
                }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </span>
            <Pagination
              count={Math.ceil(filteredItems.length / rowsPerPage)}
              page={page}
              onChange={handleChangePage}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssociatedItemSelector;