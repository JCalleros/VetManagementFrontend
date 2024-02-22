import { configureStore } from "@reduxjs/toolkit";

const reducer = (state = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthenticated: true };
    case "LOGOUT":
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

const store = configureStore({ reducer });

export default store;
