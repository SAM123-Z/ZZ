import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';

interface Order {
  id: string;
  customer: string;
  items: string[];
  total: number;
  status: 'pending' | 'cooking' | 'ready' | 'delivered' | 'cancelled';
  date: string;
}

const orders: Order[] = [
  {
    id: '#ORD-001',
    customer: 'John Doe',
    items: ['Pizza Margherita', 'Coca Cola'],
    total: 25.99,
    status: 'pending',
    date: '2024-02-20 14:30'
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    items: ['Burger Deluxe', 'Frites', 'Sprite'],
    total: 32.50,
    status: 'cooking',
    date: '2024-02-20 14:15'
  },
  {
    id: '#ORD-003',
    customer: 'Mike Johnson',
    items: ['Salade César', 'Eau minérale'],
    total: 18.75,
    status: 'delivered',
    date: '2024-02-20 13:45'
  }
];

const getStatusColor = (status: Order['status']) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800',
    cooking: 'bg-blue-100 text-blue-800',
    ready: 'bg-green-100 text-green-800',
    delivered: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return colors[status];
};

const getStatusText = (status: Order['status']) => {
  const texts = {
    pending: 'En attente',
    cooking: 'En préparation',
    ready: 'Prêt',
    delivered: 'Livré',
    cancelled: 'Annulé'
  };
  return texts[status];
};

export const OrdersList = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-6">Liste des commandes</h1>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Articles</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.items.join(', ')}</TableCell>
                <TableCell>{order.total.toFixed(2)}€</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};