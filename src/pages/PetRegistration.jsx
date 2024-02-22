import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";

export default function PetRegistration() {
  // This is the hook that handles the form state and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // This is the function that handles the form submission
  const onSubmit = (data) => {
    // Here you can send the data to your backend or do whatever you want with it
    console.log(data);
  };

  return (
    // This is the form component that wraps the input fields and buttons
    <Form onSubmit={handleSubmit(onSubmit)}>
      
      <FormControl sx={{ m: 1, width: "25ch" }} error={errors.name}>
        <InputLabel htmlFor="name">Pet Name</InputLabel>
        <Input
          id="name"
          {...register("name", { required: true, maxLength: 20 })}
        />
        <FormHelperText>
          {errors.name?.type === "required" && "This field is required"}
          {errors.name?.type === "maxLength" &&
            "The name cannot be longer than 20 characters"}
        </FormHelperText>
      </FormControl>
      
      <FormControl sx={{ m: 1, width: "25ch" }} error={errors.type}>
        <InputLabel id="type-label">Pet Type</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          {...register("type", { required: true })}
        >
          <MenuItem value="Dog">Dog</MenuItem>
          <MenuItem value="Cat">Cat</MenuItem>
          <MenuItem value="Bird">Bird</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
        <FormHelperText>
          {errors.type?.type === "required" && "This field is required"}
        </FormHelperText>
      </FormControl>
      
      <FormControl sx={{ m: 1, width: "25ch" }} error={errors.breed}>
        <InputLabel htmlFor="breed">Pet Breed</InputLabel>
        <Input
          id="breed"
          {...register("breed", { required: true, maxLength: 20 })}
        />
        <FormHelperText>
          {errors.breed?.type === "required" && "This field is required"}
          {errors.breed?.type === "maxLength" &&
            "The breed cannot be longer than 20 characters"}
        </FormHelperText>
      </FormControl>
      
      <FormControl sx={{ m: 1, width: "25ch" }} error={errors.age}>
        <InputLabel htmlFor="age">Pet Age</InputLabel>
        <Input
          id="age"
          type="number"
          {...register("age", { required: true, min: 0, max: 20 })}
        />
        <FormHelperText>
          {errors.age?.type === "required" && "This field is required"}
          {errors.age?.type === "min" && "The age cannot be negative"}
          {errors.age?.type === "max" && "The age cannot be greater than 20"}
        </FormHelperText>
      </FormControl>
     
      <FormControl sx={{ m: 1, width: "25ch" }} error={errors.gender}>
        <InputLabel id="gender-label">Pet Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          {...register("gender", { required: true })}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </Select>
        <FormHelperText>
          {errors.gender?.type === "required" && "This field is required"}
        </FormHelperText>
      </FormControl>
      
      <FormControl sx={{ m: 1, width: "25ch" }} error={errors.vaccinated}>
        <FormControlLabel
          control={
            <Checkbox
              id="vaccinated"
              {...register("vaccinated", { required: true })}
            />
          }
          label="Pet Vaccinated"
        />
        <FormHelperText>
          {errors.vaccinated?.type === "required" &&
            "You must check this box to register your pet"}
        </FormHelperText>
      </FormControl>
      
      <Button variant="contained" type="submit" sx={{ m: 1 }}>
        Register
      </Button>
    </Form>
  );
}
