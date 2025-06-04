import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (credentials: { emailOrUsername: string; password: string }) => Promise<void>;
  signUp: (userData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (credentials: { emailOrUsername: string; password: string }) => {
    try {
      // Simulate API call
      console.log('Signing in with:', credentials);
      
      // Mock successful authentication
      setUser({
        id: '1',
        email: credentials.emailOrUsername,
        username: credentials.emailOrUsername,
      });
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signUp = async (userData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
  }) => {
    try {
      // Simulate API call
      console.log('Signing up with:', userData);
      
      // Mock successful registration
      setUser({
        id: '1',
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        username: userData.username,
      });
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
      }}
    >
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