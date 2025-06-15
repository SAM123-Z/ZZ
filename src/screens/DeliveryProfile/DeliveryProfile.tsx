import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { 
  User, 
  Mail, 
  Phone, 
  IdCard, 
  Eye, 
  EyeOff, 
  Edit2, 
  Save, 
  X,
  Camera,
  Upload,
  Settings,
  Bell,
  Moon,
  Sun,
  Shield,
  Lock,
  Smartphone,
  Globe,
  MapPin,
  Truck,
  Star,
  Award,
  TrendingUp,
  DollarSign,
  Clock,
  Package
} from 'lucide-react';

const basicInfoSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom de famille est requis'),
  phone: z.string().min(1, 'Le téléphone est requis'),
  age: z.string().min(1, 'L\'âge est requis')
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Le mot de passe actuel est requis'),
  newPassword: z.string().min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

export const DeliveryProfile = () => {
  const [activeSection, setActiveSection] = useState<'basic' | 'password' | 'settings'>('basic');
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Données du livreur
  const deliveryPersonData = {
    firstName: 'Yacin',
    lastName: 'Nicay',
    email: 'y**********@gmail.com',
    phone: '0606060606',
    age: '28',
    vehicleType: 'Scooter',
    identityType: 'Carte d\'identité nationale',
    identityNumber: 'AB123456',
    rating: 4.8,
    totalDeliveries: 1247,
    totalEarnings: 15420.50,
    joinDate: 'Janvier 2023',
    status: 'Actif',
    level: 'Premium'
  };

  const basicInfoForm = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      firstName: deliveryPersonData.firstName,
      lastName: deliveryPersonData.lastName,
      phone: deliveryPersonData.phone,
      age: deliveryPersonData.age
    }
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema)
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBasicInfoSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Basic info updated:', data);
      setIsEditingBasic(false);
    } catch (error) {
      console.error('Error updating basic info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Password updated:', data);
      passwordForm.reset();
    } catch (error) {
      console.error('Error updating password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBasicInformation = () => (
    <div className="space-y-6">
      {/* Header avec avatar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="h-32 bg-gradient-to-r from-orange-500 to-red-500 rounded-t-xl"></div>
        <div className="px-6 pb-6">
          <div className="relative -mt-16 mb-4">
            <div className="w-32 h-32 rounded-full bg-white border-4 border-white overflow-hidden relative mx-auto shadow-lg">
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-orange-100 to-orange-200">
                  <User className="w-16 h-16 text-orange-600" />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                id="profileImageUpload"
              />
              <label
                htmlFor="profileImageUpload"
                className="absolute bottom-2 right-2 bg-orange-600 rounded-full p-2 shadow-lg hover:bg-orange-700 transition-colors cursor-pointer"
              >
                <Camera className="w-4 h-4 text-white" />
              </label>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {deliveryPersonData.firstName} {deliveryPersonData.lastName}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {deliveryPersonData.level}
              </span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {deliveryPersonData.status}
              </span>
            </div>
            <p className="text-gray-600 mt-2">Livreur depuis {deliveryPersonData.joinDate}</p>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Star className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">{deliveryPersonData.rating}</div>
              <div className="text-xs text-blue-600">Note moyenne</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <Package className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">{deliveryPersonData.totalDeliveries}</div>
              <div className="text-xs text-green-600">Livraisons</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">${deliveryPersonData.totalEarnings}</div>
              <div className="text-xs text-purple-600">Gains totaux</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Truck className="w-6 h-6 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">{deliveryPersonData.vehicleType}</div>
              <div className="text-xs text-orange-600">Véhicule</div>
            </div>
          </div>
        </div>
      </div>

      {/* Informations personnelles */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">Informations personnelles</h3>
          {!isEditingBasic ? (
            <Button
              onClick={() => setIsEditingBasic(true)}
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Modifier
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => setIsEditingBasic(false)}
                variant="outline"
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                onClick={basicInfoForm.handleSubmit(handleBasicInfoSubmit)}
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isLoading}
              >
                <Save className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <form onSubmit={basicInfoForm.handleSubmit(handleBasicInfoSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  {...basicInfoForm.register('firstName')}
                  id="firstName"
                  className="pl-10 h-12 rounded-lg border-2"
                  disabled={!isEditingBasic}
                />
              </div>
              {basicInfoForm.formState.errors.firstName && (
                <p className="text-red-500 text-sm">{basicInfoForm.formState.errors.firstName.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Nom de famille</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  {...basicInfoForm.register('lastName')}
                  id="lastName"
                  className="pl-10 h-12 rounded-lg border-2"
                  disabled={!isEditingBasic}
                />
              </div>
              {basicInfoForm.formState.errors.lastName && (
                <p className="text-red-500 text-sm">{basicInfoForm.formState.errors.lastName.message as string}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                value={deliveryPersonData.email}
                className="pl-10 h-12 rounded-lg border-2 bg-gray-50"
                disabled
              />
            </div>
            <p className="text-xs text-gray-500">L'email ne peut pas être modifié</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  {...basicInfoForm.register('phone')}
                  id="phone"
                  className="pl-10 h-12 rounded-lg border-2"
                  disabled={!isEditingBasic}
                />
              </div>
              {basicInfoForm.formState.errors.phone && (
                <p className="text-red-500 text-sm">{basicInfoForm.formState.errors.phone.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Âge</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  {...basicInfoForm.register('age')}
                  id="age"
                  className="pl-10 h-12 rounded-lg border-2"
                  disabled={!isEditingBasic}
                />
              </div>
              {basicInfoForm.formState.errors.age && (
                <p className="text-red-500 text-sm">{basicInfoForm.formState.errors.age.message as string}</p>
              )}
            </div>
          </div>

          {/* Informations véhicule et identité (lecture seule) */}
          <div className="border-t pt-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Informations vérifiées</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Type de véhicule</Label>
                <div className="relative">
                  <Truck className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={deliveryPersonData.vehicleType}
                    className="pl-10 h-12 rounded-lg border-2 bg-gray-50"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Type d'identité</Label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    value={deliveryPersonData.identityType}
                    className="pl-10 h-12 rounded-lg border-2 bg-gray-50"
                    disabled
                  />
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Ces informations ont été vérifiées lors de votre inscription et ne peuvent pas être modifiées.
            </p>
          </div>
        </form>
      </div>
    </div>
  );

  const renderPasswordSection = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">Changer le mot de passe</h3>
      
      <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-6 max-w-md">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Mot de passe actuel</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              {...passwordForm.register('currentPassword')}
              id="currentPassword"
              type={showCurrentPassword ? 'text' : 'password'}
              className="pl-10 pr-10 h-12 rounded-lg border-2"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showCurrentPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {passwordForm.formState.errors.currentPassword && (
            <p className="text-red-500 text-sm">{passwordForm.formState.errors.currentPassword.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">Nouveau mot de passe</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              {...passwordForm.register('newPassword')}
              id="newPassword"
              type={showNewPassword ? 'text' : 'password'}
              className="pl-10 pr-10 h-12 rounded-lg border-2"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showNewPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {passwordForm.formState.errors.newPassword && (
            <p className="text-red-500 text-sm">{passwordForm.formState.errors.newPassword.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              {...passwordForm.register('confirmPassword')}
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              className="pl-10 pr-10 h-12 rounded-lg border-2"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {passwordForm.formState.errors.confirmPassword && (
            <p className="text-red-500 text-sm">{passwordForm.formState.errors.confirmPassword.message as string}</p>
          )}
        </div>

        <div className="flex justify-end">
          <Button 
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? 'Mise à jour...' : 'Mettre à jour le mot de passe'}
          </Button>
        </div>
      </form>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      {/* Notifications */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">Notifications push</p>
                <p className="text-sm text-gray-600">Recevoir des notifications pour les nouvelles commandes</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  notifications ? 'bg-orange-500' : 'bg-gray-300'
                }`}
                onClick={() => setNotifications(!notifications)}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apparence */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Apparence</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
              <div>
                <p className="font-medium text-gray-800">Mode sombre</p>
                <p className="text-sm text-gray-600">Activer le thème sombre de l'application</p>
              </div>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  darkMode ? 'bg-orange-500' : 'bg-gray-300'
                }`}
                onClick={() => setDarkMode(!darkMode)}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sécurité */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Sécurité et confidentialité</h3>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start h-12">
            <Shield className="w-5 h-5 mr-3 text-blue-600" />
            <div className="text-left">
              <p className="font-medium">Authentification à deux facteurs</p>
              <p className="text-sm text-gray-600">Sécuriser votre compte avec 2FA</p>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start h-12">
            <Smartphone className="w-5 h-5 mr-3 text-green-600" />
            <div className="text-left">
              <p className="font-medium">Appareils connectés</p>
              <p className="text-sm text-gray-600">Gérer les appareils autorisés</p>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start h-12">
            <MapPin className="w-5 h-5 mr-3 text-purple-600" />
            <div className="text-left">
              <p className="font-medium">Confidentialité de localisation</p>
              <p className="text-sm text-gray-600">Contrôler le partage de position</p>
            </div>
          </Button>
        </div>
      </div>

      {/* Support */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">Support et aide</h3>
        
        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start h-12">
            <Phone className="w-5 h-5 mr-3 text-orange-600" />
            <div className="text-left">
              <p className="font-medium">Contacter le support</p>
              <p className="text-sm text-gray-600">Assistance 24h/24 et 7j/7</p>
            </div>
          </Button>

          <Button variant="outline" className="w-full justify-start h-12">
            <Globe className="w-5 h-5 mr-3 text-indigo-600" />
            <div className="text-left">
              <p className="font-medium">Centre d'aide</p>
              <p className="text-sm text-gray-600">FAQ et guides d'utilisation</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Mon Profil</h1>
              <p className="text-sm text-gray-600">Gérez vos informations personnelles</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Navigation sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sticky top-8">
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveSection('basic')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === 'basic'
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-medium">Informations de base</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveSection('password')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === 'password'
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Lock className="w-5 h-5" />
                    <span className="font-medium">Mot de passe</span>
                  </button>
                  
                  <button
                    onClick={() => setActiveSection('settings')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                      activeSection === 'settings'
                        ? 'bg-orange-100 text-orange-700 border border-orange-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium">Paramètres</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              {activeSection === 'basic' && renderBasicInformation()}
              {activeSection === 'password' && renderPasswordSection()}
              {activeSection === 'settings' && renderSettingsSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};