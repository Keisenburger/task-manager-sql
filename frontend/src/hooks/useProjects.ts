import { useQuery, useMutation, useQueryClient } from "react-query";
import { projectsApi } from "../lib/api/projects";
import { Project, CreateProjectRequest } from "../types";

export const useProjects = () => {
  const queryClient = useQueryClient();

  const {
    data: projects = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Project[], Error>(["projects"], projectsApi.getAll);

  const createProjectMutation = useMutation<
    Project,
    Error,
    CreateProjectRequest
  >((projectData) => projectsApi.create(projectData), {
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });

  const deleteProjectMutation = useMutation<Project, Error, number>(
    (id) => projectsApi.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["projects"]);
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );

  return {
    projects,
    isLoading,
    error,
    refetch,
    createProject: createProjectMutation.mutate,
    deleteProject: deleteProjectMutation.mutate,
    isCreating: createProjectMutation.isLoading,
    isDeleting: deleteProjectMutation.isLoading,
  };
};
