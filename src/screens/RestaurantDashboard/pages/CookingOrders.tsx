import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { 
  Search, 
  Eye, 
  FileText, 
  ChefHat,
  Clock,
  DollarSign,
  User,
  Package,
  Calendar
} from 'lucide-react';

interface CookingOrder {
  id: string;
  orderId: string;
  orderDate: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  paymentStatus: 'Paid' | 'Unpaid';
  orderStatus: 'Cooking';
  deliveryType: 'Delivery';
}

const cookingOrders: CookingOrder[] = [
  {
    id: '5',
    orderId: '100148',
    orderDate: '11 Jun 2023\n03:24 PM',
    customerName: 'Jdjjdj Dhhdhd',
    customerPhone: '+8**********',
    totalAmount: 129.75,
    paymentStatus: 'Unpaid',
    orderStatus: 'Cooking',
    deliveryType: 'Delivery'
  },
  {
    id: '6',
    orderId: '100147',
    orderDate: '11 Jun 2023\n03:22 PM',
    customerName: 'Munam ShahariEr Test',
    customerPhone: '+8**********',
    totalAmount: 3327.56,
    paymentStatus: 'Unpaid',
    orderStatus: 'Cooking',
    deliveryType: 'Delivery'
  },
  {
    id: '7',
    orderId: '100145',
    orderDate: '06 Jun 2023\n12:49 PM',
    customerName: 'Munam ShahariEr Test',
    customerPhone: '+8**********',
    totalAmount: 1521.92,
    paymentStatus: 'Unpaid',
    orderStatus: 'Cooking',
    deliveryType: 'Delivery'
  },
  {
    id: '26',
    orderId: '100119',
    orderDate: '21 May 2023\n08:45 AM',
    customerName: 'Jennifer Wilson',
    customerPhone: '+8**********',
    totalAmount: 934.67,
    paymentStatus: 'Paid',
    orderStatus: 'Cooking',
    deliveryType: 'Delivery'
  },
  {
    id: '27',
    orderId: '100118',
    orderDate: '20 May 2023\n07:30 AM',
    customerName: 'Carlos Rodriguez',
    customerPhone: '+8**********',
    totalAmount: 1456.78,
    paymentStatus: 'Unpaid',
    orderStatus: 'Cooking',
    deliveryType: 'Delivery'
  },
  {
    id: '28',
    orderId: '100117',
    orderDate: '19 May 2023\n06:15 PM',
    customerName: 'Amanda Taylor',
    customerPhone: '+8**********',
    totalAmount: 823.45,
    paymentStatus: 'Paid',
    orderStatus: 'Cooking',
    deliveryType: 'Delivery'
  },
  {
    id: '29',
    orderId: '100116',
    orderDate: '18 May 2023\n05:00 PM',
    customerName: 'Daniel Martinez',
    customerPhone: '+8**********',
    totalAmount: 1167.89,
    paymentStatus: 'Unpaid',
    orderStatus: 'Cooking',
    deliveryType: 'Delivery'
  }
];

const getPaymentStatusColor = (status: CookingOrder['paymentStatus']) => {
  return status === 'Paid' 
    ? 'bg-green-100 text-green-800 border-green-200' 
    : 'bg-red-100 text-red-800 border-red-200';
};

export const CookingOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  const filteredOrders = cookingOrders.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesPayment;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Cooking Orders</h1>
            <p className="text-sm text-gray-600">{filteredOrders.length} commandes en préparation</p>
          </div>
          <Badge className="bg-purple-600 text-white border-none ml-2">
            {cookingOrders.length}
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Ex : Search by Order Id"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 rounded-lg border-2 focus:border-[#ff6600]"
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-48 h-12 rounded-lg border-2">
              <SelectValue placeholder="Filtrer par paiement" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les paiements</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
              <SelectItem value="Unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <span>Sl</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span>Order ID</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Order Date</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Customer Information</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  <span>Total Amount</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Order Status</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-gray-700 py-4 text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="py-4 font-medium text-gray-900">
                  {order.id}
                </TableCell>
                <TableCell className="py-4">
                  <span className="font-medium text-gray-900">{order.orderId}</span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="text-sm">
                    {order.orderDate.split('\n').map((line, index) => (
                      <div key={index} className={index === 0 ? 'font-medium text-gray-900' : 'text-gray-600'}>
                        {line}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="space-y-1">
                    <div className="font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-sm text-gray-600">{order.customerPhone}</div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="space-y-1">
                    <div className="font-bold text-gray-900">$ {order.totalAmount.toLocaleString()}</div>
                    <Badge 
                      className={`${getPaymentStatusColor(order.paymentStatus)} border text-xs font-medium`}
                    >
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="space-y-2">
                    <Badge 
                      className="bg-green-100 text-green-800 border-green-200 border text-xs font-medium flex items-center gap-1 w-fit"
                    >
                      <ChefHat className="w-3 h-3" />
                      {order.orderStatus}
                    </Badge>
                    <div className="text-xs text-gray-600">{order.deliveryType}</div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300"
                      title="Voir les détails"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                      title="Générer facture"
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <Button variant="outline" size="icon" className="h-8 w-8">
          <span className="text-gray-400">‹</span>
        </Button>
        <Button className="h-8 w-8 bg-blue-600 text-white">
          1
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          2
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          3
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <span className="text-gray-400">›</span>
        </Button>
      </div>

      {/* Empty state */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ChefHat className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande en préparation trouvée</h3>
          <p className="text-gray-600">Essayez de modifier vos filtres de recherche</p>
        </div>
      )}

      {/* Footer info */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <div>
          Affichage de {filteredOrders.length} sur {cookingOrders.length} commandes en préparation
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
            <span>Paid ({cookingOrders.filter(o => o.paymentStatus === 'Paid').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
            <span>Unpaid ({cookingOrders.filter(o => o.paymentStatus === 'Unpaid').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
            <span>En préparation ({cookingOrders.length})</span>
          </div>
        </div>
      </div>
    </div>
  );
};