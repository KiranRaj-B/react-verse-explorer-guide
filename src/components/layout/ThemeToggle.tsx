
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * ThemeToggle Component
 * 
 * This component:
 * 1. Displays a button that toggles between light and dark themes
 * 2. Uses the useTheme custom hook to access theme context
 * 3. Shows Sun/Moon icon based on current theme
 */
const ThemeToggle = () => {
  // useTheme is a custom hook that provides access to theme context
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={toggleTheme} 
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {/* Conditional rendering based on current theme */}
      {theme === "light" ? (
        <Moon className="h-5 w-5" /> 
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ThemeToggle;
