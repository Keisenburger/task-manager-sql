import React from "react";
import { useForm } from "react-hook-form";
import { useTasks } from "../../hooks/useTasks";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { TaskFormData, Project } from "../../types";

interface CreateTaskFormProps {
  projects: Project[];
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({
  projects,
  onSuccess,
  onCancel,
}) => {
  const { createTask, isCreating } = useTasks();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormData>();

  const onSubmit = (data: TaskFormData) => {
    createTask(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Task Title"
        {...register("title", {
          required: "Task title is required",
          minLength: {
            value: 2,
            message: "Task title must be at least 2 characters",
          },
        })}
        error={errors.title?.message}
        placeholder="Enter task title"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Project
        </label>
        <select
          {...register("projectId", {
            required: "Please select a project",
          })}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        {errors.projectId && (
          <p className="text-sm text-red-600 mt-1">
            {errors.projectId.message}
          </p>
        )}
      </div>

      <div className="flex space-x-3">
        <Button type="submit" loading={isCreating} className="flex-1">
          Create Task
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isCreating}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default CreateTaskForm;
