
import { useState, useEffect, useRef, useReducer, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";

/**
 * HooksPage Component
 * 
 * This component demonstrates various React hooks:
 * - useState: For managing state
 * - useEffect: For side effects
 * - useRef: For persistent values and DOM access
 * - useReducer: For complex state logic
 * - useMemo: For memoizing expensive calculations
 * - useCallback: For memoizing functions
 */
const HooksPage = () => {
  // =========== useState Example ===========
  // useState hook manages component state
  // The first value is the current state, the second is a function to update it
  const [count, setCount] = useState<number>(0);
  
  // =========== useEffect Example ===========
  // useEffect hook handles side effects
  // This effect runs after every render where count changes
  useEffect(() => {
    // Update the document title with the current count
    document.title = `Count: ${count}`;
    
    // Optional cleanup function that runs before the next effect or unmount
    return () => {
      document.title = "React Explorer";
    };
  }, [count]); // Dependency array - only run when count changes
  
  // This effect runs only once after the first render (empty dependency array)
  useEffect(() => {
    console.log("Component mounted");
    
    // Cleanup function runs when component unmounts
    return () => {
      console.log("Component will unmount");
    };
  }, []); // Empty array means "run only on mount and unmount"
  
  // =========== useRef Example ===========
  // useRef hook creates a mutable reference that persists across renders
  // Unlike state, updating a ref doesn't cause a re-render
  const inputRef = useRef<HTMLInputElement>(null);
  const renderCountRef = useRef<number>(0);
  
  // Track renders without causing re-renders
  useEffect(() => {
    renderCountRef.current += 1;
  });
  
  // Focus the input element
  const focusInput = () => {
    // Access the current DOM element and call focus
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // =========== useReducer Example ===========
  // Define state shape and possible actions
  type CounterState = { value: number };
  type CounterAction = 
    | { type: "INCREMENT"; payload: number }
    | { type: "DECREMENT"; payload: number }
    | { type: "RESET" };
  
  // Reducer function to handle state updates based on actions
  const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
    switch (action.type) {
      case "INCREMENT":
        return { value: state.value + action.payload };
      case "DECREMENT":
        return { value: state.value - action.payload };
      case "RESET":
        return { value: 0 };
      default:
        return state;
    }
  };
  
  // useReducer hook for more complex state logic
  // First param is the reducer function, second is initial state
  const [counterState, dispatch] = useReducer(counterReducer, { value: 0 });
  
  // =========== useMemo Example ===========
  // useMemo memoizes a computed value - only recalculates when dependencies change
  const expensiveValue = useMemo(() => {
    console.log("Computing expensive value...");
    // Simulate expensive calculation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += i;
    }
    return result + count;
  }, [count]); // Only recalculate when count changes
  
  // =========== useCallback Example ===========
  // useCallback memoizes a function - only recreates when dependencies change
  // Useful for optimizing child component renders
  const incrementCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []); // Empty dependency array means function never changes
  
  // A function that depends on state, so it needs count in dependencies
  const incrementByValue = useCallback((value: number) => {
    setCount((prevCount) => prevCount + value);
  }, []);
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">React Hooks</h1>
      <p className="text-muted-foreground mb-6">
        Hooks let you use state and other React features without writing classes.
        Here we'll explore the built-in hooks and how they work.
      </p>
      
      {/* useState Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">useState Hook</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          useState lets you add state to functional components.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <p className="mb-2">Current count: <span className="font-semibold">{count}</span></p>
          <div className="flex gap-2">
            <Button onClick={() => setCount(count - 1)}>Decrement</Button>
            <Button onClick={() => setCount(count + 1)}>Increment</Button>
            <Button variant="outline" onClick={() => setCount(0)}>Reset</Button>
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// useState example
const [count, setCount] = useState<number>(0);

// Update state with a new value
setCount(count + 1);

// Update state based on previous state
setCount(prevCount => prevCount + 1);`}</pre>
        </div>
      </section>
      
      {/* useEffect Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">useEffect Hook</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          useEffect performs side effects in functional components. The document title has been 
          updated to show the current count ({count}).
        </p>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// useEffect runs after render
useEffect(() => {
  // Side effect code
  document.title = \`Count: \${count}\`;
  
  // Optional cleanup function
  return () => {
    document.title = "React Explorer";
  };
}, [count]); // Dependency array`}</pre>
        </div>
      </section>
      
      {/* useRef Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">useRef Hook</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          useRef creates a mutable reference that persists across renders. It's useful for 
          accessing DOM elements or storing values that don't trigger re-renders.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <p className="mb-2">Component has rendered {renderCountRef.current} times</p>
          <div className="flex gap-2 mb-2">
            <input
              ref={inputRef}
              type="text"
              className="border rounded px-2 py-1 w-full"
              placeholder="Click the button to focus this input"
            />
            <Button onClick={focusInput}>Focus Input</Button>
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// DOM reference
const inputRef = useRef<HTMLInputElement>(null);

// Mutable value reference
const renderCountRef = useRef<number>(0);

// Accessing a DOM element
if (inputRef.current) {
  inputRef.current.focus();
}

// Updating a ref (doesn't cause re-render)
renderCountRef.current += 1;`}</pre>
        </div>
      </section>
      
      {/* useReducer Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">useReducer Hook</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          useReducer manages complex state logic with a reducer function and actions,
          similar to how Redux works.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <p className="mb-2">Reducer count: <span className="font-semibold">{counterState.value}</span></p>
          <div className="flex gap-2">
            <Button onClick={() => dispatch({ type: "DECREMENT", payload: 1 })}>
              Decrement
            </Button>
            <Button onClick={() => dispatch({ type: "INCREMENT", payload: 1 })}>
              Increment
            </Button>
            <Button onClick={() => dispatch({ type: "RESET" })}>
              Reset
            </Button>
            <Button onClick={() => dispatch({ type: "INCREMENT", payload: 5 })}>
              +5
            </Button>
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Define reducer function
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + action.payload };
    case "DECREMENT":
      return { value: state.value - action.payload };
    case "RESET":
      return { value: 0 };
    default:
      return state;
  }
};

// Use reducer with initial state
const [counterState, dispatch] = useReducer(counterReducer, { value: 0 });

// Dispatch actions
dispatch({ type: "INCREMENT", payload: 1 });`}</pre>
        </div>
      </section>
      
      {/* useMemo and useCallback Examples */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">useMemo & useCallback Hooks</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          These hooks help optimize performance by memoizing values and functions.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <p className="mb-2">Memoized expensive value: <span className="font-semibold">{expensiveValue}</span></p>
          <div className="flex gap-2">
            <Button onClick={incrementCount}>
              Increment with useCallback
            </Button>
            <Button onClick={() => incrementByValue(5)}>
              Increment by 5
            </Button>
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto mb-3">
          <pre>{`// useMemo memoizes values
const expensiveValue = useMemo(() => {
  // Only calculated when dependencies change
  return someExpensiveComputation(count);
}, [count]);`}</pre>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// useCallback memoizes functions
const incrementCount = useCallback(() => {
  setCount(prevCount => prevCount + 1);
}, []); // Empty array means never recreate`}</pre>
        </div>
      </section>
    </div>
  );
};

export default HooksPage;
