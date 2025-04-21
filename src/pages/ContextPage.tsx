
import { createContext, useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";

/**
 * Create a UserContext for this example
 * This context will provide user state and actions to update it
 */
interface User {
  id: number;
  name: string;
  isLoggedIn: boolean;
}

// Define context type with both state and actions
interface UserContextType {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
  updateName: (name: string) => void;
}

// Create context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * ContextPage Component
 * 
 * This component demonstrates:
 * 1. Creating and using Context for state management
 * 2. Solving props drilling with Context
 * 3. Providing and consuming context values
 */
const ContextPage = () => {
  // Initial user state
  const [user, setUser] = useState<User | null>(null);
  
  // Login action
  const login = (name: string) => {
    setUser({
      id: Math.floor(Math.random() * 1000),
      name,
      isLoggedIn: true
    });
  };
  
  // Logout action
  const logout = () => {
    setUser(null);
  };
  
  // Update name action
  const updateName = (name: string) => {
    if (user) {
      setUser({ ...user, name });
    }
  };
  
  // Create the context value object
  const userContextValue: UserContextType = {
    user,
    login,
    logout,
    updateName
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Context API</h1>
      <p className="text-muted-foreground mb-6">
        The Context API provides a way to share values like themes, user data, or other global state
        without explicitly passing props through every level of the component tree.
      </p>
      
      {/* Basic Context Explanation */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">What is Context API?</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Context provides a way to pass data through the component tree without having to pass props 
          down manually at every level. It solves the "props drilling" problem.
        </p>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// 1. Create a context
const MyContext = createContext<ContextType | undefined>(undefined);

// 2. Create a provider component
const MyProvider = ({ children }) => {
  const [value, setValue] = useState("data");
  
  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

// 3. Use the context in a component
const MyComponent = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error("Must be used within provider");
  
  return <div>{context.value}</div>;
};`}</pre>
        </div>
      </section>
      
      {/* Current Theme Context Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Theme Context Example</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          This app uses a theme context to manage dark/light mode. Here's how we access it:
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <CurrentThemeDisplay />
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Using the theme context we created
import { useTheme } from "@/contexts/ThemeContext";

const ThemeComponent = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};`}</pre>
        </div>
      </section>
      
      {/* User Context Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">User Context Example</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Let's create a user context to manage login state across components without props drilling.
        </p>
        
        {/* Provide context to all child components */}
        <UserContext.Provider value={userContextValue}>
          <div className="p-4 bg-muted rounded-md mb-4">
            {/* Login Form Component */}
            <LoginForm />
            
            {/* This component is deep in the tree but can access context */}
            <div className="mt-4 border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Deep Component</h3>
              <DeepComponent />
            </div>
          </div>
        </UserContext.Provider>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// 1. Create user context
interface UserContextType {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// 2. Create provider component with state and actions
const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  const login = (name: string) => {
    setUser({ id: 1, name, isLoggedIn: true });
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom hook for using this context
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

// 4. Use in components anywhere in the tree
const ProfileComponent = () => {
  const { user, logout } = useUser();
  
  return user ? (
    <div>
      <p>Welcome, {user.name}</p>
      <button onClick={logout}>Logout</button>
    </div>
  ) : null;
};`}</pre>
        </div>
      </section>
      
      {/* Comparison with Props Drilling */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Context vs Props Drilling</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Props Drilling</h3>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li><span className="font-medium">Explicit:</span> Clear data flow</li>
              <li><span className="font-medium">Verbose:</span> Pass props through many layers</li>
              <li><span className="font-medium">Maintainability:</span> Harder to refactor</li>
              <li><span className="font-medium">Best for:</span> Shallow component trees, component-specific data</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Context API</h3>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li><span className="font-medium">Implicit:</span> Hidden data flow</li>
              <li><span className="font-medium">Concise:</span> No need to pass props</li>
              <li><span className="font-medium">Maintainability:</span> Easier to refactor</li>
              <li><span className="font-medium">Best for:</span> Deep component trees, global data (theme, user, etc.)</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-muted rounded-md text-sm text-muted-foreground">
          <p>
            <strong>When to use Context:</strong> Theme, authenticated user, language preferences, 
            feature flags, or any data needed by many components at different nesting levels.
          </p>
          <p className="mt-2">
            <strong>When to use Props:</strong> Component-specific data that is only needed by
            direct children or just a few levels deep.
          </p>
        </div>
      </section>
    </div>
  );
};

// ========================
// Child Components
// ========================

/**
 * CurrentThemeDisplay Component
 * Demonstrates using the theme context
 */
const CurrentThemeDisplay = () => {
  // Use the theme context we created in ThemeContext.tsx
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="flex flex-col gap-2">
      <p>
        Current app theme: <span className="font-medium">{theme}</span>
      </p>
      <Button onClick={toggleTheme} size="sm">
        Toggle Theme
      </Button>
      <p className="text-xs text-muted-foreground mt-2">
        This component accesses theme data directly from context without props!
      </p>
    </div>
  );
};

/**
 * Custom hook for using UserContext
 */
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};

/**
 * LoginForm Component
 * Uses the user context
 */
const LoginForm = () => {
  const { user, login, logout } = useUser();
  const [name, setName] = useState("");
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
      setName("");
    }
  };
  
  if (user?.isLoggedIn) {
    return (
      <div className="p-3 bg-secondary rounded">
        <p className="mb-2">
          Welcome, <span className="font-medium">{user.name}</span>!
        </p>
        <p className="text-xs mb-2">User ID: {user.id}</p>
        <Button variant="outline" size="sm" onClick={logout}>
          Logout
        </Button>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2">
      <p className="text-sm">Please log in:</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="px-2 py-1 border rounded flex-1"
          required
        />
        <Button type="submit" size="sm">Login</Button>
      </div>
    </form>
  );
};

/**
 * DeepComponent - Deeply nested yet can access context
 */
const DeepComponent = () => {
  const { user, updateName } = useUser();
  const [newName, setNewName] = useState("");
  
  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
      updateName(newName);
      setNewName("");
    }
  };
  
  if (!user) {
    return (
      <p className="text-sm text-muted-foreground">
        Please log in to see this content. This component knows you're not logged in
        through context without any props being passed!
      </p>
    );
  }
  
  return (
    <div className="p-3 bg-background border rounded">
      <p className="text-sm mb-2">
        This deeply nested component has direct access to user context.
      </p>
      
      <form onSubmit={handleUpdateName} className="flex flex-col gap-2">
        <p className="text-xs text-muted-foreground">Update your name:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="New name"
            className="px-2 py-1 border rounded flex-1 text-sm"
          />
          <Button type="submit" size="sm" variant="outline">
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContextPage;
