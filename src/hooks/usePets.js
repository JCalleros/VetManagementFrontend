import { useContext } from "react";
import { PetContext } from "../contexts/PetContext";

const usePet = () => {
  const context = useContext(PetContext);

  if (!context) {
    throw new Error("usePet must be used within a PetContextProvider");
  }

  return context;
};

export default usePet;
