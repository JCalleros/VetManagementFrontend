import { get, post } from "../services/httpService";

export const getOwners = async () => {
  return await get("v1/pets/owners/");
};

export const createOwner = async (ownerData) => {
  return await post("v1/pets/owners/", ownerData);
};
