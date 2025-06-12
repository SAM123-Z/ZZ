import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface OrderLocation {
  lat: number;
  lng: number;
  address: string;
  timestamp: Date;
}

export interface Order {
  id: string;
  orderId: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress: string;
  deliveryPersonId?: string;
  deliveryPersonName?: string;
  deliveryPersonPhone?: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: 'Paid' | 'Unpaid' | 'COD';
  orderStatus: 'Pending' | 'Confirmed' | 'Cooking' | 'Ready For Delivery' | 'Out For Delivery' | 'Delivered' | 'Cancelled';
  deliveryType: 'Delivery' | 'Pickup';
  orderDate: Date;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  deliveryLocation?: OrderLocation;
  statusHistory: {
    status: string;
    timestamp: Date;
    updatedBy: string;
    notes?: string;
  }[];
  priority: 'high' | 'medium' | 'low';
  distance?: string;
  estimatedTime?: string;
}

interface OrderTrackingContextType {
  orders: Order[];
  getOrderById: (orderId: string) => Order | undefined;
  updateOrderStatus: (orderId: string, newStatus: Order['orderStatus'], updatedBy: string, notes?: string) => void;
  assignDeliveryPerson: (orderId: string, deliveryPersonId: string, deliveryPersonName: string, deliveryPersonPhone: string) => void;
  updateDeliveryLocation: (orderId: string, location: OrderLocation) => void;
  getOrdersByStatus: (status: Order['orderStatus']) => Order[];
  getOrdersByDeliveryPerson: (deliveryPersonId: string) => Order[];
  getOrdersByRestaurant: (restaurantId: string) => Order[];
  getOrdersByCustomer: (customerId: string) => Order[];
  subscribeToOrderUpdates: (orderId: string, callback: (order: Order) => void) => () => void;
  createOrder: (orderData: Partial<Order>) => string;
  isLoading: boolean;
  error: string | null;
}

const OrderTrackingContext = createContext<OrderTrackingContextType | undefined>(undefined);

