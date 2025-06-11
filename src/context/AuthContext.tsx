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
  recoverEmailByUsername: (username: string) => Promise<{ email: string; restaurantName?: string }>;
  changeEmailByUsername: (username: string, newEmail: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Base de données simulée des utilisateurs
const mockUsers: (User & { password: string; restaurantName?: string })[] = [
  {
    id: '1',
    firstName: 'Yacin',
    lastName: 'Nicay',
    username: 'hungry_puppets_resto',
    email: 'yacin.nicay@gmail.com',
    phone: '+212 6XX XXX XXX',
    password: 'password123',
    restaurantName: 'Hungry Puppets'
  },
  {
    id: '2',
    firstName: 'Ahmed',
    lastName: 'Benali',
    username: 'pizza_palace',
    email: 'contact@pizzapalace.ma',
    phone: '+212 5XX XXX XXX',
    password: 'password123',
    restaurantName: 'Pizza Palace'
  },
  {
    id: '3',
    firstName: 'Fatima',
    lastName: 'Alaoui',
    username: 'cafe_monarch',
    email: 'info@cafemonarch.com',
    phone: '+212 6XX XXX XXX',
    password: 'password123',
    restaurantName: 'Café Monarch'
  },
  {
    id: '4',
    firstName: 'Omar',
    lastName: 'Tazi',
    username: 'burger_king_casa',
    email: 'omar.tazi@burgerking.ma',
    phone: '+212 5XX XXX XXX',
    password: 'password123',
    restaurantName: 'Burger King Casablanca'
  },
  {
    id: '5',
    firstName: 'Aicha',
    lastName: 'Mansouri',
    username: 'tajine_house',
    email: 'aicha@tajinehouse.com',
    phone: '+212 6XX XXX XXX',
    password: 'password123',
    restaurantName: 'Tajine House'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = async (credentials: { usernameOrEmail: string; password: string }) => {
    try {
      // Simuler un appel API
      console.log('Connexion avec:', credentials);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Rechercher l'utilisateur par email ou nom d'utilisateur
      const foundUser = mockUsers.find(u => 
        (u.email === credentials.usernameOrEmail || u.username === credentials.usernameOrEmail) &&
        u.password === credentials.password
      );
      
      if (!foundUser) {
        throw new Error('Identifiants invalides');
      }
      
      const { password, restaurantName, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
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
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Vérifier si le nom d'utilisateur ou l'email existe déjà
      const existingUser = mockUsers.find(u => 
        u.username === userData.username || u.email === userData.email
      );
      
      if (existingUser) {
        throw new Error('Nom d\'utilisateur ou email déjà utilisé');
      }
      
      // Créer le nouvel utilisateur
      const newUser: User = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        username: userData.username,
        phone: userData.phone
      };
      
      // Ajouter à la base de données simulée
      mockUsers.push({
        ...newUser,
        password: userData.password
      });
      
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
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (user) {
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        
        // Mettre à jour dans la base de données simulée
        const userIndex = mockUsers.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          mockUsers[userIndex] = { ...mockUsers[userIndex], ...userData };
        }
      }
    } catch (error) {
      console.error('Échec de la mise à jour du profil:', error);
      throw error;
    }
  };

  const recoverEmailByUsername = async (username: string): Promise<{ email: string; restaurantName?: string }> => {
    try {
      console.log('Récupération d\'email pour le nom d\'utilisateur:', username);
      
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Rechercher l'utilisateur par nom d'utilisateur
      const foundUser = mockUsers.find(u => u.username === username);
      
      if (!foundUser) {
        throw new Error('Aucun compte trouvé avec ce nom d\'utilisateur');
      }
      
      return {
        email: foundUser.email,
        restaurantName: foundUser.restaurantName
      };
    } catch (error) {
      console.error('Erreur lors de la récupération d\'email:', error);
      throw error;
    }
  };

  const changeEmailByUsername = async (username: string, newEmail: string): Promise<void> => {
    try {
      console.log('Changement d\'email pour:', username, 'vers:', newEmail);
      
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Rechercher l'utilisateur par nom d'utilisateur
      const userIndex = mockUsers.findIndex(u => u.username === username);
      
      if (userIndex === -1) {
        throw new Error('Aucun compte trouvé avec ce nom d\'utilisateur');
      }
      
      // Vérifier si le nouvel email n'est pas déjà utilisé
      const emailExists = mockUsers.some(u => u.email === newEmail && u.username !== username);
      if (emailExists) {
        throw new Error('Cette adresse email est déjà utilisée par un autre compte');
      }
      
      // Mettre à jour l'email
      mockUsers[userIndex].email = newEmail;
      
      // Si c'est l'utilisateur connecté, mettre à jour son profil
      if (user && user.username === username) {
        setUser({ ...user, email: newEmail });
      }
      
      console.log('Email changé avec succès de', mockUsers[userIndex].email, 'vers', newEmail);
    } catch (error) {
      console.error('Erreur lors du changement d\'email:', error);
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
        recoverEmailByUsername,
        changeEmailByUsername,
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