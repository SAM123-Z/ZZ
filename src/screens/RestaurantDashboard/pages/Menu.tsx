import React, { useState } from 'react';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Edit2, Plus, Trash2, Search, Filter, ChevronDown } from 'lucide-react';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { Input } from '../../../components/ui/input';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  allergenes: string[];
  regimes: string[];
  isAvailable: boolean;
  preparationTime?: string;
  spicyLevel?: 1 | 2 | 3;
  calories?: number;
  popular?: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Salade César",
    description: "Laitue romaine, croûtons à l'ail, parmesan, sauce césar maison",
    price: 12.90,
    image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg",
    category: "Entrées",
    allergenes: ["Gluten", "Œufs", "Lait"],
    regimes: ["Végétarien"],
    isAvailable: true,
    preparationTime: "15 min",
    spicyLevel: 1,
    calories: 320,
    popular: true
  },
  {
    id: 2,
    name: "Steak Frites",
    description: "Steak de bœuf grillé, frites maison, sauce au poivre",
    price: 24.50,
    image: "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg",
    category: "Plats principaux",
    allergenes: ["Lait"],
    regimes: [],
    isAvailable: true,
    preparationTime: "25 min",
    spicyLevel: 2,
    calories: 850,
    popular: true
  },
  {
    id: 3,
    name: "Tiramisu",
    description: "Biscuits, café, mascarpone, cacao",
    price: 8.90,
    image: "https://images.pexels.com/photos/6133305/pexels-photo-6133305.jpeg",
    category: "Desserts",
    allergenes: ["Gluten", "Œufs", "Lait"],
    regimes: ["Végétarien"],
    isAvailable: true,
    preparationTime: "10 min",
    calories: 420
  },
  {
    id: 4,
    name: "Mojito",
    description: "Rhum, menthe fraîche, citron vert, sucre de canne",
    price: 9.50,
    image: "https://images.pexels.com/photos/4021983/pexels-photo-4021983.jpeg",
    category: "Boissons",
    allergenes: [],
    regimes: ["Végétarien", "Vegan"],
    isAvailable: true,
    preparationTime: "5 min",
    calories: 180
  }
];

const categories = ["Entrées", "Plats principaux", "Desserts", "Boissons"];

export const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredItems = menuItems
    .filter(item => item.category === activeCategory)
    .filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const renderSpicyLevel = (level?: 1 | 2 | 3) => {
    if (!level) return null;
    return (
      <div className="flex items-center gap-1">
        {[...Array(level)].map((_, i) => (
          <span key={i} className="text-red-500">🌶️</span>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-[2000px] mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Menu du restaurant</h2>
            <p className="text-gray-600 mt-2">
              Gérez vos plats et leurs disponibilités
            </p>
          </div>
          <Button 
            className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white transform hover:scale-105 transition-transform duration-200 shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un plat
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Rechercher un plat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 focus:border-[#ff6600] transition-colors duration-200"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border-2 hover:border-[#ff6600] transition-colors duration-200"
          >
            <Filter className="h-4 w-4" />
            Filtres
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
        </div>

        <ScrollArea className="w-full mb-6">
          <div className="flex space-x-3 pb-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                className={`px-6 py-3 rounded-xl transform hover:scale-105 transition-all duration-200 ${
                  activeCategory === category 
                    ? "bg-[#ff6600] text-white hover:bg-[#ff6600]/90 shadow-lg"
                    : "hover:bg-gray-100 border-2"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </ScrollArea>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white hover:bg-white/90 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                  >
                    <Edit2 className="h-4 w-4 text-blue-600" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="bg-white hover:bg-white/90 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
                {!item.isAvailable && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <Badge variant="outline" className="bg-red-500 text-white border-none px-4 py-2 text-lg">
                      Non disponible
                    </Badge>
                  </div>
                )}
                {item.popular && (
                  <Badge 
                    className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 border-none shadow-lg"
                  >
                    Populaire
                  </Badge>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                    {renderSpicyLevel(item.spicyLevel)}
                  </div>
                  <span className="text-[#ff6600] text-xl font-bold">{item.price.toFixed(2)} €</span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {item.description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>⏱️ {item.preparationTime}</span>
                    <span>🔥 {item.calories} kcal</span>
                  </div>

                  {item.allergenes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.allergenes.map((allergene) => (
                        <Badge
                          key={allergene}
                          variant="outline"
                          className="text-red-600 border-red-200 bg-red-50 px-3 py-1"
                        >
                          {allergene}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {item.regimes.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.regimes.map((regime) => (
                        <Badge
                          key={regime}
                          variant="outline"
                          className="text-green-600 border-green-200 bg-green-50 px-3 py-1"
                        >
                          {regime}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};