
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * PropsPage Component
 * 
 * This component demonstrates:
 * 1. Passing props to child components
 * 2. Props drilling through multiple levels
 * 3. Component composition
 * 4. TypeScript interfaces for prop types
 */
const PropsPage = () => {
  // State that will be passed down to children
  const [counter, setCounter] = useState<number>(0);
  const [message, setMessage] = useState<string>("Hello from parent!");
  
  // Handler function to be passed as a prop
  const incrementCounter = () => {
    setCounter((prev) => prev + 1);
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Props & Component Communication</h1>
      <p className="text-muted-foreground mb-6">
        Props are how components communicate with each other. They allow you to pass data from 
        parent to child components.
      </p>
      
      {/* Basic Props Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Basic Props</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Props allow parent components to pass data to their children.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Message:</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          {/* Child component receives message prop */}
          <WelcomeMessage message={message} />
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Parent component
const ParentComponent = () => {
  const [message, setMessage] = useState("Hello");
  
  return <ChildComponent message={message} />;
};

// Child component with typed props
interface ChildProps {
  message: string;
}

const ChildComponent = ({ message }: ChildProps) => {
  return <div>{message}</div>;
};`}</pre>
        </div>
      </section>
      
      {/* Event Handler Props */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Event Handler Props</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Parents can pass functions as props to let children communicate back to the parent.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <p className="mb-2">Counter: <span className="font-semibold">{counter}</span></p>
          
          {/* Child component receives both data and function props */}
          <CounterButton 
            count={counter} 
            onIncrement={incrementCounter} 
          />
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Parent component
const ParentComponent = () => {
  const [counter, setCounter] = useState(0);
  
  const incrementCounter = () => {
    setCounter(prev => prev + 1);
  };
  
  return (
    <ChildComponent 
      count={counter} 
      onIncrement={incrementCounter} 
    />
  );
};

// Child passes events back up to parent
interface ChildProps {
  count: number;
  onIncrement: () => void;
}

const ChildComponent = ({ count, onIncrement }: ChildProps) => {
  return (
    <button onClick={onIncrement}>
      Count: {count}
    </button>
  );
};`}</pre>
        </div>
      </section>
      
      {/* Props Drilling Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Props Drilling</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Props drilling is passing props through multiple component layers.
          While it works, it can become cumbersome for deeply nested components.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          {/* First level component */}
          <FirstLevel
            counter={counter}
            onIncrement={incrementCounter}
            message={message}
          />
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Props drilling example
const App = () => {
  const [value, setValue] = useState("data");
  
  return <FirstLevel value={value} />;
};

const FirstLevel = ({ value }) => {
  return <SecondLevel value={value} />;
};

const SecondLevel = ({ value }) => {
  return <ThirdLevel value={value} />;
};

const ThirdLevel = ({ value }) => {
  // Finally using the prop that was drilled down
  return <div>{value}</div>;
};`}</pre>
        </div>
        
        <p className="mt-4 text-sm text-muted-foreground">
          Props drilling can become unwieldy in large applications. 
          Context API (shown in the Context section) helps solve this problem.
        </p>
      </section>
      
      {/* Children Props */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Children Props</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          The children prop allows components to render nested content.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          {/* Using children prop for composition */}
          <Card title="Children Props Example">
            <p className="mb-2">This content is passed as children!</p>
            <Button variant="outline" size="sm">A Button Inside</Button>
          </Card>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Component with children prop
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
};

// Using the component with children
<Card title="Hello">
  <p>This content is passed as children</p>
  <button>A button</button>
</Card>`}</pre>
        </div>
      </section>
    </div>
  );
};

// ========================
// Child Components
// ========================

/**
 * WelcomeMessage Component
 * Shows basic props passing
 */
interface WelcomeMessageProps {
  message: string;
}

const WelcomeMessage = ({ message }: WelcomeMessageProps) => {
  return (
    <div className="p-3 bg-secondary rounded">
      <p>Message from parent: <span className="font-medium">{message}</span></p>
    </div>
  );
};

/**
 * CounterButton Component
 * Shows props with event handlers
 */
interface CounterButtonProps {
  count: number;
  onIncrement: () => void;
}

const CounterButton = ({ count, onIncrement }: CounterButtonProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button onClick={onIncrement}>
        Increment Counter
      </Button>
      <span className="text-sm">Child component shows count: {count}</span>
    </div>
  );
};

/**
 * Props Drilling Example Components
 */
interface FirstLevelProps {
  counter: number;
  onIncrement: () => void;
  message: string;
}

const FirstLevel = ({ counter, onIncrement, message }: FirstLevelProps) => {
  return (
    <div className="border border-dashed border-primary/30 p-3 rounded">
      <p className="text-sm mb-2">First Level Component</p>
      {/* Pass props down to next level */}
      <SecondLevel 
        counter={counter} 
        onIncrement={onIncrement} 
        message={message} 
      />
    </div>
  );
};

interface SecondLevelProps {
  counter: number;
  onIncrement: () => void;
  message: string;
}

const SecondLevel = ({ counter, onIncrement, message }: SecondLevelProps) => {
  return (
    <div className="border border-dashed border-primary/30 p-3 rounded mt-2">
      <p className="text-sm mb-2">Second Level Component</p>
      {/* Pass props down to next level */}
      <ThirdLevel 
        counter={counter} 
        onIncrement={onIncrement} 
        message={message} 
      />
    </div>
  );
};

interface ThirdLevelProps {
  counter: number;
  onIncrement: () => void;
  message: string;
}

const ThirdLevel = ({ counter, onIncrement, message }: ThirdLevelProps) => {
  return (
    <div className="border border-dashed border-primary/30 p-3 rounded mt-2">
      <p className="text-sm mb-2">Third Level Component (Deepest Child)</p>
      <div className="bg-background p-2 rounded flex flex-col gap-2">
        <p className="text-sm">Message from top parent: <span className="font-medium">{message}</span></p>
        <p className="text-sm">Counter value: <span className="font-medium">{counter}</span></p>
        <Button size="sm" onClick={onIncrement}>
          Update Parent State
        </Button>
      </div>
    </div>
  );
};

/**
 * Card Component with children props
 */
interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="bg-background border rounded p-4">
      <h3 className="font-medium mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default PropsPage;
