import { useQuery, useMutation, useQueryClient } from "react-query";
import { tasksApi } from "../lib/api/tasks";
import { Task, CreateTaskRequest, UpdateTaskRequest } from "../types";

export const useTasks = () => {
  const queryClient = useQueryClient();

  const {
    data: tasks = [],
    isLoading,
    error,
    refetch,
  } = useQuery<Task[], Error>(["tasks"], tasksApi.getAll);

  const createTaskMutation = useMutation<Task, Error, CreateTaskRequest>(
    (taskData) => tasksApi.create(taskData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );

  const updateTaskMutation = useMutation<
    Task,
    Error,
    { id: number; data: UpdateTaskRequest }
  >(({ id, data }) => tasksApi.update(id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const deleteTaskMutation = useMutation<Task, Error, number>(
    (id) => tasksApi.delete(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks"]);
      },
    }
  );

  return {
    tasks,
    isLoading,
    error,
    refetch,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    isCreating: createTaskMutation.isLoading,
    isUpdating: updateTaskMutation.isLoading,
    isDeleting: deleteTaskMutation.isLoading,
  };
};
