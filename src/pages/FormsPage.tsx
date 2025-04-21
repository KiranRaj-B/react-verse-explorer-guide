
import { useState, useRef, FormEvent, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";

/**
 * FormsPage Component
 * 
 * This component demonstrates:
 * 1. Controlled inputs with useState
 * 2. Form submission handling
 * 3. Input validation
 * 4. Multi-input form management
 * 5. Uncontrolled inputs with useRef
 */
const FormsPage = () => {
  // =========== Basic Controlled Input ===========
  const [name, setName] = useState("");
  
  // =========== Form with Multiple Inputs ===========
  // Form state for multiple inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    termsAccepted: false
  });
  
  // Form validation errors
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // =========== Uncontrolled Input with Ref ===========
  const uncontrolledInputRef = useRef<HTMLInputElement>(null);
  const [uncontrolledResult, setUncontrolledResult] = useState("");
  
  // =========== Select Input Example ===========
  const [selectedOption, setSelectedOption] = useState("option1");
  
  // =========== Event Handlers ===========
  
  // Handle changes in the basic controlled input
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  
  // Handle changes in the multi-input form
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // For checkboxes, use the checked property
    const newValue = type === "checkbox" ? checked : value;
    
    // Update form data
    setFormData({
      ...formData,
      [name]: newValue
    });
    
    // Clear error for the field being edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };
  
  // Handle form submission
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs
    const errors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.age) {
      errors.age = "Age is required";
    } else if (isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      errors.age = "Age must be a positive number";
    }
    
    if (!formData.termsAccepted) {
      errors.termsAccepted = "You must accept the terms";
    }
    
    // If there are errors, update the errors state
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsSubmitted(false);
      return;
    }
    
    // If validation passes, show success message
    setIsSubmitted(true);
    setFormErrors({});
    
    // In a real app, you would typically send data to a server here
    console.log("Form submitted:", formData);
  };
  
  // Handle uncontrolled input submission
  const handleUncontrolledSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Access the current value of the uncontrolled input
    if (uncontrolledInputRef.current) {
      setUncontrolledResult(uncontrolledInputRef.current.value);
    }
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Forms in React</h1>
      <p className="text-muted-foreground mb-6">
        Forms allow users to interact with your application. React offers controlled and uncontrolled 
        approaches to handle form inputs.
      </p>
      
      {/* Basic Controlled Input */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Controlled Inputs</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          In a controlled input, React state is the "single source of truth". The input's value is
          controlled by React state, and updates are handled through onChange events.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your name"
            />
          </div>
          
          <p className="text-sm">
            Current value: <span className="font-medium">{name || "(empty)"}</span>
          </p>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Controlled input example
const [name, setName] = useState("");

const handleNameChange = (e) => {
  setName(e.target.value);
};

<input
  type="text"
  value={name}
  onChange={handleNameChange}
  placeholder="Enter your name"
/>`}</pre>
        </div>
      </section>
      
      {/* Multi-input Form */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Complete Form Example</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Managing multiple inputs, validation, and form submission.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          {isSubmitted ? (
            <div className="p-3 bg-green-100 text-green-800 rounded mb-4">
              <p className="font-medium">Form submitted successfully!</p>
              <p className="text-sm mt-1">Thank you for your submission.</p>
              <Button 
                onClick={() => setIsSubmitted(false)}
                size="sm"
                variant="outline"
                className="mt-2"
              >
                Submit another response
              </Button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className={`w-full p-2 border rounded ${formErrors.email ? "border-red-500" : ""}`}
                  placeholder="your@email.com"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>
              
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  className={`w-full p-2 border rounded ${formErrors.password ? "border-red-500" : ""}`}
                />
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                )}
              </div>
              
              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleFormChange}
                  className={`w-full p-2 border rounded ${formErrors.confirmPassword ? "border-red-500" : ""}`}
                />
                {formErrors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                )}
              </div>
              
              {/* Age Field */}
              <div>
                <label htmlFor="age" className="block text-sm font-medium mb-1">
                  Age
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  value={formData.age}
                  onChange={handleFormChange}
                  className={`w-full p-2 border rounded ${formErrors.age ? "border-red-500" : ""}`}
                  placeholder="25"
                />
                {formErrors.age && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.age}</p>
                )}
              </div>
              
              {/* Terms Checkbox */}
              <div>
                <label className="flex items-center">
                  <input
                    name="termsAccepted"
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={handleFormChange}
                    className="mr-2"
                  />
                  <span className="text-sm">I accept the terms and conditions</span>
                </label>
                {formErrors.termsAccepted && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.termsAccepted}</p>
                )}
              </div>
              
              <Button type="submit">Submit Form</Button>
            </form>
          )}
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Multiple inputs with a single state object
const [formData, setFormData] = useState({
  email: "",
  password: "",
  confirmPassword: "",
  age: "",
  termsAccepted: false
});

// Handle changes for all form inputs
const handleFormChange = (e) => {
  const { name, value, type, checked } = e.target;
  const newValue = type === "checkbox" ? checked : value;
  
  setFormData({
    ...formData,
    [name]: newValue
  });
};

// Form JSX with name attributes matching state properties
<form onSubmit={handleSubmit}>
  <input
    name="email"
    type="email"
    value={formData.email}
    onChange={handleFormChange}
  />
  
  <input
    name="password"
    type="password"
    value={formData.password}
    onChange={handleFormChange}
  />
  
  <input
    name="termsAccepted"
    type="checkbox"
    checked={formData.termsAccepted}
    onChange={handleFormChange}
  />
  
  <button type="submit">Submit</button>
</form>`}</pre>
        </div>
      </section>
      
      {/* Uncontrolled Inputs */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Uncontrolled Inputs</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Uncontrolled inputs use refs to access DOM values directly. The input's value is managed by the DOM
          instead of React state.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <form onSubmit={handleUncontrolledSubmit} className="mb-4">
            <div className="mb-3">
              <label htmlFor="uncontrolled" className="block text-sm font-medium mb-1">
                Uncontrolled Input:
              </label>
              <input
                id="uncontrolled"
                type="text"
                ref={uncontrolledInputRef}
                defaultValue=""
                className="w-full p-2 border rounded"
                placeholder="Type something..."
              />
            </div>
            
            <Button type="submit" size="sm">Get Value</Button>
          </form>
          
          {uncontrolledResult && (
            <div className="p-3 bg-secondary rounded">
              <p className="text-sm">
                Value from uncontrolled input: <span className="font-medium">{uncontrolledResult}</span>
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Uncontrolled input example with useRef
const inputRef = useRef(null);

const handleSubmit = (e) => {
  e.preventDefault();
  // Access the input's current value directly from the DOM
  console.log("Input value:", inputRef.current.value);
};

<form onSubmit={handleSubmit}>
  <input
    type="text"
    ref={inputRef}
    defaultValue=""  // Initial value (not controlled)
  />
  <button type="submit">Submit</button>
</form>`}</pre>
        </div>
        
        <div className="mt-4 p-3 bg-secondary/50 rounded text-sm">
          <p className="font-medium">Controlled vs. Uncontrolled</p>
          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm font-medium mb-1">Controlled</p>
              <ul className="list-disc pl-5 text-xs space-y-1 text-muted-foreground">
                <li>Values stored in React state</li>
                <li>Changes handled with onChange events</li>
                <li>More explicit and predictable</li>
                <li>Enables real-time validation</li>
                <li>Better for complex forms</li>
              </ul>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-1">Uncontrolled</p>
              <ul className="list-disc pl-5 text-xs space-y-1 text-muted-foreground">
                <li>Values stored in the DOM</li>
                <li>Access values with refs</li>
                <li>Simpler for basic forms</li>
                <li>Less React code</li>
                <li>Better for integrating with non-React code</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Select Input Example */}
      <section className="bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-3">Select Input Example</h2>
        <p className="mb-3 text-sm text-muted-foreground">
          Working with dropdown select inputs in React.
        </p>
        
        <div className="p-4 bg-muted rounded-md mb-4">
          <div className="mb-3">
            <label htmlFor="select-example" className="block text-sm font-medium mb-1">
              Choose an option:
            </label>
            <select
              id="select-example"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          </div>
          
          <p className="text-sm">
            Selected option: <span className="font-medium">{selectedOption}</span>
          </p>
        </div>
        
        <div className="bg-muted p-3 rounded text-sm font-mono overflow-x-auto">
          <pre>{`// Select input example
const [selectedOption, setSelectedOption] = useState("option1");

<select
  value={selectedOption}
  onChange={(e) => setSelectedOption(e.target.value)}
>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</select>`}</pre>
        </div>
      </section>
    </div>
  );
};

export default FormsPage;
