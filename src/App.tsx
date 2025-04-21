
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import HooksPage from "@/pages/HooksPage";
import PropsPage from "@/pages/PropsPage";
import ContextPage from "@/pages/ContextPage";
import ConditionalsPage from "@/pages/ConditionalsPage";
import ListsPage from "@/pages/ListsPage";
import FormsPage from "@/pages/FormsPage";
import ApiPage from "@/pages/ApiPage";
import CustomHooksPage from "@/pages/CustomHooksPage";
import TodoAppPage from "@/pages/TodoAppPage";
import NotFound from "@/pages/NotFound";

/**
 * Main App component - the entry point of our application
 * 
 * This component:
 * 1. Sets up routing with React Router
 * 2. Provides theme context for dark/light mode
 * 3. Wraps the application in necessary providers
 */
const App = () => (
  // ThemeProvider - Enables dark/light mode across the app using Context API
  <ThemeProvider>
    {/* TooltipProvider from shadcn/ui for tooltips */}
    <TooltipProvider>
      {/* Toast notifications */}
      <Toaster />
      <Sonner />
      
      {/* BrowserRouter - Sets up client-side routing */}
      <BrowserRouter>
        <Routes>
          {/* Layout wraps all our routes to provide consistent UI */}
          <Route element={<Layout />}>
            {/* Define all application routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/hooks" element={<HooksPage />} />
            <Route path="/props" element={<PropsPage />} />
            <Route path="/context" element={<ContextPage />} />
            <Route path="/conditionals" element={<ConditionalsPage />} />
            <Route path="/lists" element={<ListsPage />} />
            <Route path="/forms" element={<FormsPage />} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="/custom-hooks" element={<CustomHooksPage />} />
            <Route path="/todo-app" element={<TodoAppPage />} />
            {/* 404 route for undefined routes */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </ThemeProvider>
);

export default App;
