import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/table';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { RealTimeOrderTracker } from '../../../components/ui/real-time-order-tracker';
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
  Truck,
  ExternalLink
} from 'lucide-react';
import { useOrderTracking } from '../../../context/OrderTrackingContext';

export const OrdersList = () => {
  const { orders, updateOrderStatus } = useOrderTracking();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.orderStatus === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusColor = (status: string) => {
    const colors = {
      'Delivered': 'bg-green-100 text-green-800 border-green-200',
      'Out For Delivery': 'bg-orange-100 text-orange-800 border-orange-200',
      'Pending': 'bg-blue-100 text-blue-800 border-blue-200',
      'Confirmed': 'bg-blue-100 text-blue-800 border-blue-200',
      'Cooking': 'bg-purple-100 text-purple-800 border-purple-200',
      'Ready For Delivery': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Cancelled': 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getPaymentStatusColor = (status: string) => {
    return status === 'Paid' 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : status === 'COD'
      ? 'bg-orange-100 text-orange-800 border-orange-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      'Delivered': <CheckCircle className="w-4 h-4" />,
      'Out For Delivery': <Truck className="w-4 h-4" />,
      'Pending': <Clock className="w-4 h-4" />,
      'Confirmed': <CheckCircle className="w-4 h-4" />,
      'Cooking': <Package className="w-4 h-4" />,
      'Ready For Delivery': <AlertCircle className="w-4 h-4" />,
      'Cancelled': <XCircle className="w-4 h-4" />
    };
    return icons[status as keyof typeof icons] || <Clock className="w-4 h-4" />;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleQuickStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any, 'restaurant_1', `Status updated to ${newStatus}`);
  };

  const openOrderTracking = (orderId: string) => {
    const url = `/order-tracking/${orderId}?userType=restaurant&userId=restaurant_1`;
    window.open(url, '_blank');
  };

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
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Cooking">Cooking</SelectItem>
              <SelectItem value="Ready For Delivery">Ready For Delivery</SelectItem>
              <SelectItem value="Out For Delivery">Out For Delivery</SelectItem>
              <SelectItem value="Delivered">Delivered</SelectItem>
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
              <SelectItem value="COD">COD</SelectItem>
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
            {filteredOrders.map((order, index) => (
              <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
                <TableCell className="py-4 font-medium text-gray-900">
                  {index + 1}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{order.orderId}</span>
                    {order.deliveryLocation && order.orderStatus === 'Out For Delivery' && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" title="Suivi en temps réel actif"></div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="text-sm">
                    <div className="font-medium text-gray-900">{formatDate(order.orderDate)}</div>
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
                    <div className="font-bold text-gray-900">$ {order.totalAmount.toFixed(2)}</div>
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
                      className={`${getStatusColor(order.orderStatus)} border text-xs font-medium flex items-center gap-1 w-fit cursor-pointer`}
                      onClick={() => setSelectedOrderId(selectedOrderId === order.orderId ? null : order.orderId)}
                    >
                      {getStatusIcon(order.orderStatus)}
                      {order.orderStatus}
                    </Badge>
                    <div className="text-xs text-gray-600">{order.deliveryType}</div>
                    
                    {/* Actions rapides de changement de statut */}
                    {order.orderStatus === 'Pending' && (
                      <div className="flex gap-1">
                        <Button 
                          size="sm"
                          onClick={() => handleQuickStatusUpdate(order.orderId, 'Confirmed')}
                          className="h-6 px-2 text-xs bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Confirmer
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleQuickStatusUpdate(order.orderId, 'Cancelled')}
                          className="h-6 px-2 text-xs bg-red-600 hover:bg-red-700 text-white"
                        >
                          Annuler
                        </Button>
                      </div>
                    )}
                    
                    {order.orderStatus === 'Confirmed' && (
                      <Button 
                        size="sm"
                        onClick={() => handleQuickStatusUpdate(order.orderId, 'Cooking')}
                        className="h-6 px-2 text-xs bg-purple-600 hover:bg-purple-700 text-white"
                      >
                        Commencer préparation
                      </Button>
                    )}
                    
                    {order.orderStatus === 'Cooking' && (
                      <Button 
                        size="sm"
                        onClick={() => handleQuickStatusUpdate(order.orderId, 'Ready For Delivery')}
                        className="h-6 px-2 text-xs bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        Prêt pour livraison
                      </Button>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300"
                      title="Voir les détails"
                      onClick={() => setSelectedOrderId(selectedOrderId === order.orderId ? null : order.orderId)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                      title="Suivi en temps réel"
                      onClick={() => openOrderTracking(order.orderId)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="h-8 w-8 border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300"
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

      {/* Tracker en temps réel pour la commande sélectionnée */}
      {selectedOrderId && (
        <div className="mt-8 border-t pt-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Suivi en temps réel - Commande #{selectedOrderId}</h3>
            <Button 
              variant="outline"
              onClick={() => setSelectedOrderId(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              Fermer
            </Button>
          </div>
          <RealTimeOrderTracker
            orderId={selectedOrderId}
            userType="restaurant"
            userId="restaurant_1"
          />
        </div>
      )}

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
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Suivi temps réel ({orders.filter(o => o.deliveryLocation && o.orderStatus === 'Out For Delivery').length})</span>
          </div>
        </div>
      </div>
    </div>
  );
};