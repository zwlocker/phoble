import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Authentication context
// Manages global authentication state
const AuthContext = createContext();

// Custom hook to access authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const API_BASE_URL = "https://api.phoble.net";

// Wraps app to provide authentication state and methods to child components
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Verifies that user has valid session with backend
  const checkAuthStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/current_user`, {
        withCredentials: true,
      });
      // Returns user object if authenticated, and null if not
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Log out current uer
  const logout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/logout`, {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Initiate OAuth login flow
  const login = () => {
    const currentPage = window.location.pathname + window.location.search;
    const state = encodeURIComponent(currentPage);
    window.location.href = `${API_BASE_URL}/auth/google?returnTo=${state}`;
  };

  // Context value provided to child components
  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    checkAuthStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