// Données simulées des commandes
const mockOrders: Order[] = [
  {
    id: '1',
    orderId: '100157',
    customerId: 'customer_1',
    customerName: 'Brooklyn Simmons',
    customerPhone: '+212 6XX XXX XXX',
    customerAddress: 'House: 00, Road: 00, Test City',
    restaurantId: 'restaurant_1',
    restaurantName: 'Hungry Puppets',
    restaurantAddress: 'Restaurant Location, Test City',
    deliveryPersonId: 'delivery_1',
    deliveryPersonName: 'Yacin Nicay',
    deliveryPersonPhone: '+212 6XX XXX XXX',
    items: [
      { id: 1, name: 'Pizza Margherita', quantity: 2, price: 15.99, image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg' },
      { id: 2, name: 'Coca Cola', quantity: 2, price: 2.50, image: 'https://images.pexels.com/photos/50593/coca-cola-cold-drink-soft-drink-coke-50593.jpeg' }
    ],
    totalAmount: 36.98,
    paymentStatus: 'Paid',
    orderStatus: 'Out For Delivery',
    deliveryType: 'Delivery',
    orderDate: new Date('2024-01-02T06:44:00'),
    estimatedDeliveryTime: new Date('2024-01-02T07:30:00'),
    deliveryLocation: {
      lat: 33.5731,
      lng: -7.5898,
      address: 'En route vers le client',
      timestamp: new Date()
    },
    statusHistory: [
      { status: 'Pending', timestamp: new Date('2024-01-02T06:44:00'), updatedBy: 'system' },
      { status: 'Confirmed', timestamp: new Date('2024-01-02T06:45:00'), updatedBy: 'restaurant_1' },
      { status: 'Cooking', timestamp: new Date('2024-01-02T06:50:00'), updatedBy: 'restaurant_1' },
      { status: 'Ready For Delivery', timestamp: new Date('2024-01-02T07:15:00'), updatedBy: 'restaurant_1' },
      { status: 'Out For Delivery', timestamp: new Date('2024-01-02T07:20:00'), updatedBy: 'delivery_1' }
    ],
    priority: 'high',
    distance: '2.3 km',
    estimatedTime: '15 min'
  },
  {
    id: '2',
    orderId: '100156',
    customerId: 'customer_2',
    customerName: 'John Doe',
    customerPhone: '+212 6XX XXX XXX',
    customerAddress: 'House: 00, Road: 00, Test City',
    restaurantId: 'restaurant_2',
    restaurantName: 'Pizza Palace',
    restaurantAddress: 'Restaurant Location, Test City',
    deliveryPersonId: 'delivery_2',
    deliveryPersonName: 'Ahmed Hassan',
    deliveryPersonPhone: '+212 6XX XXX XXX',
    items: [
      { id: 3, name: 'Burger Deluxe', quantity: 1, price: 12.99, image: 'https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg' },
      { id: 4, name: 'Frites', quantity: 1, price: 4.50, image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg' }
    ],
    totalAmount: 17.49,
    paymentStatus: 'COD',
    orderStatus: 'Cooking',
    deliveryType: 'Delivery',
    orderDate: new Date('2024-01-02T04:21:00'),
    estimatedDeliveryTime: new Date('2024-01-02T05:15:00'),
    statusHistory: [
      { status: 'Pending', timestamp: new Date('2024-01-02T04:21:00'), updatedBy: 'system' },
      { status: 'Confirmed', timestamp: new Date('2024-01-02T04:25:00'), updatedBy: 'restaurant_2' },
      { status: 'Cooking', timestamp: new Date('2024-01-02T04:30:00'), updatedBy: 'restaurant_2' }
    ],
    priority: 'medium',
    distance: '1.8 km',
    estimatedTime: '25 min'
  },
  {
    id: '3',
    orderId: '100155',
    customerId: 'customer_3',
    customerName: 'Sarah Johnson',
    customerPhone: '+212 6XX XXX XXX',
    customerAddress: 'House: 00, Road: 00, Test City',
    restaurantId: 'restaurant_1',
    restaurantName: 'Hungry Puppets',
    restaurantAddress: 'Restaurant Location, Test City',
    items: [
      { id: 5, name: 'Salade César', quantity: 1, price: 8.99, image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg' }
    ],
    totalAmount: 8.99,
    paymentStatus: 'Paid',
    orderStatus: 'Pending',
    deliveryType: 'Delivery',
    orderDate: new Date('2024-01-02T04:08:00'),
    statusHistory: [
      { status: 'Pending', timestamp: new Date('2024-01-02T04:08:00'), updatedBy: 'system' }
    ],
    priority: 'low',
    distance: '3.1 km',
    estimatedTime: '30 min'
  }
];

export function OrderTrackingProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [subscribers, setSubscribers] = useState<Map<string, ((order: Order) => void)[]>>(new Map());

  // Simuler les mises à jour en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      // Simuler des mises à jour aléatoires de localisation pour les commandes en livraison
      setOrders(prevOrders => 
        prevOrders.map(order => {
          if (order.orderStatus === 'Out For Delivery' && order.deliveryLocation) {
            // Simuler un mouvement de localisation
            const newLat = order.deliveryLocation.lat + (Math.random() - 0.5) * 0.001;
            const newLng = order.deliveryLocation.lng + (Math.random() - 0.5) * 0.001;
            
            const updatedOrder = {
              ...order,
              deliveryLocation: {
                ...order.deliveryLocation,
                lat: newLat,
                lng: newLng,
                timestamp: new Date()
              }
            };

            // Notifier les abonnés
            const orderSubscribers = subscribers.get(order.orderId) || [];
            orderSubscribers.forEach(callback => callback(updatedOrder));

            return updatedOrder;
          }
          return order;
        })
      );
    }, 5000); // Mise à jour toutes les 5 secondes

    return () => clearInterval(interval);
  }, [subscribers]);

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.orderId === orderId);
  };

  const updateOrderStatus = (
    orderId: string, 
    newStatus: Order['orderStatus'], 
    updatedBy: string, 
    notes?: string
  ) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.orderId === orderId) {
          const updatedOrder = {
            ...order,
            orderStatus: newStatus,
            statusHistory: [
              ...order.statusHistory,
              {
                status: newStatus,
                timestamp: new Date(),
                updatedBy,
                notes
              }
            ]
          };

          // Notifier les abonnés
          const orderSubscribers = subscribers.get(orderId) || [];
          orderSubscribers.forEach(callback => callback(updatedOrder));

          return updatedOrder;
        }
        return order;
      })
    );
  };

  const assignDeliveryPerson = (
    orderId: string, 
    deliveryPersonId: string, 
    deliveryPersonName: string, 
    deliveryPersonPhone: string
  ) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.orderId === orderId) {
          const updatedOrder = {
            ...order,
            deliveryPersonId,
            deliveryPersonName,
            deliveryPersonPhone,
            statusHistory: [
              ...order.statusHistory,
              {
                status: 'Assigned to delivery person',
                timestamp: new Date(),
                updatedBy: 'system',
                notes: `Assigned to ${deliveryPersonName}`
              }
            ]
          };

          // Notifier les abonnés
          const orderSubscribers = subscribers.get(orderId) || [];
          orderSubscribers.forEach(callback => callback(updatedOrder));

          return updatedOrder;
        }
        return order;
      })
    );
  };

  const updateDeliveryLocation = (orderId: string, location: OrderLocation) => {
    setOrders(prevOrders => 
      prevOrders.map(order => {
        if (order.orderId === orderId) {
          const updatedOrder = {
            ...order,
            deliveryLocation: location
          };

          // Notifier les abonnés
          const orderSubscribers = subscribers.get(orderId) || [];
          orderSubscribers.forEach(callback => callback(updatedOrder));

          return updatedOrder;
        }
        return order;
      })
    );
  };

  const getOrdersByStatus = (status: Order['orderStatus']): Order[] => {
    return orders.filter(order => order.orderStatus === status);
  };

  const getOrdersByDeliveryPerson = (deliveryPersonId: string): Order[] => {
    return orders.filter(order => order.deliveryPersonId === deliveryPersonId);
  };

  const getOrdersByRestaurant = (restaurantId: string): Order[] => {
    return orders.filter(order => order.restaurantId === restaurantId);
  };

  const getOrdersByCustomer = (customerId: string): Order[] => {
    return orders.filter(order => order.customerId === customerId);
  };

  const subscribeToOrderUpdates = (orderId: string, callback: (order: Order) => void): (() => void) => {
    setSubscribers(prev => {
      const newSubscribers = new Map(prev);
      const orderSubscribers = newSubscribers.get(orderId) || [];
      newSubscribers.set(orderId, [...orderSubscribers, callback]);
      return newSubscribers;
    });

    // Retourner une fonction de désabonnement
    return () => {
      setSubscribers(prev => {
        const newSubscribers = new Map(prev);
        const orderSubscribers = newSubscribers.get(orderId) || [];
        const filteredSubscribers = orderSubscribers.filter(cb => cb !== callback);
        
        if (filteredSubscribers.length === 0) {
          newSubscribers.delete(orderId);
        } else {
          newSubscribers.set(orderId, filteredSubscribers);
        }
        
        return newSubscribers;
      });
    };
  };

  const createOrder = (orderData: Partial<Order>): string => {
    const newOrderId = `100${Date.now().toString().slice(-3)}`;
    const newOrder: Order = {
      id: Date.now().toString(),
      orderId: newOrderId,
      customerId: orderData.customerId || 'unknown',
      customerName: orderData.customerName || 'Unknown Customer',
      customerPhone: orderData.customerPhone || '',
      customerAddress: orderData.customerAddress || '',
      restaurantId: orderData.restaurantId || 'unknown',
      restaurantName: orderData.restaurantName || 'Unknown Restaurant',
      restaurantAddress: orderData.restaurantAddress || '',
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      paymentStatus: orderData.paymentStatus || 'Unpaid',
      orderStatus: 'Pending',
      deliveryType: orderData.deliveryType || 'Delivery',
      orderDate: new Date(),
      statusHistory: [
        {
          status: 'Pending',
          timestamp: new Date(),
          updatedBy: 'system',
          notes: 'Order created'
        }
      ],
      priority: orderData.priority || 'medium'
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    return newOrderId;
  };

  return (
    <OrderTrackingContext.Provider
      value={{
        orders,
        getOrderById,
        updateOrderStatus,
        assignDeliveryPerson,
        updateDeliveryLocation,
        getOrdersByStatus,
        getOrdersByDeliveryPerson,
        getOrdersByRestaurant,
        getOrdersByCustomer,
        subscribeToOrderUpdates,
        createOrder,
        isLoading,
        error,
      }}
    >
      {children}
    </OrderTrackingContext.Provider>
  );
}

export function useOrderTracking() {
  const context = useContext(OrderTrackingContext);
  if (context === undefined) {
    throw new Error('useOrderTracking must be used within an OrderTrackingProvider');
  }
  return context;
}