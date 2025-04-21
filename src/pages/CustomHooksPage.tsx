
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * Custom hook for window size
 * Returns the current window dimensions
 */
function useWindowSize() {
  // Initialize state with undefined to know when it's been measured
  const [windowSize, setWindowSize] = useState<{ width: number | undefined; height: number | undefined }>({
    width: undefined,
    height: undefined,
  });
  
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures effect runs only on mount and unmount
  
  return windowSize;
}

/**
 * Custom hook for localStorage
 * Provides a state variable that persists in localStorage
 */
function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });
  
  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error);
    }
  };
  
  return [storedValue, setValue] as const;
}

/**
 * Custom hook for a timer
 * Counts seconds and provides start/stop/reset functions
 */
function useTimer(initialSeconds = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);
  
  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };
  
  return { seconds, isActive, start, pause, reset };
}

/**
 * Custom hook for API fetching
 * Handles loading, error states, and data fetching
 */
function useFetch<T>(url: string, options = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const json = await response.json();
        
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('An unknown error occurred'));
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(options)]);
  
  return { data, loading, error };
}

/**
 * CustomHooksPage Component
 * 
 * This component demonstrates:
 * 1. Creating and using custom hooks
 * 2. Composing hooks for reusable logic
 * 3. Hook naming conventions
 * 4. Real-world hook examples
 */
const CustomHooksPage = () => {
  // Using our custom hooks
  const windowSize = useWindowSize();
  const [favoriteColor, setFavoriteColor] = useLocalStorage<string>("favoriteColor", "blue");
  const timer = useTimer();
  
  // Using the fetch hook for some data
  const { data, loading, error } = useFetch<{ title: string; body: string }>(
    'https://jsonplaceholder.typicode.com/posts/1'
  );
  
  // Color options for the color picker
  const colorOptions = ["blue", "red", "green", "purple", "orange"];
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Custom Hooks</h1>
      <p className="text-muted-foreground mb-6">
        Custom hooks allow you to extract component logic into reusable functions.
        They follow the use* naming convention and can call other hooks.
      </p>
      
      {/* What are Custom Hooks */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">What are Custom Hooks?</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Custom hooks are JavaScript functions that use React hooks and can be shared between components.
          They let you extract stateful logic so it can be reused without duplicating code.
        </p>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Basic structure of a custom hook
function useMyHook(initialValue) {
  // Use React hooks here
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Side effects here
  }, [dependencies]);
  
  // Return values or functions
  return {
    state,
    updateState: setState
  };
}

// Using the hook in a component
function MyComponent() {
  const { state, updateState } = useMyHook('initial');
  return <div>{state}</div>;
}`}</pre>
        </div>
        
        <div className="mt-4 p-3 bg-secondary/50 rounded text-sm">
          <p className="font-medium">Custom Hook Rules</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
            <li>Must start with "use" (e.g., useWindowSize, useFetch)</li>
            <li>Can call other hooks</li>
            <li>Should follow the rules of hooks</li>
            <li>Can return anything (values, functions, objects)</li>
          </ul>
        </div>
      </section>
      
      {/* useWindowSize Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">useWindowSize Hook</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          A hook that monitors and returns the current window dimensions.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <p className="text-center p-3 bg-background rounded border">
            <span className="block mb-2 text-sm font-medium">Current Window Size</span>
            <span className="text-xl">
              {windowSize.width} × {windowSize.height}
            </span>
            <span className="block mt-2 text-xs text-muted-foreground">
              Resize your browser window to see it change
            </span>
          </p>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array = only run on mount & unmount
  
  return windowSize;
}

// Usage in component
const MyComponent = () => {
  const { width, height } = useWindowSize();
  return <div>Window size: {width} x {height}</div>;
};`}</pre>
        </div>
      </section>
      
      {/* useLocalStorage Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">useLocalStorage Hook</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          A hook that syncs state with localStorage for persistence.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="mb-3">
            <p className="mb-2 text-sm font-medium">Your favorite color: <span className="capitalize">{favoriteColor}</span></p>
            <div className="flex flex-wrap gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  onClick={() => setFavoriteColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    favoriteColor === color ? 'border-white shadow-lg' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Set favorite color to ${color}`}
                />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            This preference will persist even if you refresh the page because it's stored in localStorage.
          </p>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`function useLocalStorage(key, initialValue) {
  // State to store our value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Function to update stored value and localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function
      const valueToStore = 
        value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage example
const [name, setName] = useLocalStorage('name', 'John');`}</pre>
        </div>
      </section>
      
      {/* useTimer Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">useTimer Hook</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          A hook that implements timer functionality with start, pause, and reset.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="text-center p-3 bg-background rounded border">
            <p className="text-sm font-medium mb-2">Timer</p>
            <p className="text-4xl mb-3">{timer.seconds}s</p>
            <div className="flex justify-center gap-3">
              {!timer.isActive ? (
                <Button onClick={timer.start} size="sm">Start</Button>
              ) : (
                <Button onClick={timer.pause} size="sm">Pause</Button>
              )}
              <Button onClick={timer.reset} size="sm" variant="outline">Reset</Button>
            </div>
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`function useTimer(initialSeconds = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);
  
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive]);
  
  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };
  
  return { seconds, isActive, start, pause, reset };
}

// Usage example
const TimerComponent = () => {
  const { seconds, isActive, start, pause, reset } = useTimer();
  
  return (
    <div>
      <p>{seconds}s</p>
      <button onClick={isActive ? pause : start}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};`}</pre>
        </div>
      </section>
      
      {/* useFetch Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">useFetch Hook</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          A hook for data fetching that handles loading and error states.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="p-3 bg-background rounded border">
            <h3 className="text-sm font-medium mb-2">Fetched Post Data</h3>
            
            {loading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-sm">
                <p>Error fetching data: {error.message}</p>
              </div>
            ) : data ? (
              <div>
                <h4 className="font-medium">{data.title}</h4>
                <p className="text-sm mt-1">{data.body}</p>
              </div>
            ) : null}
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, options);
        
        if (!response.ok) {
          throw new Error(\`HTTP error! Status: \${response.status}\`);
        }
        
        const json = await response.json();
        
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [url, JSON.stringify(options)]);
  
  return { data, loading, error };
}

// Usage example
const { data, loading, error } = useFetch('https://api.example.com/posts/1');`}</pre>
        </div>
      </section>
      
      {/* Benefits and Best Practices */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Benefits & Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Benefits of Custom Hooks</h3>
            <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
              <li>Code reuse across components</li>
              <li>Better organization and separation of concerns</li>
              <li>Simpler component logic</li>
              <li>Easier testing of logic</li>
              <li>Composability - hooks can use other hooks</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Best Practices</h3>
            <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
              <li>Start hook names with "use"</li>
              <li>Keep hooks focused on a single responsibility</li>
              <li>Document hook parameters and return values</li>
              <li>Test hooks separately from components</li>
              <li>Consider creating a hooks directory in your project</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-secondary/50 rounded text-sm">
          <p className="font-medium">When to Create a Custom Hook</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
            <li>When you find yourself duplicating stateful logic across components</li>
            <li>When side effect logic is complex and clutters your component</li>
            <li>When you want to create a reusable abstraction</li>
            <li>When integrating with external libraries or APIs</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default CustomHooksPage;
