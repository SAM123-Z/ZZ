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
  CheckCircle,
  Clock,
  DollarSign,
  User,
  Package,
  Calendar
} from 'lucide-react';

interface ConfirmedOrder {
  id: string;
  orderId: string;
  orderDate: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
  paymentStatus: 'Paid' | 'Unpaid';
  orderStatus: 'Pending';
  deliveryType: 'Delivery';
}

const confirmedOrders: ConfirmedOrder[] = [
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
  },
  {
    id: '8',
    orderId: '100143',
    orderDate: '05 Jun 2023\n03:08 PM',
    customerName: 'Gjhkkh Iqiqiy',
    customerPhone: '+8**********',
    totalAmount: 786.95,
    paymentStatus: 'Unpaid',
    orderStatus: 'Pending',
    deliveryType: 'Delivery'
  },
  {
    id: '9',
    orderId: '100142',
    orderDate: '04 Jun 2023\n02:15 PM',
    customerName: 'Ahmed Hassan',
    customerPhone: '+8**********',
    totalAmount: 945.30,
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    deliveryType: 'Delivery'
  },
  {
    id: '10',
    orderId: '100141',
    orderDate: '03 Jun 2023\n11:22 AM',
    customerName: 'Sarah Johnson',
    customerPhone: '+8**********',
    totalAmount: 1234.56,
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    deliveryType: 'Delivery'
  },
  {
    id: '11',
    orderId: '100140',
    orderDate: '02 Jun 2023\n09:45 AM',
    customerName: 'Mohamed Ali',
    customerPhone: '+8**********',
    totalAmount: 678.90,
    paymentStatus: 'Unpaid',
    orderStatus: 'Pending',
    deliveryType: 'Delivery'
  },
  {
    id: '12',
    orderId: '100139',
    orderDate: '01 Jun 2023\n04:30 PM',
    customerName: 'Lisa Chen',
    customerPhone: '+8**********',
    totalAmount: 892.45,
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    deliveryType: 'Delivery'
  },
  {
    id: '13',
    orderId: '100138',
    orderDate: '31 May 2023\n01:15 PM',
    customerName: 'David Wilson',
    customerPhone: '+8**********',
    totalAmount: 1567.80,
    paymentStatus: 'Unpaid',
    orderStatus: 'Pending',
    deliveryType: 'Delivery'
  },
  {
    id: '14',
    orderId: '100137',
    orderDate: '30 May 2023\n10:20 AM',
    customerName: 'Emma Brown',
    customerPhone: '+8**********',
    totalAmount: 743.25,
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    deliveryType: 'Delivery'
  },
  {
    id: '15',
    orderId: '100136',
    orderDate: '29 May 2023\n03:45 PM',
    customerName: 'James Miller',
    customerPhone: '+8**********',
    totalAmount: 1098.70,
    paymentStatus: 'Unpaid',
    orderStatus: 'Pending',
    deliveryType: 'Delivery'
  }
];

const getPaymentStatusColor = (status: ConfirmedOrder['paymentStatus']) => {
  return status === 'Paid' 
    ? 'bg-green-100 text-green-800 border-green-200' 
    : 'bg-red-100 text-red-800 border-red-200';
};

export const ConfirmedOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  const filteredOrders = confirmedOrders.filter(order => {
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
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Confirmed Orders</h1>
            <p className="text-sm text-gray-600">{filteredOrders.length} commandes confirmées</p>
          </div>
          <Badge className="bg-blue-600 text-white border-none ml-2">
            {confirmedOrders.length}
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
                      className="bg-blue-100 text-blue-800 border-blue-200 border text-xs font-medium flex items-center gap-1 w-fit"
                    >
                      <Clock className="w-3 h-3" />
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
          <CheckCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune commande confirmée trouvée</h3>
          <p className="text-gray-600">Essayez de modifier vos filtres de recherche</p>
        </div>
      )}

      {/* Footer info */}
      <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
        <div>
          Affichage de {filteredOrders.length} sur {confirmedOrders.length} commandes confirmées
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
            <span>Paid ({confirmedOrders.filter(o => o.paymentStatus === 'Paid').length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
            <span>Unpaid ({confirmedOrders.filter(o => o.paymentStatus === 'Unpaid').length})</span>
          </div>
        </div>
      </div>
    </div>
  );
};