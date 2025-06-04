import { ChevronDownIcon, FilterIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

// Filter options data
const filterOptions = [
  { id: 1, label: "Sort by", hasIcon: true },
  { id: 2, label: "Pure Veg", hasIcon: false },
  { id: 3, label: "Rating 4.0+", hasIcon: false },
  { id: 4, label: "Fastest Delivery", hasIcon: false },
  { id: 5, label: "Offers", hasIcon: false },
  { id: 6, label: "Cuisines", hasIcon: true },
  { id: 7, label: "More", hasIcon: true },
];

// Banner images data
const bannerImages = [
  "/2021-08-21-611ff25c7385f-png.png",
  "/2021-08-21-612003b75c7f6-png.png",
  "/2021-08-21-612003fc6f492-png.png",
  "/2023-06-24-6496beb1ec393-png.png"
];

// Food category data with enhanced accessibility and routing info
const foodCategories = [
  { 
    id: 1, 
    name: "Cake", 
    image: "/2021-08-20-611fbecb2b870-png.png",
    slug: "cake",
    description: "Délicieux gâteaux et pâtisseries"
  },
  { 
    id: 2, 
    name: "Chinese", 
    image: "/2021-08-20-611fbf1b426e1-png.png",
    slug: "chinese",
    description: "Cuisine chinoise authentique"
  },
  {
    id: 3,
    name: "Coffee & Drinks",
    image: "/2021-08-20-611fbede98fba-png.png",
    slug: "coffee-drinks",
    description: "Boissons chaudes et froides"
  },
  { 
    id: 4, 
    name: "Fast Food", 
    image: "/2021-08-20-611fbf30f1a68-png.png",
    slug: "fast-food",
    description: "Restauration rapide"
  },
  { 
    id: 5, 
    name: "Indian", 
    image: "/2021-08-20-611fbf6a9a159-png.png",
    slug: "indian",
    description: "Spécialités indiennes"
  },
  { 
    id: 6, 
    name: "Kabab & More", 
    image: "/2021-08-20-611fbf491f625-png.png",
    slug: "kabab",
    description: "Kebabs et grillades"
  },
  { 
    id: 7, 
    name: "Mexican Food", 
    image: "/2021-08-20-611fbf96910eb-png.png",
    slug: "mexican",
    description: "Cuisine mexicaine"
  },
  { 
    id: 8, 
    name: "Noodles", 
    image: "/2021-08-20-611fbf779aef1-png.png",
    slug: "noodles",
    description: "Nouilles et pâtes asiatiques"
  }
];

export const MainContentSection = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<number | null>(null);

  const handleCategoryClick = async (category: typeof foodCategories[0]) => {
    setIsLoading(category.id);
    // Simulate loading state
    await new Promise(resolve => setTimeout(resolve, 300));
    navigate(`/categories?category=${category.slug}`);
    setIsLoading(null);
  };

  const handleKeyPress = (
    e: React.KeyboardEvent,
    category: typeof foodCategories[0]
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCategoryClick(category);
    }
  };

  return (
    <section className="w-full py-6">
      <div className="container px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold font-police-principale-titres-h2 text-premire-couleur mb-6">
          Find Best Restaurants and Foods
        </h2>

        {/* Filter options */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
          {filterOptions.map((filter) => (
            <Badge
              key={filter.id}
              variant="outline"
              className="py-2 md:py-2.5 px-3 md:px-5 rounded-2xl border border-[#ff6600] bg-transparent hover:bg-transparent text-sm md:text-base"
            >
              <span className="text-[#767e8f] font-police-courant-light">
                {filter.label}
              </span>
              {filter.hasIcon && (
                <ChevronDownIcon className="ml-2 h-3 w-3 text-[#767e8f]" />
              )}
            </Badge>
          ))}
          <Button
            variant="outline"
            className="rounded-lg border border-[#ff6600] py-2 md:py-2.5 px-3 md:px-5 flex items-center gap-2 text-sm md:text-base"
          >
            <FilterIcon className="h-3 w-3" />
            <span className="text-[#414141] font-police-courant-light">
              Filter
            </span>
            <ChevronDownIcon className="h-1.5 w-3 text-[#414141]" />
          </Button>
        </div>

        {/* Banner carousel */}
        <ScrollArea className="w-full mb-8">
          <div className="flex space-x-4">
            {bannerImages.slice(0, 4).map((image, index) => (
              <Card
                key={index}
                className="flex-shrink-0 w-[280px] md:w-[370px] rounded-2xl border-none overflow-hidden"
              >
                <CardContent className="p-0">
                  <div
                    className="h-[140px] md:h-[185px] rounded-2xl bg-cover bg-center"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {/* What's on your mind section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg md:text-xl font-bold text-[#121828] font-['Rubik',Helvetica]">
              What's on Your Mind?
            </h3>
            <Button
              variant="link"
              className="text-xs md:text-sm font-medium text-[#ff6600] p-0 h-auto"
              onClick={() => navigate('/categories')}
            >
              Explore More
            </Button>
          </div>

          {/* Food categories */}
          <ScrollArea className="w-full">
            <div className="flex space-x-4 md:space-x-6">
              {foodCategories.map((category) => (
                <div
                  key={category.id}
                  role="link"
                  tabIndex={0}
                  className={`
                    flex-shrink-0 w-[80px] md:w-[99px] text-center 
                    cursor-pointer transform transition-all duration-200
                    hover:scale-105 focus:scale-105 
                    hover:shadow-lg focus:shadow-lg
                    outline-none focus:ring-2 focus:ring-[#ff6600] focus:ring-opacity-50 
                    rounded-[32px]
                    ${isLoading === category.id ? 'opacity-70' : ''}
                  `}
                  onClick={() => handleCategoryClick(category)}
                  onKeyDown={(e) => handleKeyPress(e, category)}
                  aria-label={`Voir la catégorie ${category.name} - ${category.description}`}
                >
                  <div className="w-full text-center">
                    <div
                      className="w-[80px] h-[80px] md:w-[99px] md:h-[99px] 
                        rounded-[32px] bg-cover bg-center mx-auto mb-2
                        transition-transform duration-200"
                      style={{ backgroundImage: `url(${category.image})` }}
                      aria-hidden="true"
                    />
                    <span className="text-xs md:text-sm text-[#4b566b] font-['Rubik',Helvetica]">
                      {category.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
    </section>
  );
};