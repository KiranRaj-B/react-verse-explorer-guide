
import { createContext, useContext, useEffect, useState } from "react";

// Define the shape of our context data
type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider Component
 * 
 * This component:
 * 1. Creates and manages theme state (dark/light)
 * 2. Persists theme preference in localStorage
 * 3. Provides theme context to all child components
 * 4. Syncs theme with system preference
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // useState hook to track current theme state
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize theme from localStorage or system preference
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme) return savedTheme;
      
      // Check system preference
      const systemPreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return systemPreference ? "dark" : "light";
    }
    return "light"; // Default fallback
  });

  // Toggle theme function - switches between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      // Save to localStorage for persistence
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // useEffect hook to apply theme class to document
  useEffect(() => {
    // Apply theme class to document element
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  // Create context value object with theme state and toggle function
  const contextValue = {
    theme,
    toggleTheme,
  };

  // Provide the context value to all children
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook for using theme context
 * 
 * This custom hook:
 * 1. Accesses the ThemeContext
 * 2. Throws an error if used outside a ThemeProvider
 * 3. Returns the theme context value
 * 
 * @returns {ThemeContextType} Theme context with current theme and toggle function
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  
  return context;
}
