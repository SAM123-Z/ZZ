import React, { useState, useEffect } from 'react';
import { Badge } from './badge';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { 
  MapPin, 
  Clock, 
  User, 
  Phone, 
  Package, 
  Truck, 
  CheckCircle, 
  AlertCircle,
  Navigation,
  Eye,
  RefreshCw
} from 'lucide-react';
import { useOrderTracking, Order } from '../../context/OrderTrackingContext';

interface RealTimeOrderTrackerProps {
  orderId: string;
  userType: 'customer' | 'restaurant' | 'delivery';
  userId: string;
  className?: string;
}

export const RealTimeOrderTracker: React.FC<RealTimeOrderTrackerProps> = ({
  orderId,
  userType,
  userId,
  className = ''
}) => {
  const { getOrderById, subscribeToOrderUpdates, updateOrderStatus } = useOrderTracking();
  const [order, setOrder] = useState<Order | undefined>(getOrderById(orderId));
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToOrderUpdates(orderId, (updatedOrder) => {
      setOrder(updatedOrder);
    });

    return unsubscribe;
  }, [orderId, subscribeToOrderUpdates]);

  if (!order) {
    return (
      <Card className={`${className} border-red-200`}>
        <CardContent className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Commande introuvable</h3>
          <p className="text-gray-600">La commande #{orderId} n'existe pas ou a été supprimée.</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cooking': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Ready For Delivery': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Out For Delivery': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'Cooking': return <Package className="w-4 h-4" />;
      case 'Ready For Delivery': return <Package className="w-4 h-4" />;
      case 'Out For Delivery': return <Truck className="w-4 h-4" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4" />;
      case 'Cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleStatusUpdate = async (newStatus: Order['orderStatus']) => {
    setIsUpdating(true);
    try {
      updateOrderStatus(orderId, newStatus, userId, `Status updated by ${userType}`);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simuler un délai
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getAvailableActions = () => {
    const actions = [];
    
    if (userType === 'restaurant') {
      switch (order.orderStatus) {
        case 'Pending':
          actions.push({ label: 'Confirmer', status: 'Confirmed' as const, color: 'bg-blue-600' });
          actions.push({ label: 'Annuler', status: 'Cancelled' as const, color: 'bg-red-600' });
          break;
        case 'Confirmed':
          actions.push({ label: 'Commencer la préparation', status: 'Cooking' as const, color: 'bg-purple-600' });
          break;
        case 'Cooking':
          actions.push({ label: 'Prêt pour livraison', status: 'Ready For Delivery' as const, color: 'bg-orange-600' });
          break;
      }
    } else if (userType === 'delivery') {
      switch (order.orderStatus) {
        case 'Ready For Delivery':
          actions.push({ label: 'Commencer la livraison', status: 'Out For Delivery' as const, color: 'bg-indigo-600' });
          break;
        case 'Out For Delivery':
          actions.push({ label: 'Marquer comme livré', status: 'Delivered' as const, color: 'bg-green-600' });
          break;
      }
    }
    
    return actions;
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: 'short'
    }).format(date);
  };

  return (
    <Card className={`${className} shadow-lg border-2 hover:shadow-xl transition-shadow duration-300`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold">Commande #{order.orderId}</span>
              <p className="text-sm text-gray-500 font-normal">
                {formatTime(order.orderDate)}
              </p>
            </div>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor(order.orderStatus)} border font-semibold px-3 py-1 flex items-center gap-1`}>
              {getStatusIcon(order.orderStatus)}
              {order.orderStatus}
            </Badge>
            {order.deliveryLocation && (
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" title="Localisation en temps réel"></div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Informations principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Client</p>
                <p className="font-semibold text-gray-800">{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.customerPhone}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Restaurant</p>
                <p className="font-semibold text-gray-800">{order.restaurantName}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {order.deliveryPersonName && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Truck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Livreur</p>
                  <p className="font-semibold text-gray-800">{order.deliveryPersonName}</p>
                  <p className="text-sm text-gray-600">{order.deliveryPersonPhone}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Adresse de livraison</p>
                <p className="text-sm text-gray-700">{order.customerAddress}</p>
                {order.distance && order.estimatedTime && (
                  <p className="text-xs text-gray-500">{order.distance} • {order.estimatedTime}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Articles commandés */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-800 mb-3">Articles commandés</h4>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="text-xl font-bold text-green-600">${order.totalAmount.toFixed(2)}</span>
          </div>
        </div>

        {/* Historique des statuts */}
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-800 mb-3">Historique de la commande</h4>
          <div className="space-y-3">
            {order.statusHistory.map((history, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === order.statusHistory.length - 1 ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {getStatusIcon(history.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-800">{history.status}</p>
                    <p className="text-xs text-gray-500">{formatTime(history.timestamp)}</p>
                  </div>
                  {history.notes && (
                    <p className="text-sm text-gray-600">{history.notes}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Localisation en temps réel */}
        {order.deliveryLocation && order.orderStatus === 'Out For Delivery' && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">Localisation en temps réel</h4>
              <div className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">En direct</span>
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">{order.deliveryLocation.address}</p>
                  <p className="text-sm text-green-600">
                    Dernière mise à jour: {formatTime(order.deliveryLocation.timestamp)}
                  </p>
                  <p className="text-xs text-green-600">
                    Lat: {order.deliveryLocation.lat.toFixed(6)}, Lng: {order.deliveryLocation.lng.toFixed(6)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions disponibles */}
        {getAvailableActions().length > 0 && (
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-800 mb-3">Actions disponibles</h4>
            <div className="flex flex-wrap gap-2">
              {getAvailableActions().map((action, index) => (
                <Button
                  key={index}
                  onClick={() => handleStatusUpdate(action.status)}
                  disabled={isUpdating}
                  className={`${action.color} hover:opacity-90 text-white transition-all duration-200`}
                >
                  {isUpdating ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    getStatusIcon(action.status)
                  )}
                  <span className="ml-2">{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Actions de contact */}
        <div className="border-t pt-4">
          <div className="flex flex-wrap gap-2">
            {userType !== 'customer' && (
              <Button variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                <Phone className="w-4 h-4 mr-2" />
                Appeler le client
              </Button>
            )}
            
            {userType === 'customer' && order.deliveryPersonPhone && (
              <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50">
                <Phone className="w-4 h-4 mr-2" />
                Appeler le livreur
              </Button>
            )}
            
            <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50">
              <Eye className="w-4 h-4 mr-2" />
              Voir les détails
            </Button>
            
            {order.deliveryLocation && (
              <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <Navigation className="w-4 h-4 mr-2" />
                Voir sur la carte
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};