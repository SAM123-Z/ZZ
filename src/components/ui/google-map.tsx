import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
  onLocationSelect?: (location: { lat: number; lng: number; address: string }) => void;
  initialLocation?: { lat: number; lng: number };
  height?: string;
  className?: string;
}

export const GoogleMap: React.FC<GoogleMapProps> = ({
  onLocationSelect,
  initialLocation = { lat: 33.5731, lng: -7.5898 }, // Casablanca par défaut
  height = '400px',
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: 'AIzaSyBFw0Qbyq9zTFTd-tUY6dO_BcqCGAOtOqA', // Clé API publique pour démo
          version: 'weekly',
          libraries: ['places']
        });

        const { Map } = await loader.importLibrary('maps');
        const { Marker } = await loader.importLibrary('marker');

        if (mapRef.current) {
          const mapInstance = new Map(mapRef.current, {
            center: initialLocation,
            zoom: 13,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            styles: [
              {
                featureType: 'poi.business',
                elementType: 'labels',
                stylers: [{ visibility: 'on' }]
              }
            ]
          });

          const markerInstance = new Marker({
            position: initialLocation,
            map: mapInstance,
            draggable: true,
            title: 'Emplacement du restaurant'
          });

          // Géocodeur pour obtenir l'adresse
          const geocoder = new google.maps.Geocoder();

          const updateLocation = (position: google.maps.LatLng) => {
            geocoder.geocode({ location: position }, (results, status) => {
              if (status === 'OK' && results?.[0]) {
                const address = results[0].formatted_address;
                onLocationSelect?.({
                  lat: position.lat(),
                  lng: position.lng(),
                  address
                });
              }
            });
          };

          // Événement de clic sur la carte
          mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
              markerInstance.setPosition(event.latLng);
              updateLocation(event.latLng);
            }
          });

          // Événement de glissement du marqueur
          markerInstance.addListener('dragend', () => {
            const position = markerInstance.getPosition();
            if (position) {
              updateLocation(position);
            }
          });

          // Initialiser avec la position par défaut
          updateLocation(new google.maps.LatLng(initialLocation.lat, initialLocation.lng));

          setMap(mapInstance);
          setMarker(markerInstance);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Erreur lors du chargement de Google Maps:', err);
        setError('Impossible de charger la carte. Veuillez réessayer.');
        setIsLoading(false);
      }
    };

    initMap();
  }, [initialLocation, onLocationSelect]);

  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center p-4">
          <p className="text-red-500 font-medium mb-2">Erreur de chargement</p>
          <p className="text-gray-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg z-10"
          style={{ height }}
        >
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[#ff6600] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Chargement de la carte...</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        style={{ height }}
        className="w-full rounded-lg border-2 border-gray-300"
      />
      
      {!isLoading && (
        <div className="absolute top-2 left-2 bg-white px-3 py-1 rounded-lg shadow-md z-10">
          <p className="text-xs text-gray-600">
            📍 Cliquez ou glissez pour positionner votre restaurant
          </p>
        </div>
      )}
    </div>
  );
};