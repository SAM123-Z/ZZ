import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  username: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (credentials: { usernameOrEmail: string; password: string }) => Promise<void>;
  signUp: (userData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<void>;
  signOut: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (credentials: { usernameOrEmail: string; password: string }) => {
    try {
      // Simuler un appel API
      console.log('Connexion avec:', credentials);
      
      // Simuler une authentification réussie
      const mockUser: User = {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: credentials.usernameOrEmail.includes('@') ? credentials.usernameOrEmail : 'john.doe@example.com',
        username: credentials.usernameOrEmail.includes('@') ? 'johndoe' : credentials.usernameOrEmail,
        phone: '+212 6XX XXX XXX'
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error('Échec de la connexion:', error);
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
      // Simuler un appel API
      console.log('Inscription avec:', userData);
      
      // Simuler une inscription réussie
      const newUser: User = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        username: userData.username,
        phone: userData.phone
      };
      
      setUser(newUser);
    } catch (error) {
      console.error('Échec de l\'inscription:', error);
      throw error;
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      // Simuler un appel API
      console.log('Mise à jour du profil:', userData);
      
      if (user) {
        setUser({ ...user, ...userData });
      }
    } catch (error) {
      console.error('Échec de la mise à jour du profil:', error);
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
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}