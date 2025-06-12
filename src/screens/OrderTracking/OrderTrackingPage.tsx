import React, { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { RealTimeOrderTracker } from '../../components/ui/real-time-order-tracker';
import { OrderStatusTimeline } from '../../components/ui/order-status-timeline';
import { useOrderTracking } from '../../context/OrderTrackingContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Search, Package, AlertCircle } from 'lucide-react';

export const OrderTrackingPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [searchParams] = useSearchParams();
  const userType = (searchParams.get('userType') as 'customer' | 'restaurant' | 'delivery') || 'customer';
  const userId = searchParams.get('userId') || 'user_1';
  
  const [searchOrderId, setSearchOrderId] = useState(orderId || '');
  const [selectedUserType, setSelectedUserType] = useState(userType);
  const { getOrderById } = useOrderTracking();
  
  const order = orderId ? getOrderById(orderId) : null;

  const handleSearch = () => {
    if (searchOrderId) {
      const url = `/order-tracking/${searchOrderId}?userType=${selectedUserType}&userId=${userId}`;
      window.history.pushState({}, '', url);
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Suivi de Commande en Temps Réel
            </h1>
            <p className="text-gray-600">
              Suivez votre commande étape par étape avec des mises à jour en temps réel
            </p>
          </div>

          {/* Recherche de commande */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Rechercher une commande</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="orderId">Numéro de commande</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="orderId"
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    placeholder="Ex: 100157"
                    className="pl-10 h-12 rounded-lg border-2"
                  />
                </div>
              </div>
              
              <div>
                <Label>Type d'utilisateur</Label>
                <Select value={selectedUserType} onValueChange={setSelectedUserType}>
                  <SelectTrigger className="h-12 rounded-lg border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Client</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="delivery">Livreur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={handleSearch}
                  className="w-full h-12 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white rounded-lg"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Rechercher
                </Button>
              </div>
            </div>
          </div>

          {/* Exemples de commandes pour test */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-blue-800 mb-2">💡 Commandes de test disponibles :</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <span className="bg-white px-3 py-1 rounded border text-blue-700">100157 (En livraison)</span>
              <span className="bg-white px-3 py-1 rounded border text-blue-700">100156 (En préparation)</span>
              <span className="bg-white px-3 py-1 rounded border text-blue-700">100155 (En attente)</span>
            </div>
          </div>

          {/* Contenu principal */}
          {order ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Tracker principal */}
              <div className="xl:col-span-2">
                <RealTimeOrderTracker
                  orderId={order.orderId}
                  userType={selectedUserType}
                  userId={userId}
                  className="h-fit"
                />
              </div>
              
              {/* Timeline */}
              <div>
                <OrderStatusTimeline 
                  order={order}
                  className="sticky top-8"
                />
              </div>
            </div>
          ) : orderId ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Commande introuvable</h3>
              <p className="text-gray-600 mb-6">
                La commande #{orderId} n'existe pas ou a été supprimée.
              </p>
              <Button 
                onClick={() => setSearchOrderId('')}
                className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
              >
                Rechercher une autre commande
              </Button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Aucune commande sélectionnée</h3>
              <p className="text-gray-600">
                Utilisez la barre de recherche ci-dessus pour trouver une commande à suivre.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};