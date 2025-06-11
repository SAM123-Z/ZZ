import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Configuration de l'icône personnalisée
const customIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 2C14.5 2 10 6.5 10 12C10 20 20 38 20 38S30 20 30 12C30 6.5 25.5 2 20 2Z" fill="#ff6600" stroke="white" stroke-width="2"/>
      <circle cx="20" cy="12" r="5" fill="white"/>
      <circle cx="20" cy="12" r="3" fill="#ff6600"/>
    </svg>
  `),
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

interface OpenStreetMapProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number };
  height?: string;
  className?: string;
}

// Composant pour gérer les clics sur la carte
const MapClickHandler = ({ 
  onLocationSelect, 
  position, 
  setPosition 
}: { 
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  position: [number, number];
  setPosition: (pos: [number, number]) => void;
}) => {
  const map = useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      
      // Géocodage inverse avec Nominatim (OpenStreetMap)
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        const address = data.display_name || `Coordonnées: ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        
        onLocationSelect?.({ lat, lng, address });
      } catch (error) {
        console.warn('Erreur de géocodage:', error);
        onLocationSelect?.({ 
          lat, 
          lng, 
          address: `Coordonnées: ${lat.toFixed(6)}, ${lng.toFixed(6)}` 
        });
      }
    },
  });

  return null;
};

// Composant pour centrer la carte sur une nouvelle position
const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);

  return null;
};

export const OpenStreetMap: React.FC<OpenStreetMapProps> = ({
  onLocationSelect,
  initialLocation = { lat: 33.5731, lng: -7.5898 }, // Casablanca par défaut
  height = '400px',
  className = ''
}) => {
  const [position, setPosition] = useState<[number, number]>([
    initialLocation.lat, 
    initialLocation.lng
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [mapReady, setMapReady] = useState(false);

  // Mettre à jour la position si initialLocation change
  useEffect(() => {
    if (initialLocation) {
      setPosition([initialLocation.lat, initialLocation.lng]);
    }
  }, [initialLocation]);

  // Géocodage initial
  useEffect(() => {
    const getInitialAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${initialLocation.lat}&lon=${initialLocation.lng}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        const address = data.display_name || `Coordonnées: ${initialLocation.lat.toFixed(6)}, ${initialLocation.lng.toFixed(6)}`;
        
        onLocationSelect?.({ 
          lat: initialLocation.lat, 
          lng: initialLocation.lng, 
          address 
        });
      } catch (error) {
        console.warn('Erreur de géocodage initial:', error);
        onLocationSelect?.({ 
          lat: initialLocation.lat, 
          lng: initialLocation.lng, 
          address: `Coordonnées: ${initialLocation.lat.toFixed(6)}, ${initialLocation.lng.toFixed(6)}` 
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (mapReady) {
      getInitialAddress();
    }
  }, [initialLocation, onLocationSelect, mapReady]);

  const handleMapReady = () => {
    setMapReady(true);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-orange-50 border-2 border-dashed border-orange-300 rounded-xl z-10 shadow-lg"
          style={{ height }}
        >
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-[#ff6600] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🗺️</span>
              </div>
            </div>
            <h3 className="text-gray-800 font-bold text-xl mb-2">Chargement de la carte</h3>
            <p className="text-gray-600 text-sm mb-4">Initialisation d'OpenStreetMap...</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-[#ff6600] rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-[#ff6600] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-[#ff6600] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div 
        style={{ height }}
        className="w-full rounded-xl border-2 border-gray-300 shadow-xl overflow-hidden"
      >
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          whenReady={handleMapReady}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <Marker 
            position={position} 
            icon={customIcon}
            draggable={true}
            eventHandlers={{
              dragend: async (e) => {
                const marker = e.target;
                const newPos = marker.getLatLng();
                setPosition([newPos.lat, newPos.lng]);
                
                // Géocodage inverse
                try {
                  const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newPos.lat}&lon=${newPos.lng}&zoom=18&addressdetails=1`
                  );
                  const data = await response.json();
                  const address = data.display_name || `Coordonnées: ${newPos.lat.toFixed(6)}, ${newPos.lng.toFixed(6)}`;
                  
                  onLocationSelect?.({ lat: newPos.lat, lng: newPos.lng, address });
                } catch (error) {
                  console.warn('Erreur de géocodage:', error);
                  onLocationSelect?.({ 
                    lat: newPos.lat, 
                    lng: newPos.lng, 
                    address: `Coordonnées: ${newPos.lat.toFixed(6)}, ${newPos.lng.toFixed(6)}` 
                  });
                }
              }
            }}
          />
          
          <MapClickHandler 
            onLocationSelect={onLocationSelect}
            position={position}
            setPosition={setPosition}
          />
          
          <MapUpdater center={position} />
        </MapContainer>
      </div>
      
      {mapReady && (
        <div className="absolute top-4 left-4 bg-white px-5 py-4 rounded-xl shadow-xl z-[1000] border border-gray-200 max-w-sm">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">📍</span>
            <div>
              <p className="text-sm text-gray-800 font-semibold mb-1">
                Positionnez votre restaurant
              </p>
              <p className="text-xs text-gray-600">
                Cliquez sur la carte ou glissez le marqueur orange
              </p>
            </div>
          </div>
        </div>
      )}
      
      {mapReady && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-90 text-white px-4 py-2 rounded-lg z-[1000] shadow-lg">
          <p className="text-xs font-medium flex items-center">
            <span className="mr-2">🌍</span>
            Powered by OpenStreetMap
          </p>
        </div>
      )}
    </div>
  );
};