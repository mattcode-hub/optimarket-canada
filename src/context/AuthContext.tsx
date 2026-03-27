'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  location: string;
  bio: string;
  memberSince: string;
  isSeller: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    name: string;
    email: string;
    password: string;
    location: string;
    phone?: string;
    isSeller: boolean;
  }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_ACCOUNTS = [
  {
    id: 'user-1',
    name: 'Sarah Johnson',
    email: 'buyer@example.com',
    password: 'password123',
    avatar: 'SJ',
    phone: '(416) 555-0100',
    location: 'Toronto, ON',
    bio: 'Passionate about quality eye care equipment.',
    memberSince: '2023-01-15',
    isSeller: false,
  },
  {
    id: 'user-2',
    name: 'Dr. Michael Chen',
    email: 'seller@example.com',
    password: 'password123',
    avatar: 'MC',
    phone: '(604) 555-0200',
    location: 'Vancouver, BC',
    bio: 'Certified optometry equipment specialist with 10+ years experience.',
    memberSince: '2021-06-20',
    isSeller: true,
  },
  {
    id: 'user-3',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    avatar: 'AU',
    phone: '(416) 555-0300',
    location: 'Montreal, QC',
    bio: 'Platform administrator.',
    memberSince: '2020-01-01',
    isSeller: true,
  },
];

const STORAGE_KEY = 'auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const account = DEMO_ACCOUNTS.find(
      acc => acc.email === email && acc.password === password
    );

    if (!account) {
      throw new Error('Invalid email or password');
    }

    const { password: _, ...userWithoutPassword } = account;
    setUser(userWithoutPassword as User);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userWithoutPassword));
  }, []);

  const signup = useCallback(
    async (data: {
      name: string;
      email: string;
      password: string;
      location: string;
      phone?: string;
      isSeller: boolean;
    }) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if user already exists
      if (DEMO_ACCOUNTS.some(acc => acc.email === data.email)) {
        throw new Error('Email already registered');
      }

      // Validate password
      if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: data.name,
        email: data.email,
        avatar: data.name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase(),
        phone: data.phone || '',
        location: data.location,
        bio: '',
        memberSince: new Date().toISOString().split('T')[0],
        isSeller: data.isSeller,
      };

      // Store in "database" (demo accounts array)
      DEMO_ACCOUNTS.push({
        ...newUser,
        password: data.password,
      });

      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!user) {
      throw new Error('No user logged in');
    }

    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  }, [user]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
