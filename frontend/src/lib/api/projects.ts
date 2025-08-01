import apiClient from "./client";
import { Project, CreateProjectRequest } from "../../types";

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await apiClient.get("/projects");
    return response.data;
  },

  create: async (projectData: CreateProjectRequest): Promise<Project> => {
    const response = await apiClient.post("/projects", projectData);
    return response.data;
  },

  delete: async (id: number): Promise<Project> => {
    const response = await apiClient.delete(`/projects/${id}`);
    return response.data;
  },
};
