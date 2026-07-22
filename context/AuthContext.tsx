'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, AdminUser } from '@/types';

interface AuthContextType {
  user: Customer | null;
  admin: AdminUser | null;
  isLoading: boolean;
  loginUser: (email: string) => Promise<{ success: boolean; message: string }>;
  registerUser: (name: string, email: string, phone?: string) => Promise<{ success: boolean; message: string }>;
  loginAdmin: (userOrEmail: string, pass: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateProfile: (data: Partial<Customer>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Customer | null>(null);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('darmhie_user');
    const savedAdmin = localStorage.getItem('darmhie_admin');

    if (savedUser) {
      try { setUser(JSON.parse(savedUser)); } catch (e) {}
    }
    if (savedAdmin) {
      try { setAdmin(JSON.parse(savedAdmin)); } catch (e) {}
    }
    setIsLoading(false);
  }, []);

  const loginUser = async (email: string) => {
    const mockCustomer: Customer = {
      id: `cust-${Date.now()}`,
      name: email.split('@')[0].toUpperCase(),
      email,
      phone: '+1234567890',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      isVerified: true,
      isSuspended: false,
      totalOrders: 2,
      totalSpent: 180,
      createdAt: new Date().toISOString(),
    };
    setUser(mockCustomer);
    localStorage.setItem('darmhie_user', JSON.stringify(mockCustomer));
    return { success: true, message: 'Welcome back!' };
  };

  const registerUser = async (name: string, email: string, phone?: string) => {
    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      name,
      email,
      phone,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      isVerified: true,
      isSuspended: false,
      totalOrders: 0,
      totalSpent: 0,
      createdAt: new Date().toISOString(),
    };
    setUser(newCustomer);
    localStorage.setItem('darmhie_user', JSON.stringify(newCustomer));
    return { success: true, message: 'Account registered successfully!' };
  };

  const loginAdmin = async (userOrEmail: string, pass: string) => {
    const validUser = process.env.ADMIN_USER;
    const validPass = process.env.ADMIN_PASS;

    if (!validUser || !validPass) {
      console.error("Admin credentials not configured in environment variables.");
      return { success: false, message: 'Server configuration error: Check .env file' };
    }

    const isUserMatch = userOrEmail === validUser;
    const isPassMatch = pass === validPass;

    if (isUserMatch && isPassMatch) {
      const adminData: AdminUser = {
        id: 'admin-1',
        name: process.env.NEXT_PUBLIC_STORE_NAME || "Director Concierge",
        email: userOrEmail,
        role: 'SUPER_ADMIN',
      };
      setAdmin(adminData);
      localStorage.setItem('darmhie_admin', JSON.stringify(adminData));
      return { success: true, message: 'Director access granted' };
    }
    return { success: false, message: 'Invalid admin username or password' };
  };

  const logout = () => {
    setUser(null);
    setAdmin(null);
    localStorage.removeItem('darmhie_user');
    localStorage.removeItem('darmhie_admin');
  };

  const updateProfile = (data: Partial<Customer>) => {
    if (user) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('darmhie_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        isLoading,
        loginUser,
        registerUser,
        loginAdmin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
