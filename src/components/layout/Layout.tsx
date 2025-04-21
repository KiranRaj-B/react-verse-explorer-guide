
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

/**
 * Layout Component
 * 
 * This component:
 * 1. Provides the main application layout structure
 * 2. Includes the sidebar navigation and main content area
 * 3. Uses React Router's Outlet to render child routes
 */
const Layout = () => {
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar for navigation */}
      <Sidebar />
      
      {/* Main content area */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        {/* Top bar with theme toggle */}
        <div className="flex justify-end mb-4">
          <ThemeToggle />
        </div>
        
        {/* Outlet renders the current route's component */}
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
