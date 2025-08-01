import React, { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";
import { useAuth } from "../hooks/useAuth";
import ProjectCard from "../components/projects/ProjectCard";
import TaskTable from "../components/tasks/TaskTable";
import CreateProjectForm from "../components/projects/CreateProjectForm";
import CreateTaskForm from "../components/tasks/CreateTaskForm";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

const DashboardPage: React.FC = () => {
  const { projects, deleteProject, isDeleting } = useProjects();
  const {
    tasks,
    updateTask,
    deleteTask,
    isUpdating,
    isDeleting: isDeletingTask,
  } = useTasks();
  const { logout, getCurrentUser } = useAuth();

  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);

  const user = getCurrentUser();

  const handleDeleteProject = (id: number) => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? This will also delete all associated tasks."
      )
    ) {
      deleteProject(id);
    }
  };

  const handleDeleteTask = (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(id);
    }
  };

  const handleUpdateTask = (
    id: number,
    data: { completed?: boolean; title?: string; projectId?: number }
  ) => {
    updateTask({ id, data });
  };

  const getTaskCountForProject = (projectId: number) => {
    return tasks.filter((task) => task.projectId === projectId).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.email}
              </span>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Projects Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
            <Button onClick={() => setShowCreateProject(true)}>
              Create Project
            </Button>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-gray-500">
                No projects yet. Create your first project to get started!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onDelete={handleDeleteProject}
                  isDeleting={isDeleting}
                  taskCount={getTaskCountForProject(project.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Tasks Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
            <Button onClick={() => setShowCreateTask(true)}>Create Task</Button>
          </div>

          <div className="bg-white shadow rounded-lg">
            <TaskTable
              tasks={tasks}
              projects={projects}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              isUpdating={isUpdating}
              isDeleting={isDeletingTask}
            />
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      <Modal
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
        title="Create New Project"
      >
        <CreateProjectForm
          onSuccess={() => setShowCreateProject(false)}
          onCancel={() => setShowCreateProject(false)}
        />
      </Modal>

      {/* Create Task Modal */}
      <Modal
        isOpen={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        title="Create New Task"
      >
        <CreateTaskForm
          projects={projects}
          onSuccess={() => setShowCreateTask(false)}
          onCancel={() => setShowCreateTask(false)}
        />
      </Modal>
    </div>
  );
};

export default DashboardPage;
