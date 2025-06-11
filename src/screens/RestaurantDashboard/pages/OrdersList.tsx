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
  Filter,
  Calendar,
  DollarSign,
  User,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Truck
} from 'lucide-react';

interface Order {
  id: string;
  orderId: string;
  orderDate: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  paymentStatus: 'Paid' | 'Unpaid';
  orderStatus: 'Delivered' | 'Out For Delivery' | 'Pending' | 'Cooking' | 'Ready For Delivery' | 'Cancelled';
  deliveryType: 'Delivery' | 'Pickup';
}

const orders: Order[] = [
  {
    id: '1',
    orderId: '100157',
    orderDate: '02 Jan 2024\n06:44 AM',
    customerName: 'Brooklyn Simmons',
    customerPhone: '+8**********',
    totalAmount: 2399.99,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    deliveryType: 'Delivery'
  },
  {
    id: '2',
    orderId: '100156',
    orderDate: '21 Nov 2023\n04:21 PM',
    customerName: 'John Doe',
    customerPhone: '+8**********',
    totalAmount: 6316.64,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    deliveryType: 'Delivery'
  },
  {
    id: '3',
    orderId: '100155',
    orderDate: '21 Nov 2023\n04:08 PM',
    customerName: 'John Doe',
    customerPhone: '+8**********',
    totalAmount: 2827.14,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    deliveryType: 'Delivery'
  },
  {
    id: '4',
    orderId: '100154',
    orderDate: '21 Nov 2023\n04:04 PM',
    customerName: 'John Doe',
    customerPhone: '+8**********',
    totalAmount: 2827.14,
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    deliveryType: 'Delivery'
  },
  {
    id: '5',
    orderId: '100148',
    orderDate: '11 Jun 2023\n03:24 PM',
    customerName: 'Jdjjdj Dhhdhd',
    customerPhone: '+8**********',
    totalAmount: 129.75,
    paymentStatus: 'Unpaid',
    orderStatus: 'Out For Delivery',
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
    orderStatus: 'Pending',
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
    orderStatus: 'Pending',
    deliveryType: 'Delivery'
  }
];

const getStatusColor = (status: Order['orderStatus']) => {
  const colors = {
    'Delivered': 'bg-green-100 text-green-800 border-green-200',
    'Out For Delivery': 'bg-orange-100 text-orange-800 border-orange-200',
    'Pending': 'bg-blue-100 text-blue-800 border-blue-200',
    'Cooking': 'bg-purple-100 text-purple-800 border-purple-200',
    'Ready For Delivery': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Cancelled': 'bg-red-100 text-red-800 border-red-200'
  };
  return colors[status];
};

const getPaymentStatusColor = (status: Order['paymentStatus']) => {
  return status === 'Paid' 
    ? 'bg-green-100 text-green-800 border-green-200' 
    : 'bg-red-100 text-red-800 border-red-200';
};

const getStatusIcon = (status: Order['orderStatus']) => {
  const icons = {
    'Delivered': <CheckCircle className="w-4 h-4" />,
    'Out For Delivery': <Truck className="w-4 h-4" />,
    'Pending': <Clock className="w-4 h-4" />,
    'Cooking': <Package className="w-4 h-4" />,
    'Ready For Delivery': <AlertCircle className="w-4 h-4" />,
    'Cancelled': <XCircle className="w-4 h-4" />
  };
  return icons[status];
};

export const OrdersList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#ff6600] rounded-full flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">All Orders</h1>
            <p className="text-sm text-gray-600">{filteredOrders.length} commandes trouvées</p>
          </div>
          <Badge className="bg-[#ff6600] text-white border-none ml-2">
            {orders.length}
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
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48 h-12 rounded-lg border-2">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="Out For Delivery">Out For Delivery</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Cooking">Cooking</SelectItem>
              <SelectItem value="Ready For Delivery">Ready For Delivery</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

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
                      className={`${getStatusColor(order.orderStatus)} border text-xs font-medium flex items-center gap-1 w-fit`}
                    >
                      {getStatusIcon(order.orderStatus)}
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

      {/* Empty state */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande trouvée</h3>
          <p className="text-gray-600">Essayez de modifier vos filtres de recherche</p>
        </div>
      )}

      {/* Footer info */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <div>
          Affichage de {filteredOrders.length} sur {orders.length} commandes
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
            <span>Delivered ({orders.filter(o => o.orderStatus === 'Delivered').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
            <span>Pending ({orders.filter(o => o.orderStatus === 'Pending').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-100 border border-orange-200 rounded"></div>
            <span>Out For Delivery ({orders.filter(o => o.orderStatus === 'Out For Delivery').length})</span>
          </div>
        </div>
      </div>
    </div>
  );
};