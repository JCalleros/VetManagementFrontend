import React, { createContext, useReducer } from "react";
import { getPets, createPet, deletePet } from "../api/pets";

const initialState = {
  pets: [],
  loading: false,
  error: null,
};

const PetContext = createContext(initialState);

const PetReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PETS_START":
      return { ...state, loading: true };
    case "FETCH_PETS_SUCCESS":
      return { ...state, loading: false, pets: action.payload };
    case "FETCH_PETS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_PET":
      return { ...state, pets: [...state.pets, action.payload] };
    case "DELETE_PET":
      return {
        ...state,
        pets: state.pets.filter((pet) => pet.id !== action.payload),
      };
    default:
      return state;
  }
};

const PetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PetReducer, initialState);

  const fetchPets = async () => {
    dispatch({ type: "FETCH_PETS_START" });
    try {
      const result = await getPets();
      dispatch({ type: "FETCH_PETS_SUCCESS", payload: result });
    } catch (error) {
      dispatch({ type: "FETCH_PETS_FAILURE", payload: error });
    }
  };

  const addPet = async (newPetData) => {
    try {
      const response = await createPet(newPetData);
      dispatch({ type: "ADD_PET", payload: response });
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  const removePet = async (petId) => {
    try {
      const response = await deletePet(petId);
      dispatch({ type: "DELETE_PET", payload: response });
    } catch (error) {
      console.error("Error adding pet:", error);
    }
  };

  return (
    <PetContext.Provider value={{ state, fetchPets, addPet, removePet }}>
      {children}
    </PetContext.Provider>
  );
};

export { PetContext, PetProvider };
