"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  AuthContextType,
  LoginCredentials,
  SignupCredentials,
} from "../types/auth";

// Initialize with default values
const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
};

// Create context
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if the user is already logged in (from localStorage)
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Mock login function - in a real app, this would make an API call
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login - in a real app, this would come from your backend
      const mockUser: User = {
        id: "1",
        email: credentials.email,
        name: credentials.email.split("@")[0],
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock signup function
  const signup = async (credentials: SignupCredentials) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful signup
      const mockUser: User = {
        id: "1",
        email: credentials.email,
        name: credentials.name || credentials.email.split("@")[0],
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
