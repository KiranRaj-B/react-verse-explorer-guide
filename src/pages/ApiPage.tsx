
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { sleep } from "@/lib/utils";

/**
 * Post interface for our fake API
 */
interface Post {
  id: number;
  title: string;
  body: string;
}

/**
 * User interface for our fake API
 */
interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * ApiPage Component
 * 
 * This component demonstrates:
 * 1. Data fetching with useEffect
 * 2. Loading states and error handling
 * 3. Dependency arrays in useEffect
 * 4. Conditional data fetching
 * 5. Cleanup functions in useEffect
 */
const ApiPage = () => {
  // =========== Basic Data Fetching Example ===========
  const [posts, setPosts] = useState<Post[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);
  
  // =========== Conditional Fetching Example ===========
  const [userId, setUserId] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  
  // =========== Cleanup Example ===========
  const [showTimer, setShowTimer] = useState(false);
  
  // =========== Manual Fetch Example ===========
  const [randomData, setRandomData] = useState<string | null>(null);
  const [randomLoading, setRandomLoading] = useState(false);
  
  // Basic data fetching with useEffect
  useEffect(() => {
    // Define an async function inside useEffect
    const fetchPosts = async () => {
      try {
        setPostsLoading(true);
        setPostsError(null);
        
        // Fetch data from the API
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        
        // Check if request was successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Add a small delay to show loading state (for demo purposes)
        await sleep(1000);
        
        // Update state with the fetched data
        setPosts(data);
      } catch (error) {
        // Handle any errors
        console.error('Error fetching posts:', error);
        setPostsError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        // Set loading to false regardless of success or failure
        setPostsLoading(false);
      }
    };
    
    // Call the function
    fetchPosts();
    
    // No cleanup needed for this effect
  }, []); // Empty dependency array means this runs once on mount
  
  // Conditional data fetching based on state
  useEffect(() => {
    // Skip the effect if userId is null
    if (userId === null) {
      setUser(null);
      return;
    }
    
    let isMounted = true; // Flag to prevent state updates if component unmounts
    
    const fetchUser = async () => {
      try {
        setUserLoading(true);
        setUserError(null);
        
        // Fetch user data based on userId
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Use isMounted flag to prevent state updates after unmount
        if (isMounted) {
          await sleep(1000); // Small delay for demo
          setUser(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error fetching user:', error);
          setUserError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
      } finally {
        if (isMounted) {
          setUserLoading(false);
        }
      }
    };
    
    fetchUser();
    
    // Cleanup function to set the isMounted flag to false
    return () => {
      isMounted = false;
    };
  }, [userId]); // This effect runs when userId changes
  
  // Manual fetch function (not in useEffect)
  const fetchRandomData = async () => {
    try {
      setRandomLoading(true);
      setRandomData(null);
      
      // Fetch random data (using a timestamp to avoid caching)
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1?t=${Date.now()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      await sleep(1000); // Small delay for demo
      setRandomData(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error fetching random data:', error);
    } finally {
      setRandomLoading(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">API Data Fetching</h1>
      <p className="text-muted-foreground mb-6">
        React applications often need to fetch data from APIs. This is typically done with the
        useEffect hook combined with fetch or a library like Axios.
      </p>
      
      {/* Basic Data Fetching */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Basic Data Fetching</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Using useEffect to fetch data when a component mounts.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <h3 className="text-sm font-medium mb-2">Posts from JSONPlaceholder API</h3>
          
          {postsLoading ? (
            <div className="py-4 text-center animate-pulse">
              <p>Loading posts...</p>
            </div>
          ) : postsError ? (
            <div className="p-3 bg-red-100 text-red-800 rounded">
              <p className="font-medium">Error loading posts</p>
              <p className="text-sm">{postsError}</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {posts.map((post) => (
                <li key={post.id} className="bg-background p-3 rounded border">
                  <h4 className="font-medium">{post.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{post.body.substring(0, 100)}...</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Basic data fetching with useEffect
const [data, setData] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.example.com/data');
      
      if (!response.ok) {
        throw new Error(\`HTTP error! Status: \${response.status}\`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []); // Empty array means "run once on mount"`}</pre>
        </div>
      </section>
      
      {/* Conditional Data Fetching */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Conditional Data Fetching</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Fetching data based on state or props changes, using dependency arrays.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Select a user ID:</h3>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((id) => (
                <Button 
                  key={id}
                  variant={userId === id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserId(id)}
                >
                  User {id}
                </Button>
              ))}
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => setUserId(null)}
              >
                Clear
              </Button>
            </div>
          </div>
          
          <div className="bg-background p-3 rounded border">
            {userId === null ? (
              <p className="text-sm text-muted-foreground">
                Select a user ID to fetch user data
              </p>
            ) : userLoading ? (
              <div className="py-2 text-center animate-pulse">
                <p>Loading user {userId}...</p>
              </div>
            ) : userError ? (
              <div className="text-red-500 text-sm">
                <p>Error: {userError}</p>
              </div>
            ) : user ? (
              <div>
                <h4 className="font-medium">{user.name}</h4>
                <p className="text-sm mt-1">Email: {user.email}</p>
                <p className="text-sm text-muted-foreground mt-2">User ID: {user.id}</p>
              </div>
            ) : null}
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Conditional fetching based on state/props
const [userId, setUserId] = useState(null);
const [user, setUser] = useState(null);

useEffect(() => {
  // Skip the effect if userId is null
  if (userId === null) {
    setUser(null);
    return;
  }
  
  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(\`https://api.example.com/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  fetchUser();
}, [userId]); // This effect depends on userId`}</pre>
        </div>
      </section>
      
      {/* Cleanup in useEffect */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Cleanup in useEffect</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Preventing memory leaks and cleaning up resources when components unmount.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="mb-3">
            <Button 
              onClick={() => setShowTimer(!showTimer)}
              variant={showTimer ? "outline" : "default"}
            >
              {showTimer ? "Hide Timer" : "Show Timer"}
            </Button>
          </div>
          
          {showTimer && <TimerComponent />}
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Cleanup example with useEffect
useEffect(() => {
  console.log("Effect running - setting up subscription");
  
  // Set up subscription, timer, or event listener
  const timer = setInterval(() => {
    console.log("Timer tick");
  }, 1000);
  
  // Return a cleanup function
  return () => {
    console.log("Effect cleanup - clearing subscription");
    clearInterval(timer);
  };
}, []); // Empty array = run on mount, clean up on unmount

// For API calls, use a mounted flag
useEffect(() => {
  let isMounted = true;
  
  const fetchData = async () => {
    const result = await api.getData();
    
    // Only update state if component is still mounted
    if (isMounted) {
      setData(result);
    }
  };
  
  fetchData();
  
  // Cleanup function
  return () => {
    isMounted = false;
  };
}, []);`}</pre>
        </div>
      </section>
      
      {/* Manual Data Fetching */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Manual Data Fetching</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Sometimes you need to fetch data in response to user actions rather than component lifecycle.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="mb-3">
            <Button 
              onClick={fetchRandomData}
              disabled={randomLoading}
            >
              {randomLoading ? "Loading..." : "Fetch Random Data"}
            </Button>
          </div>
          
          {randomData && (
            <div className="bg-background p-3 rounded border">
              <h4 className="text-sm font-medium mb-2">Response:</h4>
              <pre className="text-xs overflow-auto">{randomData}</pre>
            </div>
          )}
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Manual fetch (not in useEffect)
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);

const fetchData = async () => {
  try {
    setLoading(true);
    const response = await fetch('https://api.example.com/data');
    const result = await response.json();
    setData(result);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

// In your JSX
<button onClick={fetchData} disabled={loading}>
  {loading ? "Loading..." : "Fetch Data"}
</button>`}</pre>
        </div>
      </section>
      
      {/* Best Practices */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Data Fetching Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Do</h3>
            <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
              <li>Use a mounted flag to prevent memory leaks</li>
              <li>Include proper error handling</li>
              <li>Add loading states for better UX</li>
              <li>Use try/catch blocks with async/await</li>
              <li>Consider using axios or other fetch libraries for more features</li>
              <li>Consider data fetching libraries like React Query, SWR, or Apollo</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Avoid</h3>
            <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
              <li>Setting state after component unmounts</li>
              <li>Forgetting dependency arrays in useEffect</li>
              <li>Nesting too many conditionals in data loading logic</li>
              <li>Putting fetch logic directly in component body (outside useEffect or event handlers)</li>
              <li>Forgetting to handle loading and error states</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * TimerComponent to demonstrate useEffect cleanup
 */
const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    console.log("Timer component mounted");
    
    // Set up interval that increments seconds
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup function that runs when component unmounts
    return () => {
      console.log("Timer component will unmount");
      clearInterval(interval);
    };
  }, []); // Empty array means this runs once on mount
  
  return (
    <div className="bg-background p-3 rounded border">
      <p className="text-sm font-medium">Timer Component</p>
      <p className="text-2xl mt-1">{seconds} seconds</p>
      <p className="text-xs text-muted-foreground mt-2">
        This component has an interval that runs every second. 
        The interval is cleared when the component unmounts.
      </p>
    </div>
  );
};

export default ApiPage;
