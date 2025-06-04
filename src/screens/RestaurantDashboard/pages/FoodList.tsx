import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface Food {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'in_stock' | 'out_of_stock';
  image: string;
}

const foods: Food[] = [
  {
    id: 'FOOD-001',
    name: 'Pizza Margherita',
    category: 'Pizzas',
    price: 12.99,
    status: 'in_stock',
    image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg'
  },
  {
    id: 'FOOD-002',
    name: 'Burger Classic',
    category: 'Burgers',
    price: 9.99,
    status: 'in_stock',
    image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg'
  },
  {
    id: 'FOOD-003',
    name: 'Salade César',
    category: 'Salades',
    price: 8.50,
    status: 'out_of_stock',
    image: 'https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg'
  }
];

export const FoodList = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Liste des plats</h1>
        <Button className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white">
          Ajouter un plat
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {foods.map((food) => (
              <TableRow key={food.id}>
                <TableCell>
                  <img 
                    src={food.image} 
                    alt={food.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium">{food.name}</TableCell>
                <TableCell>{food.category}</TableCell>
                <TableCell>{food.price.toFixed(2)}€</TableCell>
                <TableCell>
                  <Badge
                    className={
                      food.status === 'in_stock'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }
                  >
                    {food.status === 'in_stock' ? 'En stock' : 'Rupture de stock'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};