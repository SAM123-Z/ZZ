import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { User, Mail, CheckCircle, AlertCircle, Loader2, Shield, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const usernameSchema = z.object({
  username: z.string().min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'),
});

const emailChangeSchema = z.object({
  newEmail: z.string().email('Adresse email invalide'),
  confirmNewEmail: z.string().email('Adresse email invalide')
}).refine(data => data.newEmail === data.confirmNewEmail, {
  message: "Les adresses email ne correspondent pas",
  path: ["confirmNewEmail"]
});

interface EmailRecoveryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'recover' | 'change';
  onModeChange: (mode: 'recover' | 'change') => void;
  onSuccess?: (newEmail?: string) => void;
}

export const EmailRecoveryDialog = ({ 
  isOpen, 
  onOpenChange, 
  mode, 
  onModeChange,
  onSuccess 
}: EmailRecoveryDialogProps) => {
  const { recoverEmailByUsername, changeEmailByUsername } = useAuth();
  const [step, setStep] = useState<'username' | 'verification' | 'success'>('username');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<{username: string; email: string; restaurantName?: string} | null>(null);

  const usernameForm = useForm({
    resolver: zodResolver(usernameSchema)
  });

  const emailForm = useForm({
    resolver: zodResolver(emailChangeSchema)
  });

  const handleClose = () => {
    setStep('username');
    setUserInfo(null);
    usernameForm.reset();
    emailForm.reset();
    onOpenChange(false);
  };

  const handleUsernameSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      
      // Rechercher le compte par nom d'utilisateur
      const result = await recoverEmailByUsername(data.username);
      
      setUserInfo({
        username: data.username,
        email: result.email,
        restaurantName: result.restaurantName
      });
      
      setStep('verification');
    } catch (error: any) {
      usernameForm.setError('username', {
        type: 'manual',
        message: error.message || 'Aucun compte trouvé avec ce nom d\'utilisateur'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChangeSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      
      if (!userInfo) return;
      
      // Changer l'email
      await changeEmailByUsername(userInfo.username, data.newEmail);
      
      // Notifier le succès
      onSuccess?.(data.newEmail);
      
      setStep('success');
    } catch (error: any) {
      emailForm.setError('root', {
        type: 'manual',
        message: error.message || 'Une erreur est survenue lors du changement d\'email'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecoverSubmit = async () => {
    try {
      setIsLoading(true);
      
      // Simuler l'envoi d'un email de récupération
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Email de récupération envoyé à:', userInfo?.email);
      
      setStep('success');
    } catch (error: any) {
      usernameForm.setError('root', {
        type: 'manual',
        message: 'Une erreur est survenue lors de l\'envoi de l\'email'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'username':
        return (
          <form onSubmit={usernameForm.handleSubmit(handleUsernameSubmit)} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#ff6600]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {mode === 'recover' ? 'Récupérer votre email' : 'Changer votre email'}
              </h3>
              <p className="text-sm text-gray-600">
                Utilisez votre nom d'utilisateur unique pour {mode === 'recover' ? 'récupérer' : 'changer'} votre email
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    Nom d'utilisateur unique et sécurisé
                  </p>
                  <p className="text-xs text-blue-700">
                    Votre nom d'utilisateur est unique sur toute la plateforme FoodSwift. 
                    Il vous permet de récupérer ou changer votre email même si vous n'avez 
                    plus accès à votre adresse email actuelle.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">
                Nom d'utilisateur <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  {...usernameForm.register('username')}
                  id="username"
                  placeholder="votre_nom_utilisateur"
                  className="pl-10 rounded-lg border-2"
                  disabled={isLoading}
                />
              </div>
              {usernameForm.formState.errors.username && (
                <p className="text-red-500 text-sm">{usernameForm.formState.errors.username.message as string}</p>
              )}
              
              {/* Exemples de noms d'utilisateur pour les tests */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs font-medium text-yellow-800 mb-2">
                  💡 Pour tester, utilisez un de ces noms d'utilisateur :
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <span className="bg-white px-2 py-1 rounded border text-yellow-700">hungry_puppets_resto</span>
                  <span className="bg-white px-2 py-1 rounded border text-yellow-700">pizza_palace</span>
                  <span className="bg-white px-2 py-1 rounded border text-yellow-700">cafe_monarch</span>
                  <span className="bg-white px-2 py-1 rounded border text-yellow-700">burger_king_casa</span>
                </div>
              </div>
            </div>

            {usernameForm.formState.errors.root && (
              <p className="text-red-500 text-sm text-center">{usernameForm.formState.errors.root.message}</p>
            )}

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Recherche...
                  </div>
                ) : (
                  'Continuer'
                )}
              </Button>
            </div>

            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={() => onModeChange(mode === 'recover' ? 'change' : 'recover')}
                className="text-[#ff6600] hover:text-[#ff6600]/80 p-0 text-sm"
                disabled={isLoading}
              >
                {mode === 'recover' 
                  ? 'Plutôt changer votre email ?' 
                  : 'Plutôt récupérer votre email ?'
                }
              </Button>
            </div>
          </form>
        );

      case 'verification':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Compte trouvé !
              </h3>
              <p className="text-sm text-gray-600">
                Nous avons trouvé votre compte associé à ce nom d'utilisateur
              </p>
            </div>

            {/* Informations du compte trouvé */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Nom d'utilisateur :</span>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#ff6600]" />
                  <span className="font-medium text-[#ff6600]">@{userInfo?.username}</span>
                </div>
              </div>
              {userInfo?.restaurantName && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Restaurant :</span>
                  <span className="font-medium text-gray-800">{userInfo.restaurantName}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email actuel :</span>
                <span className="font-medium text-gray-800">{userInfo?.email}</span>
              </div>
            </div>

            {mode === 'change' && (
              <form onSubmit={emailForm.handleSubmit(handleEmailChangeSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newEmail">
                    Nouvel email <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input
                      {...emailForm.register('newEmail')}
                      id="newEmail"
                      type="email"
                      placeholder="nouveau@email.com"
                      className="pl-10 rounded-lg border-2"
                      disabled={isLoading}
                    />
                  </div>
                  {emailForm.formState.errors.newEmail && (
                    <p className="text-red-500 text-sm">{emailForm.formState.errors.newEmail.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmNewEmail">
                    Confirmer le nouvel email <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input
                      {...emailForm.register('confirmNewEmail')}
                      id="confirmNewEmail"
                      type="email"
                      placeholder="nouveau@email.com"
                      className="pl-10 rounded-lg border-2"
                      disabled={isLoading}
                    />
                  </div>
                  {emailForm.formState.errors.confirmNewEmail && (
                    <p className="text-red-500 text-sm">{emailForm.formState.errors.confirmNewEmail.message as string}</p>
                  )}
                </div>

                {emailForm.formState.errors.root && (
                  <p className="text-red-500 text-sm text-center">{emailForm.formState.errors.root.message}</p>
                )}

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-orange-700">
                      <strong>Important :</strong> Une fois changé, votre nouvel email sera 
                      immédiatement synchronisé avec votre profil. Votre nom d'utilisateur 
                      restera inchangé pour de futures récupérations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('username')}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Retour
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Changement...
                      </div>
                    ) : (
                      'Changer l\'email'
                    )}
                  </Button>
                </div>
              </form>
            )}

            {mode === 'recover' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-800 mb-1">
                        Email de récupération
                      </p>
                      <p className="text-xs text-blue-700">
                        Un email avec les instructions de récupération sera envoyé à{' '}
                        <strong>{userInfo?.email}</strong>. Vérifiez votre boîte de réception 
                        et vos spams.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('username')}
                    className="flex-1"
                    disabled={isLoading}
                  >
                    Retour
                  </Button>
                  <Button
                    onClick={handleRecoverSubmit}
                    className="flex-1 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Envoi...
                      </div>
                    ) : (
                      'Envoyer l\'email'
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      case 'success':
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {mode === 'recover' ? 'Email envoyé avec succès !' : 'Email changé avec succès !'}
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {mode === 'recover' 
                  ? `Un email de récupération a été envoyé à ${userInfo?.email}. Vérifiez votre boîte de réception et suivez les instructions pour récupérer l'accès à votre compte.`
                  : 'Votre adresse email a été mise à jour avec succès. Les modifications ont été automatiquement synchronisées avec votre profil sur toute la plateforme.'
                }
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#ff6600] mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-800 mb-1">
                    Votre nom d'utilisateur reste sécurisé
                  </p>
                  <p className="text-xs text-gray-600">
                    Votre nom d'utilisateur <strong className="text-[#ff6600]">@{userInfo?.username}</strong> reste 
                    inchangé et peut toujours être utilisé pour récupérer ou changer votre email à l'avenir, 
                    même si vous perdez l'accès à votre nouvelle adresse email.
                  </p>
                </div>
              </div>
            </div>

            {mode === 'change' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-xs text-yellow-700">
                  <strong>Conseil :</strong> Notez votre nom d'utilisateur quelque part en sécurité. 
                  C'est votre clé de récupération permanente sur la plateforme FoodSwift.
                </p>
              </div>
            )}

            <Button
              onClick={handleClose}
              className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
            >
              Fermer
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-center">
            <span className="text-[#ff6600] text-2xl font-bold">Food</span>
            <span className="text-black text-2xl font-bold">Swift</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="p-6 pt-4">
          {renderStepContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};