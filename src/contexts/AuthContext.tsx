
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserType = 'admin' | 'department';

export interface User {
  id: string;
  name: string;
  type: UserType;
  department?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, loginType: UserType) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers = [
  { id: '1', name: 'System Administrator', type: 'admin' as UserType, username: 'admin', password: 'admin123', email: 'admin@aaf.edu', phone: '+91-9876543210' },
  { id: '2', name: 'Dr. Sarah Johnson', type: 'department' as UserType, department: 'Science', username: 'science', password: 'science123', email: 'science@aaf.edu', phone: '+91-9876543211' },
  { id: '3', name: 'Prof. Michael Chen', type: 'department' as UserType, department: 'Arts', username: 'arts', password: 'arts123', email: 'arts@aaf.edu', phone: '+91-9876543212' },
  { id: '4', name: 'Dr. Priya Sharma', type: 'department' as UserType, department: 'Engineering', username: 'engineering', password: 'eng123', email: 'engineering@aaf.edu', phone: '+91-9876543213' },
  { id: '5', name: 'Prof. David Wilson', type: 'department' as UserType, department: 'Commerce', username: 'commerce', password: 'comm123', email: 'commerce@aaf.edu', phone: '+91-9876543214' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('aaf_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string, loginType: UserType): boolean => {
    const foundUser = mockUsers.find(u => 
      u.username === username && 
      u.password === password && 
      u.type === loginType
    );
    
    if (foundUser) {
      const user: User = {
        id: foundUser.id,
        name: foundUser.name,
        type: foundUser.type,
        department: foundUser.department,
        email: foundUser.email,
        phone: foundUser.phone
      };
      setUser(user);
      localStorage.setItem('aaf_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('aaf_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('aaf_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, updateProfile }}>
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
