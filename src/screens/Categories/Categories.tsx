import React, { useState } from "react";
import { SearchIcon, StarIcon, ShoppingCart } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { useCart } from "../../context/CartContext";

// Food items data with high-quality images
const foodItems = [
  {
    id: 1,
    name: "Gâteau",
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg",
    price: 9.70,
    oldPrice: 10.00,
    rating: 5,
    deliveryTime: "30 à 40 minutes",
    inStock: true
  },
  {
    id: 2,
    name: "Cupcake au chocolat",
    image: "https://images.pexels.com/photos/3776947/pexels-photo-3776947.jpeg",
    price: 18.00,
    deliveryTime: "30 à 40 minutes",
    inStock: true
  },
  {
    id: 3,
    name: "Gâteau fondant au be",
    image: "https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg",
    price: 17.00,
    deliveryTime: "30 à 40 minutes",
    inStock: false
  },
  {
    id: 4,
    name: "Rouleaux de printemps",
    image: "https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg",
    price: 13.00,
    rating: 5,
    deliveryTime: "30 à 40 minutes",
    inStock: true
  },
  {
    id: 5,
    name: "Gâteau éponge",
    image: "https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg",
    price: 142.50,
    oldPrice: 150.00,
    rating: 5,
    deliveryTime: "30 à 40 minutes",
    inStock: true
  },
  {
    id: 6,
    name: "Gâteau aux fraises",
    image: "https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg",
    price: 125.00,
    oldPrice: 145.00,
    rating: 4,
    deliveryTime: "30 à 40 minutes",
    inStock: true
  },
  {
    id: 7,
    name: "Gâteau crémeux",
    image: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg",
    price: 130.00,
    deliveryTime: "30 à 40 minutes",
    inStock: true
  },
];

// Restaurant data
const restaurants = [
  {
    id: 1,
    name: "Café Monarch",
    image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
    rating: 4.7,
    reviews: 128,
    cuisines: ["Français", "Café", "Desserts"],
    deliveryTime: "30-40 min",
    tag: "NOUVEAU",
  },
  {
    id: 2,
    name: "La Belle Assiette",
    image: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg",
    rating: 4.5,
    reviews: 89,
    cuisines: ["Français", "Européen", "Gastronomique"],
    deliveryTime: "35-45 min",
  },
  {
    id: 3,
    name: "Bistrot Parisien",
    image: "https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg",
    rating: 4.8,
    reviews: 156,
    cuisines: ["Français", "Bistrot", "Vin"],
    deliveryTime: "25-35 min",
    tag: "POPULAIRE",
  },
];

// Filter options
const filterOptions = [
  { id: 1, label: "Trier Par", hasDropdown: true },
  { id: 2, label: "Végétarien" },
  { id: 3, label: "Non-Végéta" },
  { id: 4, label: "Notes 4 +" },
  { id: 5, label: "Nouveautés" },
  { id: 6, label: "À Prix Réduit" },
  { id: 7, label: "Populaire" },
];

export const Categories = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<'aliments' | 'restaurants'>('aliments');
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

  const handleAddToCart = (item: typeof foodItems[0]) => {
    if (!item.inStock) return;
    
    addItem({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: 1
    });

    // Show confirmation
    setAddedToCart(item.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <div className="container px-4 md:px-6 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#333] mb-6">
          Trouvez les meilleurs restaurants et plats
        </h1>

        {/* Filter options */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filterOptions.map((filter) => (
            <Badge
              key={filter.id}
              variant="outline"
              className="py-2 px-4 rounded-full border border-gray-300 bg-white hover:bg-gray-50"
            >
              <span className="text-gray-700">{filter.label}</span>
              {filter.hasDropdown && (
                <span className="ml-2">▼</span>
              )}
            </Badge>
          ))}
          <Badge
            variant="outline"
            className="py-2 px-4 rounded-full border border-[#ff6600] text-[#ff6600]"
          >
            🔍 Filtre
          </Badge>
        </div>

        {/* Navigation tabs */}
        <div className="flex gap-8 mb-6 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('aliments')}
            className={`font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === 'aliments'
                ? 'text-[#ff6600] border-[#ff6600]'
                : 'text-gray-600 border-transparent'
            }`}
          >
            Aliments
          </button>
          <button 
            onClick={() => setActiveTab('restaurants')}
            className={`font-semibold pb-2 border-b-2 transition-colors ${
              activeTab === 'restaurants'
                ? 'text-[#ff6600] border-[#ff6600]'
                : 'text-gray-600 border-transparent'
            }`}
          >
            Restaurants
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'aliments' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {foodItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.rating && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-md flex items-center">
                      <span>{item.rating}</span>
                      <StarIcon className="h-4 w-4 ml-1" />
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    {item.oldPrice && (
                      <span className="text-gray-400 line-through">
                        {item.oldPrice.toFixed(2)} €
                      </span>
                    )}
                    <span className="text-[#ff6600] font-semibold">
                      {item.price.toFixed(2)} €
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">
                    {item.deliveryTime}
                  </p>
                  <Button
                    onClick={() => handleAddToCart(item)}
                    className={`w-full py-2 px-4 rounded-lg transition-all duration-200 ${
                      item.inStock
                        ? 'bg-[#ff6600] hover:bg-[#ff6600]/90 text-white'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    } ${addedToCart === item.id ? 'bg-green-500' : ''}`}
                    disabled={!item.inStock}
                  >
                    {addedToCart === item.id ? (
                      'Ajouté !'
                    ) : item.inStock ? (
                      'Ajouter au panier'
                    ) : (
                      'Rupture de stock'
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  {restaurant.tag && (
                    <Badge
                      className="absolute top-4 left-4 bg-[#ff6600] text-white border-none"
                    >
                      {restaurant.tag}
                    </Badge>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center bg-green-50 px-2 py-1 rounded">
                      <span className="text-green-700 font-medium mr-1">
                        {restaurant.rating}
                      </span>
                      <StarIcon className="h-4 w-4 text-green-700" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {restaurant.cuisines.join(" • ")}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{restaurant.deliveryTime}</span>
                    <span className="mx-2">•</span>
                    <span>{restaurant.reviews} avis</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};