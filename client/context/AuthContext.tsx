"use client";

import { createContext, useEffect, useState } from "react";
import { verifyToken } from "@/services/authServices";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  IsLoggedIn: boolean;
  isLoading: boolean;
  user?: User;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(undefined);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await verifyToken();
        setUser(data.user); 
        setIsLoggedIn(true);
      } catch {
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ IsLoggedIn, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
