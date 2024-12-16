// AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
const AuthContext = createContext();

// Provide Context
export const AuthProvider = ({ children }) => {
  // Check sessionStorage for saved user_id
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("user_id") ? true : false
  );

  const login = () => {
    setIsLoggedIn(true);
    // Save user_id in sessionStorage
    const userId = sessionStorage.getItem("user_id");
    if (userId) {
      sessionStorage.setItem("isLoggedIn", "true");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    // Clear user_id from sessionStorage
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    // If sessionStorage has isLoggedIn flag, update the state
    if (sessionStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use Context
export const useAuth = () => useContext(AuthContext);
