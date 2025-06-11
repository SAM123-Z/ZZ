import React, { useState } from 'react';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';
import { User, Mail, AlertCircle, Shield } from 'lucide-react';
import { EmailRecoveryDialog } from '../../../components/auth/EmailRecoveryDialog';

export const BasicInformation = () => {
  const [isEmailRecoveryOpen, setIsEmailRecoveryOpen] = useState(false);
  const [emailRecoveryMode, setEmailRecoveryMode] = useState<'recover' | 'change'>('recover');

  // Mock user data (this would typically come from your auth context or API)
  const userData = {
    firstName: 'Yacin',
    lastName: 'Nicay',
    username: 'hungry_puppets_resto', // Nom d'utilisateur unique de la plateforme
    email: 'y**********@gmail.com',
    phone: '0606060606',
    restaurantName: 'Hungry Puppets'
  };

  const handleEmailRecovery = (mode: 'recover' | 'change') => {
    setEmailRecoveryMode(mode);
    setIsEmailRecoveryOpen(true);
  };

  return (
    <>
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <h1 className="text-2xl font-semibold mb-6">Informations de base</h1>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                defaultValue={userData.firstName}
                className="rounded-lg border-2"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                defaultValue={userData.lastName}
                className="rounded-lg border-2"
              />
            </div>
          </div>

          {/* Section Nom d'utilisateur avec informations importantes */}
          <div className="space-y-2">
            <Label htmlFor="username">Nom d'utilisateur de la plateforme</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <Input
                id="username"
                value={userData.username}
                className="pl-10 rounded-lg border-2 bg-gray-50"
                disabled
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-2">
                    Nom d'utilisateur unique et sécurisé
                  </p>
                  <p className="text-xs text-blue-700 mb-3">
                    Ce nom d'utilisateur est unique sur toute la plateforme FoodSwift. 
                    Il vous permet de récupérer ou changer votre email en cas d'oubli, 
                    même si vous n'avez plus accès à votre adresse email actuelle.
                  </p>
                  
                  {/* Barre d'actions pour l'email */}
                  <div className="bg-white rounded-lg p-3 border border-blue-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-blue-800">
                        Gestion de votre email
                      </span>
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xs text-blue-600 mb-3">
                      Email actuel : {userData.email}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEmailRecovery('recover')}
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        Récupérer email
                      </Button>
                      <Button
                        onClick={() => handleEmailRecovery('change')}
                        size="sm"
                        className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Changer email
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Téléphone <span className="text-gray-500">(Optionnel)</span>
            </Label>
            <Input
              id="phone"
              defaultValue={userData.phone}
              className="rounded-lg border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={userData.email}
              className="rounded-lg border-2"
              disabled
            />
            <p className="text-xs text-gray-500">
              Pour modifier votre email, utilisez les boutons de gestion ci-dessus avec votre nom d'utilisateur
            </p>
          </div>

          <div className="flex justify-end">
            <Button 
              className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
            >
              Sauvegarder les modifications
            </Button>
          </div>
        </div>
      </div>

      {/* Dialog de récupération/changement d'email */}
      <EmailRecoveryDialog
        isOpen={isEmailRecoveryOpen}
        onOpenChange={setIsEmailRecoveryOpen}
        mode={emailRecoveryMode}
        onModeChange={setEmailRecoveryMode}
      />
    </>
  );
};