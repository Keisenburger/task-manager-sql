# Task Manager Frontend

A React TypeScript frontend for the Task Manager application, built with modern web technologies.

## Features

- **Authentication**: Login and registration with form validation
- **Project Management**: Create, view, and delete projects
- **Task Management**: Create, update, and delete tasks with project association
- **Modern UI**: Built with Tailwind CSS for a clean, responsive design
- **Type Safety**: Full TypeScript support with proper type definitions
- **State Management**: React Query for efficient data fetching and caching
- **Form Handling**: React Hook Form for form validation and management

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Query** for data fetching and caching
- **React Router** for navigation
- **React Hook Form** for form handling
- **Axios** for HTTP requests
- **Lucide React** for icons

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── projects/       # Project-related components
│   ├── tasks/          # Task-related components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── lib/
│   └── api/           # API client and services
├── pages/             # Page components
└── types/             # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Backend server running on port 3001

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## API Integration

The frontend is configured to communicate with the backend API running on `http://localhost:3001`. The API endpoints include:

- **Authentication**: `/auth/login`, `/auth/register`
- **Projects**: `/projects` (GET, POST, DELETE)
- **Tasks**: `/tasks` (GET, POST, PUT, DELETE)

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3001
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
