
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for the demo
const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'therapist@ablelyf.com',
    role: 'therapist',
    avatar: '/placeholder.svg',
  },
  {
    id: '2',
    name: 'Michael Davis',
    email: 'caregiver@ablelyf.com',
    role: 'caregiver',
    avatar: '/placeholder.svg',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@ablelyf.com',
    role: 'admin',
    avatar: '/placeholder.svg',
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session in localStorage
    const savedUser = localStorage.getItem('ablelyf_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find demo user
      const user = DEMO_USERS.find(u => u.email === email);
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Save to localStorage and state
      localStorage.setItem('ablelyf_user', JSON.stringify(user));
      setCurrentUser(user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ablelyf_user');
    setCurrentUser(null);
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role,
        avatar: '/placeholder.svg',
      };
      
      // Save to localStorage and state
      localStorage.setItem('ablelyf_user', JSON.stringify(newUser));
      setCurrentUser(newUser);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
