import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOwners, addOwner, deleteOwner, updateOwner } from "./ownersAPI";

export const fetchOwners = createAsyncThunk("owners/fetchOwners", getOwners);
export const createOwner = createAsyncThunk("owners/addOwner", addOwner);
export const removeOwner = createAsyncThunk("owners/deleteOwner", deleteOwner);
export const editOwner = createAsyncThunk("owners/updateOwner", updateOwner);

const initialState = {
  data: [],
  loading: false,
  currentFilter: { search: "", name: "", phone: "" },
  error: null,
};

const ownersSlice = createSlice({
  name: "owners",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.currentFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOwners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOwners.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOwners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createOwner.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(editOwner.fulfilled, (state, action) => {
        const index = state.data.findIndex(
          (owner) => owner.id === action.payload.id
        );
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(removeOwner.fulfilled, (state, action) => {
        state.data = state.data.filter((owner) => owner.id !== action.payload);
      });
  },
});

export const { setFilter } = ownersSlice.actions;

export default ownersSlice.reducer;
