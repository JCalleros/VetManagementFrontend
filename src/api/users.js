import { post, put, get } from "../services/httpService";

export const createUser = async (userData) => {
  return await post(`/v1/users/`, userData);
};

export const updateUser = async (authToken) => {
  return await put(`/v1/users/me/`, authToken);
};

export const getUser = async (authToken) => {
  return await get(`/v1/users/me/`, authToken);
};
