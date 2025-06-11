import React, { useState } from 'react';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { Edit2, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Profile = () => {
  const [activeSection, setActiveSection] = useState<'basic' | 'password'>('basic');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, updateProfile } = useAuth();
  
  // État local pour les modifications
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    phone: user?.phone || '',
    email: user?.email || ''
  });

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateProfile({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        phone: formData.phone
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      username: user?.username || '',
      phone: user?.phone || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header with Avatar */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="h-32 bg-gradient-to-r from-[#ff6600] to-[#ff8533] rounded-t-lg"></div>
            <div className="px-6 pb-6">
              <div className="relative -mt-16 mb-4">
                <div className="w-32 h-32 rounded-full bg-white border-4 border-white overflow-hidden relative mx-auto shadow-lg">
                  <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-orange-100 to-orange-200">
                    <User className="w-16 h-16 text-[#ff6600]" />
                  </div>
                  <button className="absolute bottom-2 right-2 bg-[#ff6600] rounded-full p-2 shadow-lg hover:bg-[#ff6600]/90 transition-colors">
                    <Edit2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600">@{user?.username}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                activeSection === 'basic'
                  ? 'bg-[#ff6600] text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('basic')}
            >
              Informations personnelles
            </button>
            <button
              className={`flex-1 py-4 px-6 text-sm font-medium transition-colors ${
                activeSection === 'password'
                  ? 'bg-[#ff6600] text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
              onClick={() => setActiveSection('password')}
            >
              Mot de passe
            </button>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm">
            {activeSection === 'basic' ? (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Informations personnelles</h2>
                  {!isEditing && (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="border-[#ff6600] text-[#ff6600] hover:bg-[#ff6600] hover:text-white"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      Modifier
                    </Button>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="rounded-lg border-2"
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="rounded-lg border-2"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="username">Nom d'utilisateur</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        className="pl-10 rounded-lg border-2"
                        disabled={!isEditing}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Votre nom d'utilisateur unique sur la plateforme
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone (Optionnel)</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="rounded-lg border-2"
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      className="rounded-lg border-2 bg-gray-50"
                      disabled
                    />
                    <p className="text-sm text-gray-500">
                      L'email ne peut pas être modifié. Contactez le support si nécessaire.
                    </p>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end gap-3 pt-4 border-t">
                      <Button
                        variant="outline"
                        onClick={handleCancel}
                        disabled={isLoading}
                      >
                        Annuler
                      </Button>
                      <Button 
                        onClick={handleSave}
                        disabled={isLoading}
                        className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
                      >
                        {isLoading ? 'Sauvegarde...' : 'Sauvegarder'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Changer le mot de passe</h2>
                
                <div className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      className="rounded-lg border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      className="rounded-lg border-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      className="rounded-lg border-2"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button 
                      className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
                    >
                      Mettre à jour le mot de passe
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};