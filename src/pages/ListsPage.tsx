
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

/**
 * User interface for our examples
 */
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

/**
 * Product interface for our examples
 */
interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

/**
 * Initial users data
 */
const initialUsers: User[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "User" },
  { id: 3, name: "Carol Williams", email: "carol@example.com", role: "Editor" },
  { id: 4, name: "Dave Brown", email: "dave@example.com", role: "User" },
];

/**
 * Initial products data
 */
const initialProducts: Product[] = [
  { id: "p1", name: "Laptop", price: 999.99, category: "Electronics" },
  { id: "p2", name: "Headphones", price: 149.99, category: "Electronics" },
  { id: "p3", name: "Coffee Mug", price: 12.99, category: "Kitchen" },
  { id: "p4", name: "Book", price: 24.99, category: "Books" },
  { id: "p5", name: "Phone Case", price: 19.99, category: "Accessories" },
];

/**
 * ListsPage Component
 * 
 * This component demonstrates:
 * 1. Rendering lists in React
 * 2. Using keys properly
 * 3. Index as keys and their limitations
 * 4. Mapping nested data
 * 5. List manipulations
 */
const ListsPage = () => {
  // State for user list that can be modified
  const [users, setUsers] = useState<User[]>(initialUsers);
  // State for product list that can be modified
  const [products, setProducts] = useState<Product[]>(initialProducts);
  // State for new user form
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "User" });
  
  // Remove a user by ID
  const removeUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };
  
  // Add a new user
  const addUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newUser.name && newUser.email) {
      // Create a new user with a unique ID
      const user: User = {
        id: Date.now(), // Simple way to generate a unique ID
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      };
      
      // Add to users array
      setUsers([...users, user]);
      
      // Reset form
      setNewUser({ name: "", email: "", role: "User" });
    }
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Lists & Keys</h1>
      <p className="text-muted-foreground mb-6">
        Lists are a common UI pattern, and React provides efficient ways to render
        and update lists of elements.
      </p>
      
      {/* Basic List Rendering */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Basic List Rendering</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Use the map function to render lists of elements. Each element must have a unique "key" prop.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <h3 className="text-sm font-medium mb-2">Simple Product List</h3>
          <ul className="space-y-2">
            {products.map((product) => (
              <li key={product.id} className="bg-background p-2 rounded-md border">
                <div className="flex justify-between">
                  <span>{product.name}</span>
                  <span className="text-sm">${product.price.toFixed(2)}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Basic list rendering with keys
<ul>
  {products.map((product) => (
    <li key={product.id}>
      {product.name} - $${'{'}product.price{'}'}
    </li>
  ))}
</ul>`}</pre>
        </div>
        
        <div className="mt-4 p-3 bg-secondary/50 rounded text-sm">
          <p className="font-medium">Why Keys Matter</p>
          <p className="text-muted-foreground mt-1">
            Keys help React identify which items have changed, been added, or removed.
            Keys should be unique among siblings - typically an ID from your data.
          </p>
          <p className="text-muted-foreground mt-1">
            Without keys, React may re-render the entire list on each update, which is inefficient.
          </p>
        </div>
      </section>
      
      {/* Interactive List Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Interactive List with CRUD</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          A more realistic example with the ability to add and remove items.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Add New User</h3>
            <form onSubmit={addUser} className="grid gap-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="p-2 border rounded"
                  required
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="p-2 border rounded"
                >
                  <option value="User">User</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <Button type="submit">Add User</Button>
            </form>
          </div>
          
          <h3 className="text-sm font-medium mb-2">User List</h3>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary text-secondary-foreground">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Role</th>
                  <th className="p-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-muted-foreground">
                      No users found. Add a user above.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => removeUser(user.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Interactive list example
// State for the list
const [users, setUsers] = useState<User[]>(initialUsers);

// Remove function
const removeUser = (id: number) => {
  setUsers(users.filter(user => user.id !== id));
};

// Add function
const addUser = (newUser: User) => {
  setUsers([...users, { ...newUser, id: Date.now() }]);
};

// Rendering the list
<table>
  <tbody>
    {users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>
          <button onClick={() => removeUser(user.id)}>
            Remove
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>`}</pre>
        </div>
      </section>
      
      {/* Index as Keys */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Array Index as Key</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          While you can use array indices as keys, it's not recommended for lists that can change.
        </p>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto mb-4">
          <pre>{`// Using array index as key (not recommended for dynamic lists)
{items.map((item, index) => (
  <li key={index}>{item.name}</li>
))}

// Problems with index as key:
// 1. If list order changes, component state can get mixed up
// 2. Can cause inefficient renders
// 3. Can cause bugs with item selection/checkboxes`}</pre>
        </div>
        
        <div className="p-3 bg-secondary/50 rounded text-sm">
          <p className="font-medium">When index as key is acceptable</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
            <li>The list is static and will not change</li>
            <li>The list will never be reordered or filtered</li>
            <li>The items in the list have no IDs</li>
            <li>The list is never re-calculated or regenerated</li>
          </ul>
          <p className="mt-2 text-muted-foreground">
            Even in these cases, consider generating unique IDs when creating the data.
          </p>
        </div>
      </section>
      
      {/* Nested Lists */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Nested Lists</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          When rendering nested lists, each level needs unique keys.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <h3 className="text-sm font-medium mb-2">Products by Category</h3>
          
          {/* Group products by category */}
          {Object.entries(
            products.reduce<Record<string, Product[]>>((acc, product) => {
              if (!acc[product.category]) {
                acc[product.category] = [];
              }
              acc[product.category].push(product);
              return acc;
            }, {})
          ).map(([category, categoryProducts]) => (
            <div key={category} className="mb-4">
              <h4 className="font-medium text-sm mb-2">{category}</h4>
              <ul className="space-y-1 pl-4">
                {categoryProducts.map((product) => (
                  <li key={product.id} className="text-sm">
                    {product.name} - ${product.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Nested lists example
// First group the data
const productsByCategory = products.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push(product);
  return acc;
}, {});

// Then render nested lists
{Object.entries(productsByCategory).map(([category, products]) => (
  <div key={category}>
    <h3>{category}</h3>
    <ul>
      {products.map(product => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  </div>
))}`}</pre>
        </div>
      </section>
      
      {/* List Patterns and Best Practices */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">List Best Practices</h2>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Do</h3>
            <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
              <li>Use stable, unique IDs for keys when possible</li>
              <li>Keep list rendering pure - no side effects in map functions</li>
              <li>Use fragment shorthand <code>{`<></>`}</code> for multiple elements</li>
              <li>Extract list items into separate components for complex UIs</li>
              <li>Filter, sort, and transform data before mapping</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-2">Avoid</h3>
            <ul className="list-disc pl-5 text-sm space-y-2 text-muted-foreground">
              <li>Using index as key for dynamic lists</li>
              <li>Generating keys inside render (creates new keys on each render)</li>
              <li>Complex logic inside map functions</li>
              <li>Forgetting keys (causes React warnings)</li>
              <li>Using non-primitive values as keys (objects, arrays)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListsPage;
