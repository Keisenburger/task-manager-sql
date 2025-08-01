import React from "react";
import { useForm } from "react-hook-form";
import { useProjects } from "../../hooks/useProjects";
import { useAuth } from "../../hooks/useAuth";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { ProjectFormData } from "../../types";

interface CreateProjectFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { createProject, isCreating } = useProjects();
  const { getCurrentUser } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>();

  const onSubmit = (data: ProjectFormData) => {
    const user = getCurrentUser();
    if (!user) return;

    createProject(
      { ...data, userId: user.id },
      {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      }
    );
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Project Name"
        {...register("name", {
          required: "Project name is required",
          minLength: {
            value: 2,
            message: "Project name must be at least 2 characters",
          },
        })}
        error={errors.name?.message}
        placeholder="Enter project name"
      />

      <div className="flex space-x-3">
        <Button type="submit" loading={isCreating} className="flex-1">
          Create Project
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

export default CreateProjectForm;
