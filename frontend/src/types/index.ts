export interface User {
  id: number;
  email: string;
  password: string;
  projects?: Project[];
}

export interface Project {
  id: number;
  name: string;
  userId: number;
  user?: User;
  tasks?: Task[];
}

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  projectId: number;
  project?: Project;
  createdAt: string;
}

// API Request/Response types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface CreateProjectRequest {
  name: string;
  userId: number;
}

export interface CreateTaskRequest {
  title: string;
  projectId: number;
}

export interface UpdateTaskRequest {
  title?: string;
  projectId?: number;
  completed?: boolean;
}

// Form validation schemas
export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProjectFormData {
  name: string;
}

export interface TaskFormData {
  title: string;
  projectId: number;
}
