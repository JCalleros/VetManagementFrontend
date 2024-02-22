import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userAPI from "./api/userAPI";

// Async action for checking user authentication
export const checkUserAuthentication = createAsyncThunk(
  "user/checkAuthentication",
  async () => {
    const response = await userAPI.checkAuthentication();
    return response.data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    status: "idle",
    error: null,
  },
  reducers: {
    // Add synchronous actions here
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuthentication.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAuthentication.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Add user to state
        state.isAuthenticated = action.payload.isAuthenticated;
      })
      .addCase(checkUserAuthentication.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
