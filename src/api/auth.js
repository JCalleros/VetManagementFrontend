import { post } from "../services/httpService";

export const login = async (userData) => {
  return await post("/v1/auth/token/", userData);
};

export const refresh = async () => {
  return await post("/v1/auth/token/refresh/");
};

export const verify = async () => {
  return await post("/v1/auth/token/verify/");
};
