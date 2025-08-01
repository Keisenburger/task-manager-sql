import { useMutation, useQueryClient } from "react-query";
import { authApi } from "../lib/api/auth";
import { LoginRequest, RegisterRequest, User } from "../types";

export const useAuth = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation<User, Error, LoginRequest>(
    (credentials) => authApi.login(credentials),
    {
      onSuccess: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("authToken", "dummy-token"); // In real app, get from response
        queryClient.invalidateQueries(["projects"]);
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );

  const registerMutation = useMutation<User, Error, RegisterRequest>(
    (userData) => authApi.register(userData),
    {
      onSuccess: (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("authToken", "dummy-token"); // In real app, get from response
        queryClient.invalidateQueries(["projects"]);
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );

  const logout = () => {
    authApi.logout();
    queryClient.clear();
  };

  const getCurrentUser = (): User | null => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  };

  const isAuthenticated = (): boolean => {
    return !!localStorage.getItem("authToken");
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    getCurrentUser,
    isAuthenticated,
    isLoading: loginMutation.isLoading || registerMutation.isLoading,
    error: loginMutation.error || registerMutation.error,
  };
};
