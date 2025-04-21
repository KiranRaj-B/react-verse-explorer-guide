
# React Explorer - Learning Journey

A comprehensive step-by-step guide to learning React with TypeScript and Tailwind CSS. This project is designed to help you understand all the major React concepts through interactive examples and clear explanations.

## Project Overview

React Explorer is an educational application that walks you through React core concepts with code examples and interactive demonstrations. The app itself is built with the technologies it teaches.

## What You'll Learn

- **Functional Components**: Building React apps with functional components
- **React Hooks**: Understanding useState, useEffect, useContext, useRef, useReducer, useMemo, and useCallback
- **Props & Component Communication**: Passing data between components, props drilling
- **Context API**: State management and solving props drilling
- **Conditional Rendering**: Rendering UI based on conditions
- **Lists & Keys**: Efficiently rendering lists of data
- **Forms**: Working with forms and controlled inputs
- **API Fetching**: Making API requests with useEffect
- **Custom Hooks**: Creating reusable logic
- **Routing**: Navigation with React Router
- **Dark Mode**: Theme switching with Context API
- **Todo App**: A mini-application that combines multiple concepts
- **LocalStorage**: Persisting state in the browser

## Running the Project

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd react-explorer

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── layout/       # Layout components like Sidebar, ThemeToggle
│   └── ui/           # UI components from shadcn/ui
├── contexts/         # React Context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
├── pages/            # Route components
└── App.tsx           # Main application component
```

## Key Features

1. **Interactive Examples**: Each concept has interactive examples you can play with
2. **Clear Code Explanations**: Extensively commented code to explain what's happening
3. **Dark/Light Mode**: Toggle between themes with a context-based implementation
4. **Responsive Design**: Works on mobile and desktop viewports
5. **Todo Application**: A practical application combining multiple React concepts
6. **LocalStorage Persistence**: Data persists between page refreshes

## Technologies Used

- React 18
- TypeScript
- Vite (for fast development)
- Tailwind CSS (for styling)
- React Router (for navigation)
- shadcn/ui (for UI components)

## Learning Path

The application is organized to provide a step-by-step learning experience:

1. Start with the basics of React Hooks
2. Learn about component communication with props
3. Understand state management with Context
4. Master conditional rendering and lists
5. Learn form handling and API data fetching
6. Create custom hooks for reusable logic
7. Build a complete Todo application that combines all concepts

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
