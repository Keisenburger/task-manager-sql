import apiClient from "./client";
import { Task, CreateTaskRequest, UpdateTaskRequest } from "../../types";

export const tasksApi = {
  getAll: async (): Promise<Task[]> => {
    const response = await apiClient.get("/tasks");
    return response.data;
  },

  create: async (taskData: CreateTaskRequest): Promise<Task> => {
    const response = await apiClient.post("/tasks", taskData);
    return response.data;
  },

  update: async (id: number, taskData: UpdateTaskRequest): Promise<Task> => {
    const response = await apiClient.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  delete: async (id: number): Promise<Task> => {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  },
};
