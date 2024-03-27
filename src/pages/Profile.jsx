import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';
import { updateUser, getUser } from '../api/users';

import { useAuth } from '../hooks/useAuth';
import useForm from '../hooks/useForm';

function Profile() {

  const { authToken, isLoading, error } = useAuth();
  const [values, handleChange] = useForm({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    profile_image: '',
  });


  const [user, setUser] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, phone_number, profile_image } = values;
    try {
      await updateUser(values);
      console.log(`User updated correctly`);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    const fetchUser = async () => {
      try {
        console.log(`Fetching user`)
        const data = await getUser(authToken.access);
        setUser(data);
        console.log(`Data: ${JSON.stringify(data)}`)
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchUser();
  }, [])

  return (
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h2>Update Profile</h2>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={user?.first_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={user?.last_name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={user?.email}
              onChange={handleChange}
              disabled // Disable email field as it cannot be updated
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phone_number"
              value={user?.phone_number}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Profile Image URL"
              name="profile_image"
              value={user?.profile_image}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" color="primary">
              Update Profile
            </Button>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
