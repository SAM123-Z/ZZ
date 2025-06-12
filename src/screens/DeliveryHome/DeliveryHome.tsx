import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
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
  DollarSign
} from 'lucide-react';

interface Order {
  id: string;
  orderId: string;
  status: 'COD';
  restaurantLocation: string;
  address: string;
}

const activeOrders: Order[] = [
  {
    id: '1',
    orderId: '100102',
    status: 'COD',
    restaurantLocation: 'Restaurant Location',
    address: 'House : 00 , Road : 00 , Test City'
  },
  {
    id: '2',
    orderId: '100102',
    status: 'COD',
    restaurantLocation: 'Restaurant Location',
    address: 'House : 00 , Road : 00 , Test City'
  },
  {
    id: '3',
    orderId: '100102',
    status: 'COD',
    restaurantLocation: 'Restaurant Location',
    address: 'House : 00 , Road : 00 , Test City'
  },
  {
    id: '4',
    orderId: '100102',
    status: 'COD',
    restaurantLocation: 'Restaurant Location',
    address: 'House : 00 , Road : 00 , Test City'
  },
  {
    id: '5',
    orderId: '100102',
    status: 'COD',
    restaurantLocation: 'Restaurant Location',
    address: 'House : 00 , Road : 00 , Test City'
  },
  {
    id: '6',
    orderId: '100102',
    status: 'COD',
    restaurantLocation: 'Restaurant Location',
    address: 'House : 00 , Road : 00 , Test City'
  }
];

const orderStats = [
  {
    title: "Today's Orders",
    count: 2,
    color: 'bg-gradient-to-r from-orange-500 to-orange-600',
    textColor: 'text-white'
  },
  {
    title: "This Week Orders",
    count: 20,
    color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    textColor: 'text-white'
  },
  {
    title: "This month Orders",
    count: 60,
    color: 'bg-gradient-to-r from-green-500 to-green-600',
    textColor: 'text-white'
  },
  {
    title: "This Year Orders",
    count: 60,
    color: 'bg-gradient-to-r from-teal-600 to-teal-700',
    textColor: 'text-white'
  },
  {
    title: "Total Orders",
    count: 60,
    color: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
    textColor: 'text-white'
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

export const DeliveryHome = () => {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">D</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Delivery App</h1>
              <p className="text-xs text-gray-500">v2.0</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-orange-500 font-medium border-b-2 border-orange-500 pb-1">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Order Request</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">My orders</a>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </Button>

            {/* Online/Offline Toggle */}
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={isOnline}
                  onChange={(e) => setIsOnline(e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    isOnline ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setIsOnline(!isOnline)}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                    isOnline ? 'translate-x-6' : 'translate-x-0.5'
                  } mt-0.5`}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <User className="h-8 w-8 text-gray-400" />
              <div className="text-right">
                <p className="text-sm font-medium">Yacin</p>
                <p className="text-xs text-gray-500">y**********@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Colonne gauche - Active Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Active Orders</h2>
                <Button variant="link" className="text-orange-500 hover:text-orange-600">
                  View All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {activeOrders.map((order) => (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Order ID : # {order.orderId}</span>
                      <Badge className="bg-red-500 text-white border-none text-xs">
                        {order.status}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Package className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-xs text-gray-500">Restaurant Location</p>
                          <p className="text-sm text-gray-700">{order.restaurantLocation}</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-700">{order.address}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs py-2"
                      >
                        Detail's
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-xs py-2 flex items-center justify-center gap-1"
                      >
                        <Navigation className="w-3 h-3" />
                        Direction
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Colonne droite - Stats */}
          <div className="space-y-6">
            
            {/* Orders Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Orders</h3>
              
              <div className="space-y-4">
                {orderStats.map((stat, index) => (
                  <div 
                    key={index}
                    className={`${stat.color} rounded-2xl p-6 text-center ${stat.textColor}`}
                  >
                    <div className="text-4xl font-bold mb-2">{stat.count}</div>
                    <div className="text-sm font-medium">{stat.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Earnings</h3>
              
              <div className="space-y-4">
                {/* Balance */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                  <div className="flex items-center mb-4">
                    <Wallet className="w-6 h-6 mr-2" />
                    <span className="text-sm font-medium">Balance</span>
                  </div>
                  <div className="text-3xl font-bold mb-4">$ {earningsData.balance.toFixed(2)}</div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-xs opacity-80">Today</div>
                      <div className="font-semibold">$ {earningsData.today.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-80">This Week</div>
                      <div className="font-semibold">$ {earningsData.thisWeek.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-80">This Month</div>
                      <div className="font-semibold">$ {earningsData.thisMonth.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-80">This Year</div>
                      <div className="font-semibold">$ {earningsData.thisYear.toFixed(2)}</div>
                    </div>
                  </div>
                </div>

                {/* Cash in Hand */}
                <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white text-center">
                  <div className="text-3xl font-bold mb-2">$ {earningsData.cashInHand.toFixed(2)}</div>
                  <div className="text-sm font-medium">Cash in your Hand</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};