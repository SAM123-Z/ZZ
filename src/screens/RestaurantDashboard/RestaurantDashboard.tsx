import React, { useState } from 'react';
import { Dialog, DialogContent } from '../../components/ui/dialog';
import Chart from 'react-apexcharts';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Ban as Bar, 
  ChevronDown, 
  ChevronUp, 
  Menu as MenuIcon, 
  Star, 
  X, 
  Home, 
  ShoppingBag, 
  Package, 
  Store,
  Bell,
  Settings,
  Users,
  TrendingUp,
  UserCircle,
  Edit,
  Shield,
  ChefHat,
  Clock,
  CheckCircle,
  Truck,
  DollarSign
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Menu } from './pages/Menu';
import { BasicInformation } from './pages/BasicInformation';
import { ChangePassword } from './pages/ChangePassword';
import { DashboardOverview } from './pages/DashboardOverview';

interface OrderStats {
  confirmed: number;
  cooking: number;
  readyForDelivery: number;
  onTheWay: number;
  delivered: number;
  refunded: number;
  scheduled: number;
  total: number;
}

interface TopSellingFood {
  id: number;
  name: string;
  image: string;
  soldCount: number;
  inStock: boolean;
}

interface TopRatedFood {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

interface ProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  product: TopSellingFood | TopRatedFood | null;
}

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  count?: number;
  component?: React.ReactNode;
  subItems?: { name: string; component?: React.ReactNode; count?: number; icon?: React.ReactNode }[];
}

