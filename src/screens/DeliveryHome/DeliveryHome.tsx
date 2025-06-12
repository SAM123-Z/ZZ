import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { RealTimeOrderTracker } from '../../components/ui/real-time-order-tracker';
import { 
  Bell,
  User,
  MapPin,
  Navigation,
  Eye,
  Wallet,
  Calendar,
  TrendingUp,
  Package,
  Clock,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Star,
  Activity,
  BarChart3,
  Truck,
  CheckCircle,
  AlertCircle,
  Phone,
  MessageSquare,
  ExternalLink
} from 'lucide-react';
import { useOrderTracking } from '../../context/OrderTrackingContext';

const orderStats = [
  {
    title: "Today's Orders",
    count: 2,
    color: 'bg-gradient-to-br from-orange-500 via-orange-600 to-red-500',
    textColor: 'text-white',
    icon: <Calendar className="w-6 h-6" />,
    change: '+12%',
    changeType: 'positive'
  },
  {
    title: "This Week Orders",
    count: 20,
    color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600',
    textColor: 'text-white',
    icon: <BarChart3 className="w-6 h-6" />,
    change: '+8%',
    changeType: 'positive'
  },
  {
    title: "This Month Orders",
    count: 60,
    color: 'bg-gradient-to-br from-green-500 via-green-600 to-emerald-600',
    textColor: 'text-white',
    icon: <TrendingUp className="w-6 h-6" />,
    change: '+15%',
    changeType: 'positive'
  },
  {
    title: "This Year Orders",
    count: 60,
    color: 'bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600',
    textColor: 'text-white',
    icon: <Activity className="w-6 h-6" />,
    change: '+25%',
    changeType: 'positive'
  },
  {
    title: "Total Orders",
    count: 60,
    color: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600',
    textColor: 'text-white',
    icon: <Package className="w-6 h-6" />,
    change: '+18%',
    changeType: 'positive'
  }
];

