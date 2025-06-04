import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import { Edit, Trash2 } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  description: string;
  itemCount: number;
}

const categories: Category[] = [
  {
    id: 'CAT-001',
    name: 'Pizzas',
    description: 'Nos délicieuses pizzas cuites au feu de bois',
    itemCount: 8
  },
  {
    id: 'CAT-002',
    name: 'Burgers',
    description: 'Burgers artisanaux avec viande 100% bœuf',
    itemCount: 6
  },
  {
    id: 'CAT-003',
    name: 'Salades',
    description: 'Salades fraîches et healthy',
    itemCount: 4
  }
];

export const Categories = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Catégories</h1>
        <Button className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white">
          Ajouter une catégorie
        </Button>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Nombre de plats</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.itemCount}</TableCell>
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