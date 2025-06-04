import React from 'react';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Button } from '../../../components/ui/button';

export const ChangePassword = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-6">Changer le mot de passe</h1>
      
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
  );
};