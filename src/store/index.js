import { configureStore } from "@reduxjs/toolkit";
import petsReducer from "./pets/petsSlice";
import ownersReducer from "./owners/ownersSlice";

const store = configureStore({
  reducer: {
    pets: petsReducer,
    owners: ownersReducer,
  },
});

export default store;
