import { get, post, remove, put } from "../../services/httpService";

export const getOwners = async () => {
  return await get("v1/pets/owners/");
};

export const addOwner = async (ownerData) => {
  return await post("v1/pets/owners/", ownerData);
};

export const deleteOwner = async (ownerId) => {
  return await remove(`/v1/pets/owners/${ownerId}/`);
};

export const updateOwner = async (ownerId, ownerData) => {
  return await put(`/v1/pets/owners/${ownerId}/`, ownerData);
};
