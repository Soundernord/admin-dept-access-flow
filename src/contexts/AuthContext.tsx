
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserType = 'admin' | 'department';

export interface User {
  id: string;
  name: string;
  type: UserType;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers = [
  { id: '1', name: 'Admin', type: 'admin' as UserType, username: 'admin', password: 'admin123' },
  { id: '2', name: 'Science Department', type: 'department' as UserType, department: 'Science', username: 'science', password: 'science123' },
  { id: '3', name: 'Arts Department', type: 'department' as UserType, department: 'Arts', username: 'arts', password: 'arts123' },
  { id: '4', name: 'Engineering Department', type: 'department' as UserType, department: 'Engineering', username: 'engineering', password: 'eng123' },
  { id: '5', name: 'Commerce Department', type: 'department' as UserType, department: 'Commerce', username: 'commerce', password: 'comm123' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('aaf_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = mockUsers.find(u => u.username === username && u.password === password);
    if (foundUser) {
      const user: User = {
        id: foundUser.id,
        name: foundUser.name,
        type: foundUser.type,
        department: foundUser.department
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

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
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
