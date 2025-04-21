
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * ConditionalsPage Component
 * 
 * This component demonstrates:
 * 1. Conditional rendering techniques in React
 * 2. If/else conditional rendering
 * 3. Ternary operator rendering
 * 4. Logical && operator rendering
 * 5. Switch statement rendering
 * 6. Conditional rendering with component variables
 */
const ConditionalsPage = () => {
  // State for conditional rendering examples
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [count, setCount] = useState(0);
  const [showContent, setShowContent] = useState(true);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  // Simulate status change
  const simulateStatusChange = () => {
    setStatus('loading');
    setTimeout(() => {
      // Randomly choose success or error
      const result = Math.random() > 0.5 ? 'success' : 'error';
      setStatus(result);
    }, 1500);
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Conditional Rendering</h1>
      <p className="text-muted-foreground mb-6">
        Conditional rendering is a key concept in React that allows you to render different
        components or elements based on certain conditions.
      </p>
      
      {/* If/Else Conditionals */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">If/Else Conditions</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Use if/else conditions with component variables or return statements.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="mb-3 flex items-center gap-3">
            <Button 
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              variant={isLoggedIn ? "outline" : "default"}
            >
              {isLoggedIn ? "Logout" : "Login"}
            </Button>
            <span className="text-sm">Status: {isLoggedIn ? "Logged In" : "Logged Out"}</span>
          </div>
          
          {/* Using if/else via function */}
          <div className="p-3 bg-background rounded border">
            {renderAuthStatus(isLoggedIn)}
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Using if/else in a function
function renderAuthStatus(isLoggedIn) {
  if (isLoggedIn) {
    return <p>Welcome back, user!</p>;
  } else {
    return <p>Please log in to continue.</p>;
  }
}

// Usage
<div>{renderAuthStatus(isLoggedIn)}</div>`}</pre>
        </div>
      </section>
      
      {/* Ternary Operator */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Ternary Operator</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Ternary operators provide a concise way to render different elements based on a condition.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="mb-3">
            <p className="mb-2">Count: {count}</p>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setCount(count - 1)}>Decrement</Button>
              <Button size="sm" onClick={() => setCount(count + 1)}>Increment</Button>
            </div>
          </div>
          
          {/* Using ternary operator directly in JSX */}
          <div className="p-3 bg-background rounded border">
            {count > 0 
              ? <p className="text-green-500">Count is positive!</p>
              : count < 0 
                ? <p className="text-red-500">Count is negative!</p>
                : <p className="text-blue-500">Count is zero!</p>
            }
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Using ternary operator directly in JSX
{count > 0 
  ? <p>Count is positive!</p>
  : count < 0 
    ? <p>Count is negative!</p>
    : <p>Count is zero!</p>
}`}</pre>
        </div>
      </section>
      
      {/* Logical && Operator */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Logical && Operator</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          The && operator is perfect for conditionally rendering an element when a condition is true.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="mb-3 flex items-center gap-3">
            <Button 
              onClick={() => setShowContent(!showContent)}
              variant={showContent ? "outline" : "default"}
            >
              {showContent ? "Hide Content" : "Show Content"}
            </Button>
          </div>
          
          {/* Using logical && operator */}
          <div className="p-3 bg-background rounded border min-h-[50px]">
            {showContent && (
              <div className="animate-fade-in">
                <p className="font-medium">This content is conditionally rendered!</p>
                <p className="text-sm text-muted-foreground mt-1">
                  The && operator only renders when the condition is true.
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Using logical && operator
{showContent && (
  <div>
    <p>This content only shows when showContent is true</p>
  </div>
)}

// IMPORTANT: Be careful with non-boolean values
// This might render "0" if count is 0!
{count && <p>Count: {count}</p>}

// Safer version with explicit boolean check
{count > 0 && <p>Count: {count}</p>}`}</pre>
        </div>
        
        <div className="mt-4 p-3 bg-secondary/50 rounded text-sm">
          <p className="font-medium">Warning About Logical && with Numbers</p>
          <p className="text-muted-foreground mt-1">
            Be careful when using && with numbers or other non-boolean values.
            If count is 0, the expression <code className="text-primary">{`{count && <p>...</p>}`}</code> will 
            actually render "0" instead of nothing! Always convert to a proper boolean condition
            when needed: <code className="text-primary">{`{count > 0 && <p>...</p>}`}</code>
          </p>
        </div>
      </section>
      
      {/* Switch Case Pattern */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Switch Statement Pattern</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          For multiple conditional states, a switch statement can be more readable.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="mb-3">
            <p className="mb-2">Current status: <span className="font-medium">{status}</span></p>
            <Button 
              onClick={simulateStatusChange} 
              disabled={status === 'loading'}
            >
              {status === 'idle' ? 'Start Process' : 'Retry Process'}
            </Button>
          </div>
          
          {/* Render different UI based on status */}
          <div className="p-3 bg-background rounded border">
            {renderByStatus(status)}
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Using switch statement in a function
function renderByStatus(status) {
  switch (status) {
    case 'idle':
      return <p>Ready to start</p>;
    case 'loading':
      return <p>Loading...</p>;
    case 'success':
      return <p>Operation successful!</p>;
    case 'error':
      return <p>An error occurred</p>;
    default:
      return <p>Unknown status</p>;
  }
}

// Usage
<div>{renderByStatus(status)}</div>`}</pre>
        </div>
      </section>
      
      {/* Object Mapping Pattern */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Object Mapping Pattern</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          For cleaner conditional rendering, you can use object mapping instead of switch/if statements.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="p-3 bg-background rounded border">
            {statusComponents[status]}
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Object mapping pattern
const statusComponents = {
  idle: <IdleComponent />,
  loading: <LoadingComponent />,
  success: <SuccessComponent />,
  error: <ErrorComponent />
};

// Usage - cleaner than switch/if statements
<div>{statusComponents[status]}</div>`}</pre>
        </div>
      </section>
    </div>
  );
};

// ========================
// Helper Functions & Components
// ========================

/**
 * Render auth status using if/else
 */
function renderAuthStatus(isLoggedIn: boolean) {
  if (isLoggedIn) {
    return (
      <div className="text-green-500">
        <p className="font-medium">Welcome back, user!</p>
        <p className="text-sm mt-1">You have full access to the application.</p>
      </div>
    );
  } else {
    return (
      <div className="text-muted-foreground">
        <p>Please log in to continue.</p>
        <p className="text-sm mt-1">Some features are restricted for logged-in users only.</p>
      </div>
    );
  }
}

/**
 * Render content based on status using switch
 */
function renderByStatus(status: string) {
  switch (status) {
    case 'idle':
      return (
        <div className="text-muted-foreground">
          <p>System is ready. Click the button to start.</p>
        </div>
      );
    case 'loading':
      return (
        <div className="text-blue-500 animate-pulse">
          <p>Loading...</p>
          <p className="text-sm mt-1">Please wait while we process your request.</p>
        </div>
      );
    case 'success':
      return (
        <div className="text-green-500">
          <p className="font-medium">Success!</p>
          <p className="text-sm mt-1">The operation completed successfully.</p>
        </div>
      );
    case 'error':
      return (
        <div className="text-red-500">
          <p className="font-medium">Error!</p>
          <p className="text-sm mt-1">Something went wrong. Please try again.</p>
        </div>
      );
    default:
      return <p>Unknown status</p>;
  }
}

/**
 * Status components for object mapping pattern
 */
const statusComponents = {
  idle: (
    <div className="text-muted-foreground">
      <p>System is idle and ready to go.</p>
      <p className="text-sm mt-1">Click the button to start using object mapping pattern.</p>
    </div>
  ),
  loading: (
    <div className="text-blue-500 animate-pulse">
      <p>Loading from object mapping pattern...</p>
      <p className="text-sm mt-1">Please wait while we process your request.</p>
    </div>
  ),
  success: (
    <div className="text-green-500">
      <p className="font-medium">Object mapping success!</p>
      <p className="text-sm mt-1">The operation completed successfully.</p>
    </div>
  ),
  error: (
    <div className="text-red-500">
      <p className="font-medium">Object mapping error!</p>
      <p className="text-sm mt-1">Something went wrong. Please try again.</p>
    </div>
  )
};

export default ConditionalsPage;
