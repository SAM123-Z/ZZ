import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { User, Mail, CheckCircle, AlertCircle } from 'lucide-react';

const emailRecoverySchema = z.object({
  username: z.string().min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères'),
  newEmail: z.string().email('Adresse email invalide').optional(),
});

interface EmailRecoveryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'recover' | 'change';
  onModeChange: (mode: 'recover' | 'change') => void;
}

export const EmailRecoveryDialog = ({ isOpen, onOpenChange, mode, onModeChange }: EmailRecoveryDialogProps) => {
  const [step, setStep] = useState<'username' | 'verification' | 'success'>('username');
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<{username: string; email: string; restaurantName?: string} | null>(null);

  const { register, handleSubmit, formState: { errors }, setError, reset } = useForm({
    resolver: zodResolver(emailRecoverySchema)
  });

  const handleClose = () => {
    setStep('username');
    setUserInfo(null);
    reset();
    onOpenChange(false);
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      if (step === 'username') {
        // Simuler la recherche du compte par nom d'utilisateur
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simuler quelques comptes existants
        const mockAccounts = [
          { 
            username: 'hungry_puppets_resto', 
            email: 'restaurant@hungrypuppets.com',
            restaurantName: 'Hungry Puppets'
          },
          { 
            username: 'pizza_palace', 
            email: 'contact@pizzapalace.ma',
            restaurantName: 'Pizza Palace'
          },
          { 
            username: 'cafe_monarch', 
            email: 'info@cafemonarch.com',
            restaurantName: 'Café Monarch'
          }
        ];

        const foundAccount = mockAccounts.find(acc => acc.username === data.username);
        
        if (!foundAccount) {
          setError('username', {
            type: 'manual',
            message: 'Aucun compte trouvé avec ce nom d\'utilisateur'
          });
          return;
        }

        setUserInfo(foundAccount);
        setStep('verification');
      } else if (step === 'verification') {
        // Simuler l'envoi de l'email ou le changement
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        if (mode === 'recover') {
          console.log('Email de récupération envoyé à:', userInfo?.email);
        } else {
          console.log('Email changé de', userInfo?.email, 'vers', data.newEmail);
        }
        
        setStep('success');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setError('root', {
        type: 'manual',
        message: 'Une erreur est survenue. Veuillez réessayer.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'username':
        return (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-[#ff6600]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {mode === 'recover' ? 'Récupérer votre email' : 'Changer votre email'}
              </h3>
              <p className="text-sm text-gray-600">
                Entrez votre nom d'utilisateur unique de la plateforme pour continuer
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">
                Nom d'utilisateur <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  {...register('username')}
                  id="username"
                  placeholder="votre_nom_utilisateur"
                  className="pl-10 rounded-lg border-2"
                  disabled={isLoading}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message as string}</p>
              )}
              <p className="text-xs text-gray-500">
                Le nom d'utilisateur que vous avez choisi lors de l'inscription de votre restaurant
              </p>
            </div>

            {errors.root && (
              <p className="text-red-500 text-sm text-center">{errors.root.message}</p>
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
                {isLoading ? 'Recherche...' : 'Continuer'}
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
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Compte trouvé !
              </h3>
            </div>

            {/* Informations du compte trouvé */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Nom d'utilisateur :</span>
                <span className="font-medium text-[#ff6600]">@{userInfo?.username}</span>
              </div>
              {userInfo?.restaurantName && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Restaurant :</span>
                  <span className="font-medium">{userInfo.restaurantName}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Email actuel :</span>
                <span className="font-medium">{userInfo?.email}</span>
              </div>
            </div>

            {mode === 'change' && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newEmail">
                    Nouvel email <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input
                      {...register('newEmail')}
                      id="newEmail"
                      type="email"
                      placeholder="nouveau@email.com"
                      className="pl-10 rounded-lg border-2"
                      disabled={isLoading}
                    />
                  </div>
                  {errors.newEmail && (
                    <p className="text-red-500 text-sm">{errors.newEmail.message as string}</p>
                  )}
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
                    {isLoading ? 'Changement...' : 'Changer l\'email'}
                  </Button>
                </div>
              </form>
            )}

            {mode === 'recover' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    Un email de récupération sera envoyé à <strong>{userInfo?.email}</strong> 
                    avec les instructions pour récupérer l'accès à votre compte.
                  </p>
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
                    onClick={handleSubmit(onSubmit)}
                    className="flex-1 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Envoi...' : 'Envoyer l\'email'}
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
                {mode === 'recover' ? 'Email envoyé !' : 'Email changé !'}
              </h3>
              <p className="text-sm text-gray-600">
                {mode === 'recover' 
                  ? `Un email de récupération a été envoyé à ${userInfo?.email}. Vérifiez votre boîte de réception et suivez les instructions.`
                  : 'Votre adresse email a été mise à jour avec succès. Vous pouvez maintenant vous connecter avec votre nouvelle adresse.'
                }
              </p>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-medium text-yellow-800 mb-1">
                    Important à retenir :
                  </p>
                  <p className="text-xs text-yellow-700">
                    Votre nom d'utilisateur <strong>@{userInfo?.username}</strong> reste inchangé 
                    et peut toujours être utilisé pour récupérer votre compte à l'avenir.
                  </p>
                </div>
              </div>
            </div>

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
      <DialogContent className="sm:max-w-[425px] p-0">
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