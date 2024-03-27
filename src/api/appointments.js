import { get } from "../services/httpService";

export const getAppointments = async () => {
  return await get("/v1/appointments/");
};
