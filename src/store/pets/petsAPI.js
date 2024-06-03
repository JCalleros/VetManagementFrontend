import { get, post, remove, put } from "../../services/httpService";

export const getPets = async () => {
  return await get("/v1/pets/");
};

export const addPet = async (petData) => {
  return await post("/v1/pets/", petData);
};

export const deletePet = async (petId) => {
  return await remove(`/v1/pets/${petId}/`);
};

export const updatePet = async (petId, petData) => {
  return await put(`/v1/pets/${petId}/`, petData);
};
