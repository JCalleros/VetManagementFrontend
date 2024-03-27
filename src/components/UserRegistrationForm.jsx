import React, {useState} from "react";
import useForm from "../hooks/useForm";
import { TextField, MenuItem, Button, Box } from "@mui/material";
import { createUser } from "../api/users";

export default function UserRegisterForm() {
  const [values, handleChange] = useForm({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    phone_number: "",
    password: "",
    password2: "",
  })

  const [fileUrl, setFileUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(`Event file change: ${file}`);
    if (file !== null) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Handle submit")
    
    try{
      const formValues = {
        ...values,
        fileUrl,
      };
      console.log(`Body Form: ${JSON.stringify(formValues)}`)
      const user = await createUser(formValues);
      console.log(`User: ${user}`)
    } catch(error){
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <TextField
        variant="outlined"
        required
        fullWidth
        margin="normal"
        label="First Name"
        name="first_name"
        value={values.first_name}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        required
        fullWidth
        margin="normal"
        label="Last Name"
        name="last_name"
        value={values.last_name}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        required
        fullWidth
        margin="normal"
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <TextField
        select
        variant="outlined"
        required
        fullWidth
        margin="normal"
        label="Role"
        name="role"
        value={values.role}
        onChange={handleChange}
      >
        <MenuItem value="vet">Vet</MenuItem>
        <MenuItem value="admin">Admin</MenuItem>
      </TextField>
      <TextField
        variant="outlined"
        required
        fullWidth
        margin="normal"
        label="Phone Number"
        name="phone_number"
        value={values.phone_number}
        onChange={handleChange}
      />

      <input type="file" accept="image/*" name="profile_image" onChange={handleFileChange} />
      { fileUrl && (
        <Box
        sx={{
          width: "100%",
          maxWidth: 150,
          maxHeight: 150,
          margin: "10px auto",
          display: "block",
          borderRadius: "50%",
          overflow: "hidden",
          objectFit: "cover",
          boxShadow: "0 2px 6px 0 hsl(0deg 0% 5% / 20%)",
        }}
      >
        <img src={fileUrl} alt="Preview" />
      </Box>
       )
       }
      <TextField
        variant="outlined"
        required
        fullWidth
        margin="normal"
        label="Password"
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />

      <TextField
        variant="outlined"
        required
        fullWidth
        margin="normal"
        label="Confirm Password"
        type="password"
        name="password2"
        value={values.password2}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </form>
  );
}