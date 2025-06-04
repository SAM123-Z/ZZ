import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { CheckCircle } from 'lucide-react';

export const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderNumber, total } = location.state || {};

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Commande Confirmée !
        </h1>
        
        <p className="text-gray-600 mb-6">
          Merci pour votre commande. Votre numéro de commande est :
          <span className="block text-xl font-semibold text-[#ff6600] mt-2">
            #{orderNumber}
          </span>
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-600">Montant total</p>
          <p className="text-2xl font-bold text-[#ff6600]">
            {total.toFixed(2)} Dh
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={() => navigate('/')}
            className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
          >
            Retour à l'accueil
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/orders')}
            className="w-full border-[#ff6600] text-[#ff6600] hover:bg-[#ff6600]/10"
          >
            Voir mes commandes
          </Button>
        </div>
      </div>
    </div>
  );
};