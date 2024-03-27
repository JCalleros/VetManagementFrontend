import { get, post } from "../services/httpService";

export const getPets = async () => {
  return await get("/v1/pets/");
};

export const createPet = async (petData) => {
  return await post("/v1/pets/", petData);
};
