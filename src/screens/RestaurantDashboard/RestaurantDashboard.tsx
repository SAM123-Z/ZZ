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
  Edit
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
  subItems?: { name: string; component?: React.ReactNode }[];
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

  const userData = {
    firstName: 'Yacin',
    lastName: 'Nicay',
    email: 'y**********@gmail.com',
    phone: '0606060606',
    restaurantName: 'Hungry Puppets',
    restaurantImage: 'https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg'
  };

  const sidebarItems: SidebarItem[] = [
    {
      name: 'Dashboard',
      icon: <Home className="h-5 w-5" />,
      component: <DashboardOverview />
    },
    {
      name: 'ORDER MANAGEMENT',
      icon: <ShoppingBag className="h-5 w-5" />,
      subItems: [
        { name: 'All', count: 63 },
        { name: 'Cooking', count: 0 },
        { name: 'Pending', count: 35 },
        { name: 'Confirmed', count: 1 },
        { name: 'Ready For Delivery', count: 1 },
        { name: 'Food On The Way', count: 1 },
        { name: 'Delivered', count: 23 },
        { name: 'Payment Failed', count: 0 },
        { name: 'Canceled', count: 0 },
      ]
    },
    {
      name: 'MENU',
      icon: <Package className="h-5 w-5" />,
      subItems: [
        { name: 'Menu du restaurant', component: <Menu /> }
      ]
    },
    {
      name: 'ANALYTICS',
      icon: <TrendingUp className="h-5 w-5" />,
      subItems: [
        { name: 'Sales Report' },
        { name: 'Customer Insights' },
      ]
    },
    {
      name: 'CUSTOMERS',
      icon: <Users className="h-5 w-5" />,
      subItems: [
        { name: 'Customer List' },
        { name: 'Feedback' },
      ]
    },
    {
      name: 'SETTINGS',
      icon: <Settings className="h-5 w-5" />,
      subItems: [
        { 
          name: 'Basic Information',
          component: <BasicInformation />
        },
        { 
          name: 'Change Password',
          component: <ChangePassword />
        },
        { name: 'Payment Settings' },
        { name: 'Notifications' },
      ]
    },
  ];

  const handleSubItemClick = (component: React.ReactNode | undefined) => {
    if (component) {
      setActiveComponent(component);
    }
  };

  const handleSidebarItemClick = (item: SidebarItem) => {
    if (item.component) {
      setActiveComponent(item.component);
    }
  };

  const handleProfileClick = () => {
    setActiveComponent(<BasicInformation />);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className={cn(
        "bg-[#2D2D2D] text-white transition-all duration-300 h-screen sticky top-0",
        isSidebarCollapsed ? "w-20" : "w-64"
      )}>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <img 
                src={userData.restaurantImage}
                alt={userData.restaurantName}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#2D2D2D] rounded-full"></div>
            </div>
            {!isSidebarCollapsed && (
              <div>
                <h3 className="font-bold text-lg text-white">{userData.restaurantName}</h3>
                <p className="text-xs text-gray-400">Restaurant</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-4">
          {sidebarItems.map((item, index) => (
            <div key={index} className="mb-2">
              <div 
                className={cn(
                  "flex items-center px-4 py-2.5 text-gray-400 hover:text-white hover:bg-[#ff6600]/10 cursor-pointer transition-colors",
                  !isSidebarCollapsed && "space-x-3"
                )}
                onClick={() => handleSidebarItemClick(item)}
              >
                <div className="min-w-[24px] flex items-center justify-center">
                  {item.icon}
                </div>
                {!isSidebarCollapsed && (
                  <>
                    <span className="flex-1 text-sm font-medium tracking-wide">
                      {item.name}
                    </span>
                    {item.count !== undefined && (
                      <span className="bg-[#ff6600] text-white px-2 py-0.5 rounded-full text-xs font-medium">
                        {item.count}
                      </span>
                    )}
                  </>
                )}
              </div>
              {!isSidebarCollapsed && item.subItems && (
                <div className="pl-12 pr-4 space-y-1 mt-1">
                  {item.subItems.map((subItem, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex items-center justify-between py-2 px-3 text-sm text-gray-400 hover:text-white hover:bg-[#ff6600]/5 rounded-lg cursor-pointer transition-colors"
                      onClick={() => handleSubItemClick(subItem.component)}
                    >
                      <span className="font-medium">{subItem.name}</span>
                      {subItem.count !== undefined && (
                        <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs font-medium">
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
                className="flex items-center space-x-3 cursor-pointer"
                onClick={handleProfileClick}
              >
                <UserCircle className="w-10 h-10 text-gray-400" />
                <div>
                  <p className="text-sm font-semibold">{userData.firstName} {userData.lastName}</p>
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