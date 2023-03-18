import { decodeToken, isExpired } from "react-jwt";
import apiService from "./api.service";
import storageService from "./storage.service";

export const login = async (email: string, password: string) => {
  try {
    const response: any = await apiService.post("/auth/login", {
      email,
      password,
    });
    const { token } = response.data;
    storageService.set("token", token);
    apiService.reload();
    return decodeToken(token);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const logout = () => {
  storageService.remove("token");
  apiService.reload();
};

export const getCurrentUser = async () => {
  const token = storageService.get("token");
  if (!token || isExpired(token)) {
    return null;
  }
  const user = (await apiService.get("/auth/me")).data.user;
  return user;
};
