import React from 'react';
import { Button } from '../../../components/ui/button';
import { 
  Package, 
  Users, 
  TrendingUp, 
  Settings,
  Star,
  ShoppingBag
} from 'lucide-react';
import Chart from 'react-apexcharts';
import { cn } from '../../../lib/utils';

interface StatCardProps {
  label: string;
  value: number;
  bgColor?: string;
  icon?: React.ReactNode;
}

const StatCard = ({ label, value, bgColor = 'bg-white', icon }: StatCardProps) => (
  <div className={`${bgColor} p-4 rounded-lg shadow-sm`}>
    <div className="flex items-center justify-between">
      <span className="text-gray-600 text-sm">{label}</span>
      {icon && <div className="bg-white rounded-full p-1 shadow-sm">{icon}</div>}
    </div>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

export const DashboardOverview = () => {
  const chartOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      title: {
        text: '$ (Currency Symbol)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return "$ " + val
        }
      }
    },
    colors: ['#4318FF', '#6AD2FF']
  };

  const chartSeries = [
    {
      name: 'Commission given',
      data: [182, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Total earning',
      data: [1634, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ];

  const recentOrders = [
    { id: '#ORD-123', customer: 'John Doe', total: 45.90, status: 'pending' },
    { id: '#ORD-124', customer: 'Jane Smith', total: 32.50, status: 'cooking' },
    { id: '#ORD-125', customer: 'Mike Brown', total: 78.20, status: 'delivered' },
  ];

  const topSellingFoods = [
    {
      id: 1,
      name: "Medu Vada",
      image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
      soldCount: 9,
      inStock: true
    },
    {
      id: 2,
      name: "Meat Pizza",
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg",
      soldCount: 5,
      inStock: false
    },
    {
      id: 3,
      name: "Chicken Shawarma",
      image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
      soldCount: 2,
      inStock: true
    }
  ];

  const topRatedFoods = [
    {
      id: 4,
      name: "Meat Pizza",
      image: "https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg",
      rating: 4.5,
      reviews: 3,
      inStock: true
    },
    {
      id: 5,
      name: "Masala Poori",
      image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
      rating: 0,
      reviews: 0,
      inStock: false
    },
    {
      id: 6,
      name: "Idli",
      image: "https://images.pexels.com/photos/941869/pexels-photo-941869.jpeg",
      rating: 0,
      reviews: 0,
      inStock: true
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white h-auto py-4"
          >
            <Package className="h-5 w-5 mr-2" />
            Update Menu
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white h-auto py-4">
            <Users className="h-5 w-5 mr-2" />
            View Orders
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-4">
            <TrendingUp className="h-5 w-5 mr-2" />
            Sales Report
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white h-auto py-4">
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Today's Revenue"
            value={1634}
            bgColor="bg-green-100"
            icon={<TrendingUp className="h-4 w-4 text-green-600" />}
          />
          <StatCard
            label="Active Orders"
            value={2}
            bgColor="bg-blue-100"
            icon={<ShoppingBag className="h-4 w-4 text-blue-600" />}
          />
          <StatCard
            label="Total Customers"
            value={156}
            bgColor="bg-purple-100"
            icon={<Users className="h-4 w-4 text-purple-600" />}
          />
          <StatCard
            label="Menu Items"
            value={42}
            bgColor="bg-orange-100"
            icon={<Package className="h-4 w-4 text-orange-600" />}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Sales Overview</h2>
            </div>
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={300}
            />
          </div>

          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total.toFixed(2)}</p>
                    <span
                      className={cn(
                        "capitalize px-2 py-1 rounded-full text-xs font-medium",
                        order.status === 'delivered' && "bg-green-100 text-green-800",
                        order.status === 'cooking' && "bg-blue-100 text-blue-800",
                        order.status === 'pending' && "bg-yellow-100 text-yellow-800"
                      )}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Top Selling Foods</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topSellingFoods.map((food) => (
                <div
                  key={food.id}
                  className="relative rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <p className="text-sm font-medium">{food.name}</p>
                    <p className="text-xs">Sold: {food.soldCount}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Top Rated Foods</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topRatedFoods.map((food) => (
                <div
                  key={food.id}
                  className="bg-white rounded-lg p-4 shadow cursor-pointer"
                >
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-24 object-cover rounded-lg mb-2"
                  />
                  <h3 className="font-medium text-sm mb-1">{food.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm">{food.rating}</span>
                    <span className="text-xs text-gray-500">
                      ({food.reviews} Reviews)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};