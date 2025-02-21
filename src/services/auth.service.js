import { requestHandler } from "@/services/requestHandler";
import { apiRoutes } from "../utils/api-routes";
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

export const loginService = async (formdata) =>
  await requestHandler(
    "post",
    apiRoutes.auth.login,
    formdata,
    {},
    { username: CLIENT_ID, password: CLIENT_SECRET }
  );
export const registerService = async (formdata) =>
  await requestHandler(
    "post",
    apiRoutes.auth.register,
    formdata,
    {},
    { username: CLIENT_ID, password: CLIENT_SECRET }
  );
