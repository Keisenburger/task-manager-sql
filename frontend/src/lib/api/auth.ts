import apiClient from "./client";
import { LoginRequest, RegisterRequest, User } from "../../types";

export const authApi = {
  login: async (credentials: LoginRequest): Promise<User> => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<User> => {
    const response = await apiClient.post("/auth/register", userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },
};
