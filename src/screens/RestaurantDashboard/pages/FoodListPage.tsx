import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { 
  Search, 
  Edit, 
  Trash2,
  Package,
  Filter,
  Download,
  ChevronDown
} from 'lucide-react';

interface FoodItem {
  id: number;
  name: string;
  category: string;
  restaurant: string;
  price: number;
  status: 'active' | 'inactive';
  image: string;
}

const foodItems: FoodItem[] = [
  {
    id: 1,
    name: 'Cappuccino',
    category: 'Spanish',
    restaurant: 'Mini Kebab',
    price: 250.00,
    status: 'active',
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'
  },
  {
    id: 2,
    name: 'Latte',
    category: 'Spanish',
    restaurant: 'Mini Kebab',
    price: 320.00,
    status: 'active',
    image: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg'
  },
  {
    id: 3,
    name: 'Creamy Cake',
    category: 'French',
    restaurant: 'Mini Kebab',
    price: 130.00,
    status: 'active',
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg'
  },
  {
    id: 4,
    name: 'Veggie Spring Rolls',
    category: 'Fast Food',
    restaurant: 'Tasty Takeaways',
    price: 13.00,
    status: 'active',
    image: 'https://images.pexels.com/photos/955137/pexels-photo-955137.jpeg'
  },
  {
    id: 5,
    name: 'Cheesy Sandwich',
    category: 'Fast Food',
    restaurant: 'Tasty Takeaways',
    price: 20.00,
    status: 'active',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg'
  },
  {
    id: 6,
    name: 'Ham sandwich',
    category: 'Fast Food',
    restaurant: 'Tasty Takeaways',
    price: 25.00,
    status: 'active',
    image: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg'
  }
];

export const FoodListPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredItems = foodItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(foodItems.map(item => item.category)));

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-800">Food List</h1>
          <Badge className="bg-gray-600 text-white border-none">
            {foodItems.length}
          </Badge>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Dropdown All categories */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48 h-10 rounded-lg border-2">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {/* Export button */}
          <Button 
            variant="outline" 
            className="h-10 px-4 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-lg border-2 focus:border-[#ff6600]"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-700 py-4 w-16">
                <div className="flex items-center gap-2">
                  <span>Sl</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <span>Name</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <span>Category</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <span>Restaurant</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <span>Price</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <span>Status</span>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4 text-center">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="py-4 font-medium text-gray-900">
                  {item.id}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-gray-700">{item.category}</span>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-gray-700">{item.restaurant}</span>
                </TableCell>
                <TableCell className="py-4">
                  <span className="font-medium text-gray-900">$ {item.price.toFixed(2)}</span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={item.status === 'active'}
                        readOnly
                        className="sr-only"
                      />
                      <div className={`w-12 h-6 rounded-full transition-colors ${
                        item.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                          item.status === 'active' ? 'translate-x-6' : 'translate-x-0.5'
                        } mt-0.5`}></div>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                      title="Modifier"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300"
                      title="Supprimer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun plat trouvé</h3>
          <p className="text-gray-600">Essayez de modifier vos filtres de recherche</p>
        </div>
      )}

      {/* Footer info */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <div>
          Affichage de {filteredItems.length} sur {foodItems.length} plats
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Actif ({foodItems.filter(item => item.status === 'active').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <span>Inactif ({foodItems.filter(item => item.status === 'inactive').length})</span>
          </div>
        </div>
      </div>
    </div>
  );
};