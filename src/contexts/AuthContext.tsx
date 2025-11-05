'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiFetch, getToken } from '@/lib/api';

type User = { id: string; firstName: string; lastName: string; email: string; role: string };

type AuthContextType = {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, refreshUser: async () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const res = await apiFetch<{ user: User }>(`/api/auth/me`);
      setUser(res.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
    
    // Listen for storage changes (token updates)
    const handleStorageChange = () => {
      refreshUser();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom login event
    window.addEventListener('auth:login', handleStorageChange);
    window.addEventListener('auth:logout', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth:login', handleStorageChange);
      window.removeEventListener('auth:logout', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

