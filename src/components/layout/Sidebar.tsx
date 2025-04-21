
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Navigation item structure
 */
interface NavItem {
  path: string;
  label: string;
  description: string;
}

/**
 * Navigation data for our React learning sections
 */
const navItems: NavItem[] = [
  {
    path: "/",
    label: "Home",
    description: "Introduction and overview"
  },
  {
    path: "/hooks",
    label: "React Hooks",
    description: "useState, useEffect, useRef, useReducer, useMemo, and useCallback"
  },
  {
    path: "/props",
    label: "Props",
    description: "Component props and props drilling"
  },
  {
    path: "/context",
    label: "Context API",
    description: "Using Context for state management"
  },
  {
    path: "/conditionals",
    label: "Conditional Rendering",
    description: "Rendering based on conditions"
  },
  {
    path: "/lists",
    label: "Lists & Keys",
    description: "Rendering lists efficiently"
  },
  {
    path: "/forms",
    label: "Forms",
    description: "Working with forms and controlled inputs"
  },
  {
    path: "/api",
    label: "API Fetching",
    description: "Data fetching with useEffect"
  },
  {
    path: "/custom-hooks",
    label: "Custom Hooks",
    description: "Creating reusable hook logic"
  },
  {
    path: "/todo-app",
    label: "Todo App",
    description: "Combining concepts in a mini-application"
  }
];

/**
 * Sidebar Component
 * 
 * This component:
 * 1. Provides navigation for the application
 * 2. Shows the current route with active styling
 * 3. Implements responsive design with mobile toggle
 * 4. Demonstrates useState and conditional rendering
 */
const Sidebar = () => {
  // useState hook to manage sidebar visibility on mobile
  const [isOpen, setIsOpen] = useState(false);
  // useLocation hook from react-router to get current path
  const location = useLocation();
  
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      {/* Mobile sidebar toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      
      {/* Sidebar container - responsive design with conditional classes */}
      <div 
        className={cn(
          "bg-muted w-64 shrink-0 border-r border-border transition-all duration-300 overflow-auto",
          isOpen ? "fixed inset-y-0 left-0 z-40" : "hidden md:block"
        )}
      >
        <div className="p-4">
          <h1 className="font-bold text-xl mb-2">React Explorer</h1>
          <p className="text-sm text-muted-foreground mb-6">Learn React step-by-step</p>
          
          {/* Navigation items list */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  location.pathname === item.path 
                    ? "bg-accent text-accent-foreground font-medium" 
                    : "text-foreground"
                )}
                onClick={() => setIsOpen(false)}
              >
                <div>{item.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
