
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTodos, Todo } from "@/hooks/useTodos";
import { X, Check, Edit, Trash } from "lucide-react";

/**
 * TodoAppPage Component
 * 
 * This component demonstrates:
 * 1. A complete mini-application that uses multiple React concepts
 * 2. Using a custom hook for state management
 * 3. Managing a list of items with CRUD operations
 * 4. LocalStorage for data persistence
 * 5. Form handling with controlled inputs
 */
const TodoAppPage = () => {
  // Using our custom useTodos hook
  const { todos, stats, addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted } = useTodos();
  
  // State for the new todo input
  const [newTodo, setNewTodo] = useState("");
  
  // State for filtering todos
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo("");
    }
  };
  
  // Filter todos based on the current filter
  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // "all" filter
  });
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Todo Application</h1>
      <p className="text-muted-foreground mb-6">
        This todo app combines many React concepts we've covered: state, effects, 
        conditional rendering, lists, forms, and custom hooks.
      </p>
      
      <div className="bg-card rounded-lg border p-6">
        <div className="max-w-xl mx-auto">
          {/* Todo Form */}
          <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 p-2 border rounded"
              autoFocus
            />
            <Button type="submit" disabled={!newTodo.trim()}>
              Add Todo
            </Button>
          </form>
          
          {/* Todo Stats and Filters */}
          <div className="flex flex-wrap justify-between items-center mb-4 text-sm">
            <div className="text-muted-foreground mb-2 sm:mb-0">
              {stats.total === 0 ? (
                <span>No todos yet</span>
              ) : (
                <span>
                  {stats.active} remaining / {stats.total} total
                </span>
              )}
            </div>
            
            <div className="flex gap-2 mb-2 sm:mb-0">
              <Button 
                variant={filter === "all" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={filter === "active" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("active")}
              >
                Active
              </Button>
              <Button 
                variant={filter === "completed" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFilter("completed")}
              >
                Completed
              </Button>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearCompleted}
              disabled={stats.completed === 0}
              className="text-red-500 hover:text-red-700"
            >
              Clear completed
            </Button>
          </div>
          
          {/* Todo List */}
          <div className="rounded-md border overflow-hidden">
            {filteredTodos.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                {filter === "all" 
                  ? "Add your first todo item!" 
                  : filter === "active"
                    ? "No active todos"
                    : "No completed todos"}
              </div>
            ) : (
              <ul className="divide-y">
                {filteredTodos.map(todo => (
                  <TodoItem 
                    key={todo.id} 
                    todo={todo} 
                    onToggle={toggleTodo}
                    onEdit={editTodo}
                    onDelete={deleteTodo}
                  />
                ))}
              </ul>
            )}
          </div>
          
          {/* Info Footer */}
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p>Double-click a todo to edit it</p>
            <p className="mt-1">
              Data is persisted in your browser's localStorage
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * TodoItem Component Properties
 */
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

/**
 * TodoItem Component
 * 
 * Displays a single todo with edit, toggle, and delete functionality
 */
const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const editInputRef = useRef<HTMLInputElement>(null);
  
  // Focus the input when entering edit mode
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);
  
  // Start editing on double click
  const handleDoubleClick = () => {
    setIsEditing(true);
  };
  
  // Save edits on blur or Enter key
  const handleEditSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
    }
    setIsEditing(false);
  };
  
  // Cancel edit on Escape key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSubmit();
    } else if (e.key === "Escape") {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };
  
  return (
    <li className="flex items-center gap-2 p-3 hover:bg-muted/40 group">
      {/* Checkbox for completed status */}
      <div className="mr-1">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 flex items-center justify-center rounded-full border ${
            todo.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'
          }`}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed && <Check className="h-4 w-4" />}
        </button>
      </div>
      
      {/* Todo content - editable or display */}
      <div className="flex-1">
        {isEditing ? (
          <input
            ref={editInputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEditSubmit}
            onKeyDown={handleKeyDown}
            className="w-full p-1 border rounded"
          />
        ) : (
          <div
            onDoubleClick={handleDoubleClick}
            className={`px-1 py-1 rounded cursor-pointer ${
              todo.completed ? 'line-through text-muted-foreground' : ''
            }`}
          >
            {todo.text}
          </div>
        )}
      </div>
      
      {/* Action buttons */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setEditText(todo.text);
            setIsEditing(true);
          }}
          className="h-7 w-7"
          aria-label="Edit"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(todo.id)}
          className="h-7 w-7 text-red-500 hover:text-red-700"
          aria-label="Delete"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </li>
  );
};

export default TodoAppPage;
