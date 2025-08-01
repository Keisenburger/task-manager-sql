import React from "react";
import { Project } from "../../types";
import Button from "../ui/Button";

interface ProjectCardProps {
  project: Project;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
  taskCount?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onDelete,
  isDeleting = false,
  taskCount = 0,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {project.name}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {taskCount} {taskCount === 1 ? "task" : "tasks"}
          </p>
          <div className="text-xs text-gray-500">
            Created by User #{project.userId}
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="danger"
            size="sm"
            loading={isDeleting}
            onClick={() => onDelete(project.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
