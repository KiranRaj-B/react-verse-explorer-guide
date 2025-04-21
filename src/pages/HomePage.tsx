
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

/**
 * HomePage Component
 * 
 * This component:
 * 1. Serves as the landing page for our React learning app
 * 2. Provides an overview of what will be covered
 * 3. Links to different concept sections
 */
const HomePage = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to React Explorer</h1>
        <p className="text-muted-foreground">
          A step-by-step guide to learn React core concepts with TypeScript and Tailwind CSS
        </p>
      </header>
      
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">What You'll Learn</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Core Concepts Section */}
          <div>
            <h3 className="font-medium mb-2 text-primary">Core Concepts</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Functional Components</li>
              <li>React Hooks (useState, useEffect, useContext, etc.)</li>
              <li>Props and Component Communication</li>
              <li>Conditional Rendering</li>
              <li>Lists and Keys</li>
            </ul>
          </div>
          
          {/* Advanced Features Section */}
          <div>
            <h3 className="font-medium mb-2 text-primary">Advanced Features</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Forms with Controlled Inputs</li>
              <li>API Data Fetching</li>
              <li>Custom Hooks</li>
              <li>Context API for State Management</li>
              <li>Practical Todo App</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Getting Started Section */}
      <div className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Getting Started</h2>
        <p className="mb-4">
          Each section of this app explains a specific React concept with examples and code snippets.
          Navigate through the sections using the sidebar menu to learn at your own pace.
        </p>
        
        <Link to="/hooks">
          <Button>Start Learning React Hooks</Button>
        </Link>
      </div>
      
      {/* Project Info Section */}
      <div className="bg-muted rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-3">About This Project</h2>
        <p className="text-sm text-muted-foreground">
          This application is built using:
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground mt-2">
          <li>React with TypeScript</li>
          <li>Vite for fast development</li>
          <li>Tailwind CSS for styling</li>
          <li>React Router for navigation</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
