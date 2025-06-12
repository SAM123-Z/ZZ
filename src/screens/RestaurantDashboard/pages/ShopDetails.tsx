import React, { useState } from 'react';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { 
  Edit,
  MapPin,
  Phone,
  DollarSign,
  Percent,
  Store,
  Info
} from 'lucide-react';

export const ShopDetails = () => {
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);

  const shopData = {
    name: 'Hungry Puppets',
    createdAt: '20 Aug 2021 09:11 pm',
    coverImage: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg',
    logo: 'https://images.pexels.com/photos/3338681/pexels-photo-3338681.jpeg',
    businessModel: 'Commission Base',
    adminCommission: '10 %',
    vatTax: '5 %',
    phone: '+212*******gy',
    address: 'House: 00, Road: 00, Test City',
    announcement: 'New Menu Delights: Prepare your palates for an exquisite journey with our revamped menu! We\'ve introduced a mouthwatering array of kebabs, sides, and desserts crafted with the finest ingredients to satisfy every craving.'
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Shop Details</h1>
          <p className="text-sm text-gray-500 mt-1">Created at {shopData.createdAt}</p>
        </div>
        
        <Button 
          className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 rounded-full px-6 py-2 flex items-center gap-2 font-medium"
        >
          <Edit className="w-4 h-4" />
          Edit Shop
        </Button>
      </div>

      {/* Cover Image avec logo et titre */}
      <div className="relative mb-8">
        {/* Cover Image */}
        <div 
          className="w-full h-64 bg-cover bg-center rounded-lg relative overflow-hidden"
          style={{ 
            backgroundImage: `linear-gradient(rgba(139, 0, 0, 0.8), rgba(139, 0, 0, 0.6)), url(${shopData.coverImage})`,
            backgroundColor: '#8B0000'
          }}
        >
          {/* Contenu superposé sur l'image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              {/* Titre stylisé "Hungry" en script doré */}
              <div className="mb-4">
                <span 
                  className="text-6xl font-bold italic"
                  style={{ 
                    fontFamily: 'cursive',
                    color: '#FFD700',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                    transform: 'rotate(-5deg)',
                    display: 'inline-block'
                  }}
                >
                  Hungry
                </span>
              </div>
              
              {/* Titre principal "PUPPETS" */}
              <div className="mb-4">
                <span 
                  className="text-7xl font-black tracking-wider"
                  style={{ 
                    color: 'white',
                    textShadow: '3px 3px 6px rgba(0,0,0,0.7)',
                    letterSpacing: '0.1em'
                  }}
                >
                  PUPPETS
                </span>
              </div>
              
              {/* Sous-titre */}
              <div>
                <span 
                  className="text-2xl font-bold tracking-widest"
                  style={{ 
                    color: '#FFD700',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
                    letterSpacing: '0.3em'
                  }}
                >
                  ORDER YOUR FAVORITE FOOD
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informations du restaurant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Logo et nom */}
        <div className="lg:col-span-1">
          <div className="bg-red-800 p-6 rounded-lg text-center">
            <div className="text-white">
              {/* Logo stylisé */}
              <div className="mb-4">
                <span 
                  className="text-3xl font-bold italic"
                  style={{ 
                    fontFamily: 'cursive',
                    color: '#FFD700'
                  }}
                >
                  Hungry
                </span>
              </div>
              <div>
                <span 
                  className="text-4xl font-black"
                  style={{ 
                    color: 'white',
                    letterSpacing: '0.1em'
                  }}
                >
                  PUPPETS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Détails du restaurant */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{shopData.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Business Model */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Store className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Business Model</p>
                <p className="font-semibold text-gray-800">{shopData.businessModel}</p>
              </div>
            </div>

            {/* Admin Commission */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <Percent className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Admin Commission</p>
                <p className="font-semibold text-gray-800">{shopData.adminCommission}</p>
              </div>
            </div>

            {/* VAT/TAX */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">VAT/TAX</p>
                <p className="font-semibold text-gray-800">{shopData.vatTax}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-800">{shopData.phone}</p>
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p className="font-semibold text-gray-800">{shopData.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Announcement */}
      <div className="mt-8 border-t pt-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-orange-500" />
            <h3 className="text-lg font-semibold text-gray-800">Announcement</h3>
            <div className="w-4 h-4 bg-orange-100 rounded-full flex items-center justify-center">
              <Info className="w-2 h-2 text-orange-600" />
            </div>
          </div>
          
          {/* Toggle Switch */}
          <div className="flex items-center">
            <div className="relative">
              <input
                type="checkbox"
                checked={announcementEnabled}
                onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                className="sr-only"
              />
              <div 
                className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${
                  announcementEnabled ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                onClick={() => setAnnouncementEnabled(!announcementEnabled)}
              >
                <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                  announcementEnabled ? 'translate-x-6' : 'translate-x-0.5'
                } mt-0.5`}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-700 leading-relaxed">
            {shopData.announcement}
          </p>
        </div>
      </div>
    </div>
  );
};