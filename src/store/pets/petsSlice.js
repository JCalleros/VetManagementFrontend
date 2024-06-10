import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPets, addPet, deletePet, updatePet } from "./petsAPI";

export const fetchPets = createAsyncThunk("pets/fetchPets", getPets);
export const createPet = createAsyncThunk("pets/addPet", addPet);
export const removePet = createAsyncThunk("pets/deletePet", deletePet);
export const editPet = createAsyncThunk("pets/updatePet", updatePet);

const initialState = {
  data: [],
  loading: false,
  currentFilter: { search: "", species: "", sex: "" },
  error: null,
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createPet.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editPet.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (pet) => pet.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(removePet.fulfilled, (state, action) => {
        state.data = state.data.filter((pet) => pet.id !== action.payload);
      });
  },
});

export const { setFilter } = petsSlice.actions;

export default petsSlice.reducer;
