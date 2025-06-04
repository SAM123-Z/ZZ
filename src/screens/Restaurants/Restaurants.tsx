import React from "react";
import { SearchIcon, StarIcon } from "lucide-react";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";

// Restaurant data
const restaurants = [
  {
    id: 1,
    name: "Café Monarch",
    image: "/2021-08-21-612003b75c7f6-png.png",
    rating: 4.7,
    reviews: 5,
    cuisines: ["Bengali", "Indian", "Pizza", "Pasta", "Snacks"],
    deliveryTime: "30-40 min",
    tag: "NEW",
  },
  {
    id: 2,
    name: "Hungry Puppets",
    image: "/2021-08-21-612003fc6f492-png.png",
    rating: 4.7,
    reviews: 5,
    cuisines: ["Bengali", "Indian", "Pizza", "Pasta", "Snacks"],
    deliveryTime: "30-40 min",
  },
  {
    id: 3,
    name: "Pizza restaurant",
    image: "/2023-06-24-6496beb1ec393-png.png",
    rating: 4.7,
    reviews: 5,
    cuisines: ["Bengali", "Indian", "Pizza", "Pasta", "Snacks"],
    deliveryTime: "30-40 min",
    tag: "POPULAR",
  },
  {
    id: 4,
    name: "Italian Fast Food",
    image: "/2021-08-20-611fd481acaf1-png.png",
    rating: 4.7,
    reviews: 5,
    cuisines: ["Bengali", "Indian", "Pizza", "Pasta", "Snacks"],
    deliveryTime: "30-40 min",
  },
  {
    id: 5,
    name: "Mini Kebab",
    image: "/2021-08-21-611ff25c7385f-png.png",
    rating: 4.7,
    reviews: 5,
    cuisines: ["Bengali", "Indian", "Pizza", "Pasta", "Snacks"],
    deliveryTime: "30-40 min",
    tag: "50% OFF",
  },
  {
    id: 6,
    name: "The Capital Grill",
    image: "/2021-08-21-612003b75c7f6-png-1.png",
    rating: 4.7,
    reviews: 5,
    cuisines: ["Bengali", "Indian", "Pizza", "Pasta", "Snacks"],
    deliveryTime: "30-40 min",
  },
  {
    id: 7,
    name: "Vintage Kitchen",
    image: "/2021-08-21-612003fc6f492-png-1.png",
    rating: 4.7,
    reviews: 5,
    cuisines: ["Bengali", "Indian", "Pizza", "Pasta", "Snacks"],
    deliveryTime: "30-40 min",
    tag: "50% OFF",
  },
  {
    id: 8,
    name: "Tasty Takeaways",
    image: "/2023-06-24-6496beb1ec393-png-1.png",
    rating: 4.7,
    reviews: 5,
    cuisines: ["Bengali", "Indian", "Pizza", "Pasta", "Snacks"],
    deliveryTime: "30-40 min",
  },
  {
    id: 9,
    name: "The Great Impasta",
    image: "/2021-08-20-611fd481acaf1-png-1.png",
    rating: 4.7,
    reviews: 5,
    cuisines: ["Bengali", "Indian", "Pizza", "Pasta", "Snacks"],
    deliveryTime: "30-40 min",
    tag: "50% OFF",
  },
  {
    id: 10,
    name: "Cheesy Restaurant",
    image: "/2021-08-21-611ff25c7385f-png-1.png",
    rating: 4.7,
    reviews: 5,
    cuisines: ["Bengali", "Indian", "Pizza", "Pasta", "Snacks"],
    deliveryTime: "30-40 min",
    status: "CLOSED NOW",
  },
  {
    id: 11,
    name: "Cheese Burger",
    image: "/2021-08-21-612003b75c7f6-png.png",
    rating: 4.7,
    reviews: 5,
    cuisines: ["Bengali", "Indian", "Pizza", "Pasta", "Snacks"],
    deliveryTime: "30-40 min",
    status: "CLOSED NOW",
  },
  {
    id: 12,
    name: "Redcliff Cafe",
    image: "/2021-08-21-612003fc6f492-png.png",
    rating: 4.7,
    reviews: 5,
    cuisines: ["Bengali", "Indian", "Pizza", "Pasta", "Snacks"],
    deliveryTime: "30-40 min",
  },
];

export const Restaurants = (): JSX.Element => {
  return (
    <div className="min-h-screen bg-[#f2f2f2]">
      <div className="container px-4 md:px-6 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-premire-couleur mb-6">
          Choose Food from your Favourite Restaurants
        </h1>

        {/* Search bar */}
        <div className="relative mb-8">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            className="w-full md:w-[400px] pl-10 py-2 rounded-lg border border-gray-200"
            placeholder="Search restaurants..."
          />
        </div>

        {/* Restaurants grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                {restaurant.tag && (
                  <Badge
                    className="absolute top-4 left-4 bg-premire-couleur text-white border-none"
                    variant="outline"
                  >
                    {restaurant.tag}
                  </Badge>
                )}
                {restaurant.status && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-lg font-bold">
                      {restaurant.status}
                    </span>
                  </div>
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
                  <span>{restaurant.reviews} reviews</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};