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
  DollarSign,
  AlertTriangle,
  Zap,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  MessageSquare,
  CreditCard,
  Palette,
  Globe,
  Lock,
  Smartphone,
  Headphones,
  FileText,
  Award,
  Bookmark,
  Filter,
  Search,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "../../lib/utils";
import { Menu } from './pages/Menu';
import { BasicInformation } from './pages/BasicInformation';
import { ChangePassword } from './pages/ChangePassword';
import { DashboardOverview } from './pages/DashboardOverview';
import { AddNewFood } from './pages/AddNewFood';
import { OrdersList } from './pages/OrdersList';
import { ConfirmedOrders } from './pages/ConfirmedOrders';

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
  subItems?: { 
    name: string; 
    component?: React.ReactNode; 
    count?: number; 
    icon?: React.ReactNode;
    badge?: string;
    priority?: 'high' | 'medium' | 'low';
  }[];
  isCollapsible?: boolean;
  badge?: string;
  priority?: 'high' | 'medium' | 'low';
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
  const [expandedSections, setExpandedSections] = useState<string[]>(['COMMANDES']);
  const [searchQuery, setSearchQuery] = useState('');

  const userData = {
    firstName: 'Yacin',
    lastName: 'Nicay',
    username: 'hungry_puppets_resto',
    email: 'y**********@gmail.com',
    phone: '0606060606',
    restaurantName: 'Hungry Puppets',
    restaurantImage: 'https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg',
    status: 'online' as const,
    plan: 'Premium' as const
  };

  const orderStats = {
    all: 63,
    cooking: 2,
    pending: 35,
    confirmed: 9,
    readyForDelivery: 3,
    onTheWay: 1,
    delivered: 23,
    paymentFailed: 0,
    canceled: 2
  };

  const sidebarItems: SidebarItem[] = [
    {
      name: 'Tableau de bord',
      icon: <Home className="h-4 w-4" />,
      component: <DashboardOverview />,
      badge: 'Nouveau'
    },
    {
      name: 'COMMANDES',
      icon: <ShoppingBag className="h-4 w-4" />,
      isCollapsible: true,
      count: orderStats.all,
      priority: 'high',
      subItems: [
        { 
          name: 'Toutes les commandes', 
          count: orderStats.all,
          icon: <Package className="h-3 w-3" />,
          component: <OrdersList />
        },
        { 
          name: 'En préparation', 
          count: orderStats.cooking,
          icon: <ChefHat className="h-3 w-3" />,
          priority: 'high',
          badge: orderStats.cooking > 0 ? 'Urgent' : undefined
        },
        { 
          name: 'En attente', 
          count: orderStats.pending,
          icon: <Clock className="h-3 w-3" />,
          priority: orderStats.pending > 20 ? 'high' : 'medium'
        },
        { 
          name: 'Confirmées', 
          count: orderStats.confirmed,
          icon: <CheckCircle className="h-3 w-3" />,
          component: <ConfirmedOrders />
        },
        { 
          name: 'Prêtes à livrer', 
          count: orderStats.readyForDelivery,
          icon: <Package className="h-3 w-3" />,
          priority: 'medium'
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
        },
        { 
          name: 'Annulées', 
          count: orderStats.canceled,
          icon: <X className="h-3 w-3" />
        }
      ]
    },
    {
      name: 'MENU & PRODUITS',
      icon: <ChefHat className="h-4 w-4" />,
      isCollapsible: true,
      subItems: [
        { 
          name: 'Gestion du menu', 
          component: <Menu />,
          icon: <Palette className="h-3 w-3" />
        },
        { 
          name: 'Ajouter un plat', 
          component: <AddNewFood />,
          icon: <Package className="h-3 w-3" />
        },
        { 
          name: 'Catégories', 
          icon: <Filter className="h-3 w-3" />
        },
        { 
          name: 'Promotions', 
          icon: <Target className="h-3 w-3" />,
          badge: 'Actif'
        },
        { 
          name: 'Stock & Inventaire', 
          icon: <Package className="h-3 w-3" />
        }
      ]
    },
    {
      name: 'ANALYTICS & RAPPORTS',
      icon: <BarChart3 className="h-4 w-4" />,
      isCollapsible: true,
      subItems: [
        { 
          name: 'Vue d\'ensemble', 
          icon: <Activity className="h-3 w-3" />
        },
        { 
          name: 'Ventes & Revenus', 
          icon: <DollarSign className="h-3 w-3" />
        },
        { 
          name: 'Performance menu', 
          icon: <PieChart className="h-3 w-3" />
        },
        { 
          name: 'Insights clients', 
          icon: <Users className="h-3 w-3" />
        },
        { 
          name: 'Rapports personnalisés', 
          icon: <FileText className="h-3 w-3" />
        }
      ]
    },
    {
      name: 'CLIENTS & AVIS',
      icon: <Users className="h-4 w-4" />,
      isCollapsible: true,
      subItems: [
        { 
          name: 'Base clients', 
          icon: <Users className="h-3 w-3" />
        },
        { 
          name: 'Avis & Notes', 
          icon: <Star className="h-3 w-3" />,
          count: 12,
          badge: 'Nouveau'
        },
        { 
          name: 'Programme fidélité', 
          icon: <Award className="h-3 w-3" />
        },
        { 
          name: 'Support client', 
          icon: <Headphones className="h-3 w-3" />
        }
      ]
    },
    {
      name: 'MARKETING',
      icon: <Zap className="h-4 w-4" />,
      isCollapsible: true,
      subItems: [
        { 
          name: 'Campagnes', 
          icon: <Target className="h-3 w-3" />
        },
        { 
          name: 'Notifications push', 
          icon: <Smartphone className="h-3 w-3" />
        },
        { 
          name: 'Email marketing', 
          icon: <MessageSquare className="h-3 w-3" />
        },
        { 
          name: 'Réseaux sociaux', 
          icon: <Globe className="h-3 w-3" />
        }
      ]
    },
    {
      name: 'FINANCES',
      icon: <CreditCard className="h-4 w-4" />,
      isCollapsible: true,
      subItems: [
        { 
          name: 'Paiements', 
          icon: <CreditCard className="h-3 w-3" />
        },
        { 
          name: 'Factures', 
          icon: <FileText className="h-3 w-3" />
        },
        { 
          name: 'Commissions', 
          icon: <DollarSign className="h-3 w-3" />
        },
        { 
          name: 'Historique', 
          icon: <Calendar className="h-3 w-3" />
        }
      ]
    },
    {
      name: 'PARAMÈTRES',
      icon: <Settings className="h-4 w-4" />,
      isCollapsible: true,
      subItems: [
        { 
          name: 'Profil restaurant',
          component: <BasicInformation />,
          icon: <Store className="h-3 w-3" />
        },
        { 
          name: 'Sécurité',
          component: <ChangePassword />,
          icon: <Lock className="h-3 w-3" />
        },
        { 
          name: 'Notifications', 
          icon: <Bell className="h-3 w-3" />
        },
        { 
          name: 'Intégrations', 
          icon: <Globe className="h-3 w-3" />
        },
        { 
          name: 'Préférences', 
          icon: <Settings className="h-3 w-3" />
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
    } else if (item.isCollapsible) {
      toggleSection(item.name);
    }
  };

  const handleProfileClick = () => {
    setActiveComponent(<BasicInformation />);
  };

  const getStatusColor = (count: number, priority?: 'high' | 'medium' | 'low') => {
    if (count === 0) return 'bg-gray-500 text-gray-100';
    
    if (priority === 'high') return 'bg-red-500 text-white animate-pulse';
    if (priority === 'medium') return 'bg-yellow-500 text-white';
    
    if (count < 5) return 'bg-green-500 text-white';
    if (count < 20) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getBadgeColor = (badge: string) => {
    switch (badge.toLowerCase()) {
      case 'urgent': return 'bg-red-500 text-white animate-pulse';
      case 'nouveau': return 'bg-blue-500 text-white';
      case 'actif': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredItems = sidebarItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.subItems?.some(subItem => 
      subItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <aside className={cn(
        "bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white transition-all duration-300 h-screen sticky top-0 border-r border-gray-700 shadow-2xl",
        isSidebarCollapsed ? "w-16" : "w-80",
        "flex flex-col relative"
      )}>
        {/* Bouton de toggle principal */}
        <Button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className={cn(
            "absolute -right-3 top-6 z-50 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white rounded-full p-2 shadow-lg transition-all duration-300",
            "border-2 border-white"
          )}
          size="icon"
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        {/* Header Premium */}
        <div className={cn(
          "p-3 border-b border-gray-700 bg-gradient-to-r from-[#ff6600] to-[#ff8533]",
          isSidebarCollapsed && "px-2"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 min-w-0 flex-1">
              <div className="relative flex-shrink-0">
                <img 
                  src={userData.restaurantImage}
                  alt={userData.restaurantName}
                  className={cn(
                    "object-cover rounded-xl border-2 border-white/20 shadow-lg",
                    isSidebarCollapsed ? "w-8 h-8" : "w-12 h-12"
                  )}
                />
                <div className={cn(
                  "absolute -bottom-1 -right-1 border-2 border-white rounded-full",
                  getStatusIndicator(userData.status),
                  isSidebarCollapsed ? "w-3 h-3" : "w-4 h-4"
                )}></div>
              </div>
              {!isSidebarCollapsed && (
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-white truncate text-sm">
                    {userData.restaurantName}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/80 truncate">
                      Plan {userData.plan}
                    </span>
                    <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                    <span className="text-xs text-white/80 capitalize">
                      {userData.status}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {!isSidebarCollapsed && (
          <div className="p-3 border-b border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#ff6600] transition-colors"
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          {filteredItems.map((item, index) => (
            <div key={index} className="mb-1">
              <div 
                className={cn(
                  "flex items-center mx-2 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#ff6600]/20 hover:to-transparent cursor-pointer transition-all duration-200 rounded-lg group relative",
                  !isSidebarCollapsed && "justify-between"
                )}
                onClick={() => handleSidebarItemClick(item)}
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <div className="flex-shrink-0 relative">
                    {item.icon}
                    {item.priority === 'high' && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  {!isSidebarCollapsed && (
                    <span className="text-xs font-medium tracking-wide truncate">
                      {item.name}
                    </span>
                  )}
                </div>
                
                {!isSidebarCollapsed && (
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium",
                        getBadgeColor(item.badge)
                      )}>
                        {item.badge}
                      </span>
                    )}
                    {item.count !== undefined && (
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-bold min-w-[20px] text-center",
                        getStatusColor(item.count, item.priority)
                      )}>
                        {item.count}
                      </span>
                    )}
                    {item.isCollapsible && (
                      <ChevronDown 
                        className={cn(
                          "h-3 w-3 transition-transform duration-200 flex-shrink-0",
                          expandedSections.includes(item.name) && "rotate-180"
                        )} 
                      />
                    )}
                  </div>
                )}

                {/* Tooltip pour mode collapsed */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap border border-gray-700">
                    {item.name}
                    {item.count !== undefined && (
                      <span className="ml-2 text-[#ff6600] font-bold">({item.count})</span>
                    )}
                  </div>
                )}
              </div>
              
              {!isSidebarCollapsed && item.subItems && expandedSections.includes(item.name) && (
                <div className="ml-4 mr-2 mt-1 space-y-0.5 border-l border-gray-700 pl-4">
                  {item.subItems.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center justify-between py-2 px-3 text-xs text-gray-400 hover:text-white hover:bg-gradient-to-r hover:from-[#ff6600]/10 hover:to-transparent rounded-lg cursor-pointer transition-all duration-200 group relative"
                      onClick={() => handleSubItemClick(subItem.component)}
                    >
                      <div className="flex items-center space-x-2 min-w-0 flex-1">
                        {subItem.icon && (
                          <div className="flex-shrink-0 relative">
                            {subItem.icon}
                            {subItem.priority === 'high' && (
                              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                          </div>
                        )}
                        <span className="font-medium truncate">{subItem.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {subItem.badge && (
                          <span className={cn(
                            "px-1.5 py-0.5 rounded-full text-xs font-medium",
                            getBadgeColor(subItem.badge)
                          )}>
                            {subItem.badge}
                          </span>
                        )}
                        {subItem.count !== undefined && (
                          <span className={cn(
                            "px-1.5 py-0.5 rounded-full text-xs font-bold min-w-[18px] text-center",
                            getStatusColor(subItem.count, subItem.priority)
                          )}>
                            {subItem.count}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer avec profil utilisateur */}
        {!isSidebarCollapsed && (
          <div className="border-t border-gray-700 p-3 bg-gradient-to-r from-gray-900 to-gray-800">
            <div 
              className="flex items-center space-x-3 cursor-pointer hover:bg-gray-700/50 rounded-lg p-2 transition-colors group"
              onClick={handleProfileClick}
            >
              <div className="relative">
                <UserCircle className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors flex-shrink-0" />
                <div className={cn(
                  "absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-gray-800 rounded-full",
                  getStatusIndicator(userData.status)
                )}></div>
              </div>
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
        {/* Header amélioré */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-600">Bienvenue, {userData.firstName}</p>
              </div>
              
              {/* Quick stats */}
              <div className="hidden lg:flex items-center gap-6 ml-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{orderStats.all}</p>
                  <p className="text-xs text-gray-500">Commandes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#ff6600]">{orderStats.cooking}</p>
                  <p className="text-xs text-gray-500">En cours</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">4.8</p>
                  <p className="text-xs text-gray-500">Note</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Quick actions */}
              <div className="hidden md:flex items-center gap-2">
                <Button size="sm" variant="outline" className="text-xs">
                  <Calendar className="h-3 w-3 mr-1" />
                  Aujourd'hui
                </Button>
                <Button size="sm" variant="outline" className="text-xs">
                  <Filter className="h-3 w-3 mr-1" />
                  Filtres
                </Button>
              </div>
              
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  3
                </span>
              </Button>
              
              <div 
                className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                onClick={handleProfileClick}
              >
                <div className="relative">
                  <UserCircle className="w-10 h-10 text-gray-400" />
                  <div className={cn(
                    "absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full",
                    getStatusIndicator(userData.status)
                  )}></div>
                </div>
                <div className="hidden sm:block">
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