const earningsData = {
  balance: 0.00,
  today: 0.00,
  thisWeek: 10.00,
  thisMonth: 0.00,
  thisYear: 0.00,
  cashInHand: 0.00
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'border-l-red-500 bg-red-50';
    case 'medium': return 'border-l-yellow-500 bg-yellow-50';
    case 'low': return 'border-l-green-500 bg-green-50';
    default: return 'border-l-gray-500 bg-gray-50';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'COD': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Paid': return 'bg-green-100 text-green-800 border-green-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const DeliveryHome = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { getOrdersByDeliveryPerson, updateOrderStatus, updateDeliveryLocation } = useOrderTracking();
  
  // Obtenir les commandes assignées au livreur actuel
  const deliveryPersonId = 'delivery_1'; // ID du livreur connecté
  const assignedOrders = getOrdersByDeliveryPerson(deliveryPersonId);

  // Simuler les mises à jour de localisation
  useEffect(() => {
    if (isOnline) {
      const interval = setInterval(() => {
        // Simuler la mise à jour de localisation pour les commandes en livraison
        assignedOrders.forEach(order => {
          if (order.orderStatus === 'Out For Delivery') {
            const newLocation = {
              lat: 33.5731 + (Math.random() - 0.5) * 0.01,
              lng: -7.5898 + (Math.random() - 0.5) * 0.01,
              address: 'En route vers le client',
              timestamp: new Date()
            };
            updateDeliveryLocation(order.orderId, newLocation);
          }
        });
      }, 10000); // Mise à jour toutes les 10 secondes

      return () => clearInterval(interval);
    }
  }, [isOnline, assignedOrders, updateDeliveryLocation]);

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any, deliveryPersonId, `Status updated by delivery person`);
  };

  const openOrderTracking = (orderId: string) => {
    const url = `/order-tracking/${orderId}?userType=delivery&userId=${deliveryPersonId}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header Premium */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 lg:px-8 py-4">
          {/* Logo et branding */}
          <div className="flex items-center">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                FoodSwift Delivery
              </h1>
              <p className="text-xs text-gray-500 font-medium">Professional Dashboard</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="#" className="relative text-orange-600 font-semibold group">
              Home
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors duration-200">
              Order Request
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors duration-200">
              My Orders
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-600 font-medium transition-colors duration-200">
              Analytics
            </a>
          </nav>

          {/* Actions et profil */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-orange-50 transition-colors">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse font-bold">
                {assignedOrders.length}
              </span>
            </Button>

            {/* Toggle Online/Offline */}
            <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-2 shadow-md border">
              <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isOnline}
                  onChange={(e) => setIsOnline(e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className={`w-14 h-7 rounded-full transition-all duration-300 cursor-pointer shadow-inner ${
                    isOnline ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setIsOnline(!isOnline)}
                >
                  <div className={`w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                    isOnline ? 'translate-x-7' : 'translate-x-0.5'
                  } mt-0.5 flex items-center justify-center`}>
                    {isOnline ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <X className="w-3 h-3 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Profil utilisateur */}
            <div className="flex items-center space-x-3 bg-white rounded-full px-4 py-2 shadow-md border hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-800">Yacin</p>
                <p className="text-xs text-gray-500">Livreur Premium</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            {/* Menu mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Menu mobile */}
        {showMobileMenu && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 py-4">
            <nav className="space-y-2">
              <a href="#" className="block px-3 py-2 text-orange-600 font-semibold bg-orange-50 rounded-lg">Home</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Order Request</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">My Orders</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">Analytics</a>
            </nav>
          </div>
        )}
      </header>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Colonne principale - Active Orders */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 lg:p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">My Active Orders</h2>
                    <p className="text-sm text-gray-500">Commandes assignées ({assignedOrders.length})</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>

              {assignedOrders.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {assignedOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className={`bg-white rounded-xl shadow-lg border-l-4 ${getPriorityColor(order.priority)} p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                    >
                      {/* Header de la commande */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-gray-600">#{order.orderId}</span>
                          <Badge className={`${getStatusColor(order.paymentStatus)} border text-xs font-semibold px-2 py-1`}>
                            {order.paymentStatus}
                          </Badge>
                          {order.deliveryLocation && order.orderStatus === 'Out For Delivery' && (
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Suivi en temps réel"></div>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">${order.totalAmount.toFixed(2)}</p>
                          <p className="text-xs text-gray-500">{order.distance} • {order.estimatedTime}</p>
                        </div>
                      </div>

                      {/* Informations restaurant */}
                      <div className="space-y-3 mb-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Package className="w-4 h-4 text-orange-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Restaurant</p>
                            <p className="text-sm font-semibold text-gray-800">{order.restaurantName}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Client</p>
                            <p className="text-sm font-semibold text-gray-800">{order.customerName}</p>
                            <p className="text-xs text-gray-600">{order.customerPhone}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Adresse</p>
                            <p className="text-sm text-gray-700">{order.customerAddress}</p>
                          </div>
                        </div>
                      </div>

                      {/* Statut actuel */}
                      <div className="mb-4">
                        <Badge className={`${getStatusColor(order.orderStatus)} border text-sm font-medium px-3 py-1`}>
                          {order.orderStatus}
                        </Badge>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                          onClick={() => setSelectedOrderId(selectedOrderId === order.orderId ? null : order.orderId)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                          onClick={() => openOrderTracking(order.orderId)}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Track
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                        >
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Actions de changement de statut */}
                      {order.orderStatus === 'Ready For Delivery' && (
                        <div className="mt-3">
                          <Button 
                            size="sm"
                            onClick={() => handleStatusUpdate(order.orderId, 'Out For Delivery')}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                          >
                            Commencer la livraison
                          </Button>
                        </div>
                      )}

                      {order.orderStatus === 'Out For Delivery' && (
                        <div className="mt-3">
                          <Button 
                            size="sm"
                            onClick={() => handleStatusUpdate(order.orderId, 'Delivered')}
                            className="w-full bg-green-600 hover:bg-green-700 text-white"
                          >
                            Marquer comme livré
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande assignée</h3>
                  <p className="text-gray-600">
                    {isOnline ? 'Vous êtes en ligne et prêt à recevoir des commandes.' : 'Passez en ligne pour recevoir des commandes.'}
                  </p>
                </div>
              )}
            </div>

            {/* Tracker détaillé pour la commande sélectionnée */}
            {selectedOrderId && (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Suivi détaillé - Commande #{selectedOrderId}</h3>
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedOrderId(null)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Fermer
                  </Button>
                </div>
                <RealTimeOrderTracker
                  orderId={selectedOrderId}
                  userType="delivery"
                  userId={deliveryPersonId}
                />
              </div>
            )}
          </div>

          {/* Colonne droite - Stats et Earnings */}
          <div className="space-y-8">
            
            {/* Statistics Cards */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Orders Statistics</h3>
                  <p className="text-sm text-gray-500">Performance overview</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {orderStats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`${stat.color} rounded-2xl p-6 ${stat.textColor} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {stat.icon}
                        <div>
                          <div className="text-3xl font-bold">{stat.count}</div>
                          <div className="text-sm font-medium opacity-90">{stat.title}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-200' : 'text-red-200'}`}>
                          {stat.change}
                        </div>
                        <div className="text-xs opacity-75">vs last period</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Earnings</h3>
                  <p className="text-sm text-gray-500">Financial overview</p>
                </div>
              </div>
              
              <div className="space-y-4">
                {/* Balance Principal */}
                <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-500 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Wallet className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-medium opacity-90">Total Balance</div>
                        <div className="text-3xl font-bold">$ {earningsData.balance.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-200">+5.2%</div>
                      <div className="text-xs opacity-75">this month</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-xs opacity-80 mb-1">Today</div>
                      <div className="font-bold">$ {earningsData.today.toFixed(2)}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-xs opacity-80 mb-1">This Week</div>
                      <div className="font-bold">$ {earningsData.thisWeek.toFixed(2)}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-xs opacity-80 mb-1">This Month</div>
                      <div className="font-bold">$ {earningsData.thisMonth.toFixed(2)}</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-xs opacity-80 mb-1">This Year</div>
                      <div className="font-bold">$ {earningsData.thisYear.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                {/* Cash in Hand */}
                <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm font-medium opacity-90">Cash in Hand</div>
                        <div className="text-3xl font-bold">$ {earningsData.cashInHand.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button 
                        size="sm" 
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30 transition-all duration-200"
                        variant="outline"
                      >
                        Withdraw
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl p-4 h-auto flex flex-col items-center space-y-2 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span className="text-sm font-medium">Analytics</span>
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl p-4 h-auto flex flex-col items-center space-y-2 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <Settings className="w-5 h-5" />
                    <span className="text-sm font-medium">Settings</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};