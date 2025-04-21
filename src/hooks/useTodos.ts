
import { useState, useEffect } from "react";

/**
 * Todo item interface
 */
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

/**
 * Custom hook for managing todo items with localStorage persistence
 * 
 * This hook:
 * 1. Provides CRUD operations for todo items
 * 2. Persists todos in localStorage
 * 3. Returns todos and operations to manipulate them
 * 
 * @returns Todo state and operations
 */
export function useTodos() {
  // Load todos from localStorage on initial render
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  
  /**
   * Add a new todo
   * @param text - Todo text content
   */
  const addTodo = (text: string) => {
    if (!text.trim()) return;
    
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false
    };
    
    setTodos([...todos, newTodo]);
  };
  
  /**
   * Toggle a todo's completed status
   * @param id - Todo ID to toggle
   */
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  /**
   * Edit a todo's text
   * @param id - Todo ID to edit
   * @param newText - New text content
   */
  const editTodo = (id: string, newText: string) => {
    if (!newText.trim()) return;
    
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ));
  };
  
  /**
   * Delete a todo
   * @param id - Todo ID to delete
   */
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  /**
   * Clear all completed todos
   */
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };
  
  // Calculate stats about todos
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length
  };
  
  return {
    todos,
    stats,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted
  };
}
