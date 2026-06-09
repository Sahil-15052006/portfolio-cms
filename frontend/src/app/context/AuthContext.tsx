import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface AuthContextType {
  isAuthenticated: boolean | null;
  login: (name: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const API_URL = (import.meta as any).env.VITE_BACKEND_API;

  const verifyAuth = async () => {
    try {
      const res = await fetch(`${API_URL}/auth/verify`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await res.json();
      setIsAuthenticated(result.authenticated);
      return result.authenticated;

    } catch (error) {
      setIsAuthenticated(false);
      return false;
    }
  };

const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    verifyAuth();
  }, []);

  const login = async(name: string, password: string) => {
    try{
      if(!name || !password) {
        toast.error('Please fill in all fields');
        return false;
      }
      name = name.trim()
      password = password.trim()
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, password })
      });

      if(res.ok) {
          toast.success('Logged in successfully');
          const result = await res.json();
          setIsAuthenticated(result.success);
          return true;
      } else {
        toast.error('Invalid credentials');
        return false;
      }
    }
    catch(error) {
      toast.error(error instanceof Error ? error.message : 'An error occurred');
      return false;
    }

  };

  const logout = async() => {
    try{
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      toast.error('Error occurred while logging out');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
