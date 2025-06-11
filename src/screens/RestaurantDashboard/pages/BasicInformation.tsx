import React, { useState, useEffect } from 'react';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { User, Mail, AlertCircle, Shield, CheckCircle, Eye, EyeOff, Loader2, RefreshCw } from 'lucide-react';
import { EmailRecoveryDialog } from '../../../components/auth/EmailRecoveryDialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../../context/AuthContext';

const basicInfoSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  phone: z.string().optional(),
});

const emailChangeSchema = z.object({
  currentPassword: z.string().min(1, 'Le mot de passe actuel est requis'),
  newEmail: z.string().email('Adresse email invalide'),
  confirmNewEmail: z.string().email('Adresse email invalide')
}).refine(data => data.newEmail === data.confirmNewEmail, {
  message: "Les adresses email ne correspondent pas",
  path: ["confirmNewEmail"]
});

export const BasicInformation = () => {
  const { user, updateProfile } = useAuth();
  const [isEmailRecoveryOpen, setIsEmailRecoveryOpen] = useState(false);
  const [emailRecoveryMode, setEmailRecoveryMode] = useState<'recover' | 'change'>('recover');
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [emailChangeSuccess, setEmailChangeSuccess] = useState(false);
  const [isLoadingEmailChange, setIsLoadingEmailChange] = useState(false);
  const [isLoadingBasicInfo, setIsLoadingBasicInfo] = useState(false);
  const [basicInfoSuccess, setBasicInfoSuccess] = useState(false);

  // Mock user data enrichi avec les données du contexte
  const userData = {
    firstName: user?.firstName || 'Yacin',
    lastName: user?.lastName || 'Nicay',
    username: user?.username || 'hungry_puppets_resto',
    email: user?.email || 'yacin.nicay@gmail.com',
    phone: user?.phone || '+212 6XX XXX XXX',
    restaurantName: 'Hungry Puppets'
  };

  // Formulaire pour les informations de base
  const basicInfoForm = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
    }
  });

  // Formulaire pour le changement d'email
  const emailChangeForm = useForm({
    resolver: zodResolver(emailChangeSchema)
  });

  // Synchroniser les valeurs par défaut quand l'utilisateur change
  useEffect(() => {
    basicInfoForm.reset({
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
    });
  }, [user, basicInfoForm]);

  const handleEmailRecovery = (mode: 'recover' | 'change') => {
    setEmailRecoveryMode(mode);
    setIsEmailRecoveryOpen(true);
  };

  const handleBasicInfoSubmit = async (data: any) => {
    try {
      setIsLoadingBasicInfo(true);

      // Simuler la sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mettre à jour le profil via le contexte
      await updateProfile({
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone
      });

      setBasicInfoSuccess(true);
      setTimeout(() => setBasicInfoSuccess(false), 3000);

    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      basicInfoForm.setError('root', {
        type: 'manual',
        message: 'Erreur lors de la sauvegarde des informations'
      });
    } finally {
      setIsLoadingBasicInfo(false);
    }
  };

  const handleDirectEmailChange = async (data: any) => {
    try {
      setIsLoadingEmailChange(true);

      // Simuler la vérification du mot de passe
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simuler la validation du mot de passe (ici on accepte "password123")
      if (data.currentPassword !== 'password123') {
        emailChangeForm.setError('currentPassword', {
          type: 'manual',
          message: 'Mot de passe incorrect'
        });
        return;
      }

      // Simuler le changement d'email
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mettre à jour l'email via le contexte
      await updateProfile({
        email: data.newEmail
      });

      console.log('Email changé de', userData.email, 'vers', data.newEmail);
      
      setEmailChangeSuccess(true);
      setIsChangingEmail(false);
      emailChangeForm.reset();

      // Masquer le message de succès après 5 secondes
      setTimeout(() => {
        setEmailChangeSuccess(false);
      }, 5000);

    } catch (error) {
      console.error('Erreur lors du changement d\'email:', error);
      emailChangeForm.setError('root', {
        type: 'manual',
        message: 'Une erreur est survenue lors du changement d\'email'
      });
    } finally {
      setIsLoadingEmailChange(false);
    }
  };

  const cancelEmailChange = () => {
    setIsChangingEmail(false);
    setEmailChangeSuccess(false);
    emailChangeForm.reset();
  };

  const handleEmailRecoverySuccess = (newEmail?: string) => {
    if (newEmail) {
      // L'email a été changé via le nom d'utilisateur
      setEmailChangeSuccess(true);
      setTimeout(() => setEmailChangeSuccess(false), 5000);
    }
  };

  const refreshUserData = () => {
    // Simuler un rafraîchissement des données
    window.location.reload();
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Informations de base</h1>
        
        <div className="space-y-8">
          {/* Formulaire des informations de base */}
          <form onSubmit={basicInfoForm.handleSubmit(handleBasicInfoSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom <span className="text-red-500">*</span></Label>
                <Input
                  {...basicInfoForm.register('firstName')}
                  id="firstName"
                  className="rounded-lg border-2"
                  disabled={isLoadingBasicInfo}
                />
                {basicInfoForm.formState.errors.firstName && (
                  <p className="text-red-500 text-sm">{basicInfoForm.formState.errors.firstName.message as string}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom <span className="text-red-500">*</span></Label>
                <Input
                  {...basicInfoForm.register('lastName')}
                  id="lastName"
                  className="rounded-lg border-2"
                  disabled={isLoadingBasicInfo}
                />
                {basicInfoForm.formState.errors.lastName && (
                  <p className="text-red-500 text-sm">{basicInfoForm.formState.errors.lastName.message as string}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Téléphone <span className="text-gray-500">(Optionnel)</span>
              </Label>
              <Input
                {...basicInfoForm.register('phone')}
                id="phone"
                placeholder="+212 6XX XXX XXX"
                className="rounded-lg border-2"
                disabled={isLoadingBasicInfo}
              />
            </div>

            {/* Message de succès pour les infos de base */}
            {basicInfoSuccess && (
              <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <p className="text-sm font-medium text-green-800">
                    Informations mises à jour avec succès !
                  </p>
                </div>
              </div>
            )}

            {basicInfoForm.formState.errors.root && (
              <p className="text-red-500 text-sm">{basicInfoForm.formState.errors.root.message}</p>
            )}

            <div className="flex justify-end">
              <Button 
                type="submit"
                disabled={isLoadingBasicInfo}
                className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
              >
                {isLoadingBasicInfo ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sauvegarde...
                  </div>
                ) : (
                  'Sauvegarder les modifications'
                )}
              </Button>
            </div>
          </form>

          {/* Section Nom d'utilisateur et gestion d'email */}
          <div className="border-t pt-6">
            <div className="space-y-6">
              {/* Section Nom d'utilisateur */}
              <div className="space-y-2">
                <Label htmlFor="username">Nom d'utilisateur de la plateforme</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    id="username"
                    value={userData.username}
                    className="pl-10 pr-10 rounded-lg border-2 bg-gray-50"
                    disabled
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-800 mb-2">
                        Nom d'utilisateur unique et sécurisé
                      </p>
                      <p className="text-xs text-blue-700 mb-4">
                        Ce nom d'utilisateur est unique sur toute la plateforme FoodSwift. 
                        Il vous permet de récupérer ou changer votre email en cas d'oubli, 
                        même si vous n'avez plus accès à votre adresse email actuelle.
                      </p>
                      
                      {/* Message de succès pour changement d'email */}
                      {emailChangeSuccess && (
                        <div className="bg-green-50 border border-green-300 rounded-lg p-3 mb-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <p className="text-sm font-medium text-green-800">
                              Email changé avec succès !
                            </p>
                          </div>
                          <p className="text-xs text-green-700 mt-1">
                            Votre nouvelle adresse email a été enregistrée et synchronisée automatiquement.
                          </p>
                        </div>
                      )}
                      
                      {/* Barre d'actions pour l'email */}
                      <div className="bg-white rounded-lg p-4 border border-blue-300">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-blue-800">
                            Gestion de votre email
                          </span>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-600" />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={refreshUserData}
                              className="h-6 w-6 p-0 hover:bg-blue-100"
                              title="Actualiser les données"
                            >
                              <RefreshCw className="w-3 h-3 text-blue-600" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-xs text-blue-600 mb-1">Email actuel :</p>
                          <p className="text-sm font-medium text-gray-800 bg-gray-50 px-3 py-2 rounded border">
                            {user?.email || userData.email}
                          </p>
                        </div>

                        {/* Formulaire de changement d'email direct */}
                        {isChangingEmail ? (
                          <form onSubmit={emailChangeForm.handleSubmit(handleDirectEmailChange)} className="space-y-4">
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <Label htmlFor="currentPassword" className="text-xs">
                                  Mot de passe actuel <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                  <Input
                                    {...emailChangeForm.register('currentPassword')}
                                    id="currentPassword"
                                    type={showCurrentPassword ? 'text' : 'password'}
                                    placeholder="Votre mot de passe"
                                    className="text-sm h-9 pr-10"
                                    disabled={isLoadingEmailChange}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                    disabled={isLoadingEmailChange}
                                  >
                                    {showCurrentPassword ? (
                                      <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                      <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                  </button>
                                </div>
                                {emailChangeForm.formState.errors.currentPassword && (
                                  <p className="text-red-500 text-xs">{emailChangeForm.formState.errors.currentPassword.message as string}</p>
                                )}
                              </div>

                              <div className="space-y-1">
                                <Label htmlFor="newEmail" className="text-xs">
                                  Nouvel email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                  {...emailChangeForm.register('newEmail')}
                                  id="newEmail"
                                  type="email"
                                  placeholder="nouveau@email.com"
                                  className="text-sm h-9"
                                  disabled={isLoadingEmailChange}
                                />
                                {emailChangeForm.formState.errors.newEmail && (
                                  <p className="text-red-500 text-xs">{emailChangeForm.formState.errors.newEmail.message as string}</p>
                                )}
                              </div>

                              <div className="space-y-1">
                                <Label htmlFor="confirmNewEmail" className="text-xs">
                                  Confirmer le nouvel email <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                  {...emailChangeForm.register('confirmNewEmail')}
                                  id="confirmNewEmail"
                                  type="email"
                                  placeholder="nouveau@email.com"
                                  className="text-sm h-9"
                                  disabled={isLoadingEmailChange}
                                />
                                {emailChangeForm.formState.errors.confirmNewEmail && (
                                  <p className="text-red-500 text-xs">{emailChangeForm.formState.errors.confirmNewEmail.message as string}</p>
                                )}
                              </div>
                            </div>

                            {emailChangeForm.formState.errors.root && (
                              <p className="text-red-500 text-xs">{emailChangeForm.formState.errors.root.message}</p>
                            )}

                            <div className="flex gap-2">
                              <Button
                                type="button"
                                onClick={cancelEmailChange}
                                size="sm"
                                variant="outline"
                                className="flex-1 text-xs border-gray-300 text-gray-700 hover:bg-gray-50 h-8"
                                disabled={isLoadingEmailChange}
                              >
                                Annuler
                              </Button>
                              <Button
                                type="submit"
                                size="sm"
                                className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white h-8"
                                disabled={isLoadingEmailChange}
                              >
                                {isLoadingEmailChange ? (
                                  <div className="flex items-center gap-1">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    Changement...
                                  </div>
                                ) : (
                                  'Confirmer'
                                )}
                              </Button>
                            </div>

                            <div className="bg-yellow-50 border border-yellow-200 rounded p-2">
                              <p className="text-xs text-yellow-800">
                                💡 <strong>Astuce :</strong> Pour tester, utilisez le mot de passe "password123"
                              </p>
                            </div>
                          </form>
                        ) : (
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <Button
                                onClick={() => handleEmailRecovery('recover')}
                                size="sm"
                                variant="outline"
                                className="flex-1 text-xs border-blue-300 text-blue-700 hover:bg-blue-50 h-8"
                              >
                                Récupérer email
                              </Button>
                              <Button
                                onClick={() => setIsChangingEmail(true)}
                                size="sm"
                                className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white h-8"
                              >
                                Changer email
                              </Button>
                            </div>
                            
                            <div className="text-center">
                              <Button
                                onClick={() => handleEmailRecovery('change')}
                                variant="link"
                                className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto"
                              >
                                🔐 Utiliser le nom d'utilisateur pour changer l'email
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Email (lecture seule) */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || userData.email}
                  className="rounded-lg border-2 bg-gray-50"
                  disabled
                />
                <p className="text-xs text-gray-500">
                  Pour modifier votre email, utilisez les options de gestion ci-dessus ou votre nom d'utilisateur
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog de récupération/changement d'email via nom d'utilisateur */}
      <EmailRecoveryDialog
        isOpen={isEmailRecoveryOpen}
        onOpenChange={setIsEmailRecoveryOpen}
        mode={emailRecoveryMode}
        onModeChange={setEmailRecoveryMode}
        onSuccess={handleEmailRecoverySuccess}
      />
    </>
  );
};