const ProductDialog = ({ isOpen, onClose, product }: ProductDialogProps) => {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <div className="relative rounded-lg overflow-hidden">
          <button
            onClick={onClose}
            className="absolute right-2 top-2 p-1 bg-white rounded-full z-10"
          >
            <X className="h-4 w-4" />
          </button>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">
              {product.inStock ? "This product is in stock." : "This product is out of stock."}
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 text-blue-600 hover:text-blue-700"
                onClick={onClose}
              >
                Remind me later
              </Button>
              <Button
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
                onClick={onClose}
              >
                Click To View
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<TopSellingFood | TopRatedFood | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(<DashboardOverview />);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeProfileSection, setActiveProfileSection] = useState<'basic' | 'password'>('basic');
  const [expandedSections, setExpandedSections] = useState<string[]>(['ORDER MANAGEMENT']);

  const userData = {
    firstName: 'Yacin',
    lastName: 'Nicay',
    username: 'hungry_puppets_resto',
    email: 'y**********@gmail.com',
    phone: '0606060606',
    restaurantName: 'Hungry Puppets',
    restaurantImage: 'https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg'
  };

  const orderStats = {
    all: 63,
    cooking: 0,
    pending: 35,
    confirmed: 1,
    readyForDelivery: 1,
    onTheWay: 1,
    delivered: 23,
    paymentFailed: 0,
    canceled: 0
  };

  const sidebarItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      icon: <Home className="h-4 w-4" />,
      component: <DashboardOverview />
    },
    {
      name: 'COMMANDES',
      icon: <ShoppingBag className="h-4 w-4" />,
      subItems: [
        { 
          name: 'Toutes', 
          count: orderStats.all,
          icon: <Package className="h-3 w-3" />
        },
        { 
          name: 'En préparation', 
          count: orderStats.cooking,
          icon: <ChefHat className="h-3 w-3" />
        },
        { 
          name: 'En attente', 
          count: orderStats.pending,
          icon: <Clock className="h-3 w-3" />
        },
        { 
          name: 'Confirmées', 
          count: orderStats.confirmed,
          icon: <CheckCircle className="h-3 w-3" />
        },
        { 
          name: 'Prêtes', 
          count: orderStats.readyForDelivery,
          icon: <Package className="h-3 w-3" />
        },
        { 
          name: 'En livraison', 
          count: orderStats.onTheWay,
          icon: <Truck className="h-3 w-3" />
        },
        { 
          name: 'Livrées', 
          count: orderStats.delivered,
          icon: <CheckCircle className="h-3 w-3" />
        }
      ]
    },
    {
      name: 'MENU',
      icon: <Package className="h-4 w-4" />,
      subItems: [
        { 
          name: 'Gestion du menu', 
          component: <Menu />,
          icon: <ChefHat className="h-3 w-3" />
        }
      ]
    },
    {
      name: 'ANALYTICS',
      icon: <TrendingUp className="h-4 w-4" />,
      subItems: [
        { 
          name: 'Rapport des ventes',
          icon: <DollarSign className="h-3 w-3" />
        },
        { 
          name: 'Insights clients',
          icon: <Users className="h-3 w-3" />
        }
      ]
    },
    {
      name: 'CLIENTS',
      icon: <Users className="h-4 w-4" />,
      subItems: [
        { 
          name: 'Liste des clients',
          icon: <Users className="h-3 w-3" />
        },
        { 
          name: 'Commentaires',
          icon: <Star className="h-3 w-3" />
        }
      ]
    },
    {
      name: 'PARAMÈTRES',
      icon: <Settings className="h-4 w-4" />,
      subItems: [
        { 
          name: 'Informations de base',
          component: <BasicInformation />,
          icon: <UserCircle className="h-3 w-3" />
        },
        { 
          name: 'Mot de passe',
          component: <ChangePassword />,
          icon: <Shield className="h-3 w-3" />
        },
        { 
          name: 'Paiements',
          icon: <DollarSign className="h-3 w-3" />
        },
        { 
          name: 'Notifications',
          icon: <Bell className="h-3 w-3" />
        }
      ]
    }
  ];

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  const handleSubItemClick = (component: React.ReactNode | undefined) => {
    if (component) {
      setActiveComponent(component);
    }
  };

  const handleSidebarItemClick = (item: SidebarItem) => {
    if (item.component) {
      setActiveComponent(item.component);
    } else if (item.subItems) {
      toggleSection(item.name);
    }
  };

  const handleProfileClick = () => {
    setActiveComponent(<BasicInformation />);
  };

  const getStatusColor = (count: number) => {
    if (count === 0) return 'bg-gray-600 text-gray-300';
    if (count < 5) return 'bg-green-600 text-white';
    if (count < 20) return 'bg-yellow-600 text-white';
    return 'bg-red-600 text-white';
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className={cn(
        "bg-[#1a1a1a] text-white transition-all duration-300 h-screen sticky top-0 border-r border-gray-800",
        isSidebarCollapsed ? "w-16" : "w-72"
      )}>
        {/* Header */}
        <div className="p-3 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <img 
                src={userData.restaurantImage}
                alt={userData.restaurantName}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#1a1a1a] rounded-full"></div>
            </div>
            {!isSidebarCollapsed && (
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-white truncate">{userData.restaurantName}</h3>
                <p className="text-xs text-gray-400 truncate">Restaurant</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg h-8 w-8 flex-shrink-0"
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          {sidebarItems.map((item, index) => (
            <div key={index} className="mb-1">
              <div 
                className={cn(
                  "flex items-center mx-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer transition-all duration-200 rounded-lg group",
                  !isSidebarCollapsed && "justify-between"
                )}
                onClick={() => handleSidebarItemClick(item)}
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="flex-shrink-0">
                    {item.icon}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-xs font-medium tracking-wide truncate">
                      {item.name}
                    </span>
                  )}
                </div>
                {!isSidebarCollapsed && item.subItems && (
                  <ChevronDown 
                    className={cn(
                      "h-3 w-3 transition-transform duration-200 flex-shrink-0",
                      expandedSections.includes(item.name) && "rotate-180"
                    )} 
                  />
                )}
                {!isSidebarCollapsed && item.count !== undefined && (
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0",
                    getStatusColor(item.count)
                  )}>
                    {item.count}
                  </span>
                )}
              </div>
              
              {!isSidebarCollapsed && item.subItems && expandedSections.includes(item.name) && (
                <div className="ml-4 mr-2 mt-1 space-y-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center justify-between py-1.5 px-3 text-xs text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg cursor-pointer transition-all duration-200 group"
                      onClick={() => handleSubItemClick(subItem.component)}
                    >
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        {subItem.icon && (
                          <div className="flex-shrink-0">
                            {subItem.icon}
                          </div>
                        )}
                        <span className="font-medium truncate">{subItem.name}</span>
                      </div>
                      {subItem.count !== undefined && (
                        <span className={cn(
                          "px-1.5 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ml-2",
                          getStatusColor(subItem.count)
                        )}>
                          {subItem.count}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer avec profil utilisateur */}
        {!isSidebarCollapsed && (
          <div className="border-t border-gray-800 p-3">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 rounded-lg p-2 transition-colors"
              onClick={handleProfileClick}
            >
              <UserCircle className="w-8 h-8 text-gray-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-white truncate">
                  {userData.firstName} {userData.lastName}
                </p>
                <div className="flex items-center gap-1">
                  <Shield className="w-2 h-2 text-[#ff6600]" />
                  <p className="text-xs text-[#ff6600] font-medium truncate">@{userData.username}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-sm text-gray-600">Bienvenue, {userData.firstName}</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                onClick={handleProfileClick}
              >
                <UserCircle className="w-10 h-10 text-gray-400" />
                <div>
                  <p className="text-sm font-semibold">{userData.firstName} {userData.lastName}</p>
                  <div className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-[#ff6600]" />
                    <p className="text-xs text-[#ff6600] font-medium">@{userData.username}</p>
                  </div>
                  <p className="text-xs text-gray-500">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50">
          {activeComponent}
        </main>
      </div>

      <ProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
};