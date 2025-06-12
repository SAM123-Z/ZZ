import React from 'react';
import { CheckCircle, Clock, Package, Truck, AlertCircle } from 'lucide-react';
import { Order } from '../../context/OrderTrackingContext';

interface OrderStatusTimelineProps {
  order: Order;
  className?: string;
}

const statusSteps = [
  { key: 'Pending', label: 'Commande reçue', icon: Clock },
  { key: 'Confirmed', label: 'Confirmée', icon: CheckCircle },
  { key: 'Cooking', label: 'En préparation', icon: Package },
  { key: 'Ready For Delivery', label: 'Prête pour livraison', icon: Package },
  { key: 'Out For Delivery', label: 'En livraison', icon: Truck },
  { key: 'Delivered', label: 'Livrée', icon: CheckCircle }
];

export const OrderStatusTimeline: React.FC<OrderStatusTimelineProps> = ({ 
  order, 
  className = '' 
}) => {
  const getCurrentStepIndex = () => {
    if (order.orderStatus === 'Cancelled') return -1;
    return statusSteps.findIndex(step => step.key === order.orderStatus);
  };

  const currentStepIndex = getCurrentStepIndex();
  const isCancelled = order.orderStatus === 'Cancelled';

  const getStepStatus = (stepIndex: number) => {
    if (isCancelled) return 'cancelled';
    if (stepIndex < currentStepIndex) return 'completed';
    if (stepIndex === currentStepIndex) return 'current';
    return 'pending';
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500 text-white border-green-500';
      case 'current': return 'bg-orange-500 text-white border-orange-500 animate-pulse';
      case 'cancelled': return 'bg-red-500 text-white border-red-500';
      default: return 'bg-gray-200 text-gray-500 border-gray-300';
    }
  };

  const getLineColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStepTime = (stepKey: string) => {
    const historyItem = order.statusHistory.find(h => h.status === stepKey);
    return historyItem ? formatTime(historyItem.timestamp) : null;
  };

  if (isCancelled) {
    return (
      <div className={`${className} bg-red-50 border border-red-200 rounded-lg p-6`}>
        <div className="flex items-center justify-center space-x-3">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-800">Commande annulée</h3>
            <p className="text-sm text-red-600">
              Annulée le {formatTime(order.statusHistory[order.statusHistory.length - 1].timestamp)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className} bg-white rounded-lg p-6`}>
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Suivi de la commande</h3>
      
      <div className="relative">
        {statusSteps.map((step, index) => {
          const status = getStepStatus(index);
          const StepIcon = step.icon;
          const stepTime = getStepTime(step.key);
          
          return (
            <div key={step.key} className="relative flex items-center mb-8 last:mb-0">
              {/* Ligne de connexion */}
              {index < statusSteps.length - 1 && (
                <div 
                  className={`absolute left-6 top-12 w-0.5 h-8 ${getLineColor(
                    index < currentStepIndex ? 'completed' : 'pending'
                  )}`}
                />
              )}
              
              {/* Icône du statut */}
              <div 
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 ${getStepColor(status)}`}
              >
                <StepIcon className="w-6 h-6" />
              </div>
              
              {/* Contenu du statut */}
              <div className="ml-6 flex-1">
                <div className="flex items-center justify-between">
                  <h4 className={`font-semibold ${
                    status === 'completed' ? 'text-green-700' :
                    status === 'current' ? 'text-orange-700' :
                    'text-gray-500'
                  }`}>
                    {step.label}
                  </h4>
                  {stepTime && (
                    <span className={`text-sm ${
                      status === 'completed' ? 'text-green-600' :
                      status === 'current' ? 'text-orange-600' :
                      'text-gray-500'
                    }`}>
                      {stepTime}
                    </span>
                  )}
                </div>
                
                {status === 'current' && (
                  <p className="text-sm text-orange-600 mt-1">
                    En cours...
                  </p>
                )}
                
                {status === 'completed' && (
                  <p className="text-sm text-green-600 mt-1">
                    Terminé
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Estimation de livraison */}
      {order.estimatedDeliveryTime && order.orderStatus !== 'Delivered' && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Livraison estimée</p>
              <p className="text-sm text-blue-600">
                {new Intl.DateTimeFormat('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: 'short'
                }).format(order.estimatedDeliveryTime)}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Confirmation de livraison */}
      {order.orderStatus === 'Delivered' && order.actualDeliveryTime && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Commande livrée</p>
              <p className="text-sm text-green-600">
                Livrée le {new Intl.DateTimeFormat('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: 'short'
                }).format(order.actualDeliveryTime)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};