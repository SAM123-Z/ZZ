import { Menu, SearchIcon, ShoppingCart, UserCircle } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../../components/ui/sheet";
import { CartDialog } from "../../../../components/ui/cart-dialog";
import { useCart } from "../../../../context/CartContext";
import { AuthDialog } from "../../../../components/auth/AuthDialog";
import { useAuth } from "../../../../context/AuthContext";

export const HeaderSection = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const { items, updateQuantity, removeItem } = useCart();
  const { user, isAuthenticated, signOut } = useAuth();
  
  const isRestaurantSignup = location.pathname === '/restaurant-signup';

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "Restaurants", path: "/restaurants" },
  ];

  const handleNavigation = (path: string) => {
    setIsOpen(false);
    navigate(path);
  };

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <header className="w-full h-auto md:h-[82px] bg-couleur-du-fond-principale z-[3] border-b border-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between h-full px-4 md:px-8 gap-4 py-4 md:py-0">
        {/* Mobile Menu */}
        <div className="md:hidden w-full flex justify-between items-center">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-10 w-10 text-premire-couleur" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="font-police-principal-titre-1 text-premire-couleur text-3xl font-extrabold">
                    Food
                  </span>
                  <span className="font-police-principal-titre-1 text-couleur-du-texte text-3xl font-extrabold">
                    Swift
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavigation(item.path)}
                    className="text-lg font-police-courant-regular text-couleur-du-texte hover:text-premire-couleur transition-colors px-2 py-1 text-left"
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="flex items-center gap-2">
            <span className="font-police-principal-titre-1 text-premire-couleur text-3xl font-extrabold">
              Food
            </span>
            <span className="font-police-principal-titre-1 text-couleur-du-texte text-3xl font-extrabold">
              Swift
            </span>
          </Link>
        </div>

        {/* Desktop Logo */}
        <Link to="/" className="hidden md:flex items-center gap-2">
          <span className="font-police-principal-titre-1 text-premire-couleur text-4xl font-extrabold">
            Food
          </span>
          <span className="font-police-principal-titre-1 text-couleur-du-texte text-4xl font-extrabold">
            Swift
          </span>
        </Link>

        {/* Desktop Navigation Menu */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex gap-12">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  className="font-police-courant-regular text-couleur-du-texte p-2.5 cursor-pointer hover:text-premire-couleur transition-colors text-lg"
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar and Action Buttons - Hidden on Restaurant Signup */}
        {!isRestaurantSignup && (
          <>
            <div className="flex items-center gap-[15px] p-2.5 bg-[#33333333] rounded-[20px] w-full md:w-[700px]">
              <SearchIcon className="h-8 w-8 text-premire-couleur" />
              <Input
                className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 font-police-courant-light text-[#65748b] text-lg"
                placeholder="Search foods and restaurants...."
              />
            </div>

            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-6 w-6 text-premire-couleur" />
                    <span className="text-sm font-medium">{user?.username}</span>
                  </div>
                  <Button
                    onClick={signOut}
                    className="px-6 md:px-8 py-2.5 bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-[80px] font-police-principale-titres-h2 text-white text-sm md:text-base"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className="px-6 md:px-8 py-2.5 bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-[80px] font-police-principale-titres-h2 text-white text-sm md:text-base"
                    onClick={() => handleAuthClick('signup')}
                  >
                    rejoindre-nous
                  </Button>

                  <Button
                    className="px-6 md:px-8 py-2.5 bg-[#ff6600] hover:bg-[#ff6600]/90 rounded-[80px] font-police-principale-titres-h2 text-white text-sm md:text-base"
                    onClick={() => handleAuthClick('signin')}
                  >
                    Sign In
                  </Button>
                </>
              )}

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-6 w-6 text-premire-couleur" />
                {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </div>
          </>
        )}
      </div>

      <CartDialog
        open={isCartOpen}
        onOpenChange={setIsCartOpen}
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      <AuthDialog
        isOpen={isAuthOpen}
        onOpenChange={setIsAuthOpen}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </header>
  );
};