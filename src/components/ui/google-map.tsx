import React, { useEffect, useRef, useState } from 'react';

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
        // Vérifier si la clé API est disponible
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        
        if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
          throw new Error('Clé API Google Maps non configurée. Veuillez configurer VITE_GOOGLE_MAPS_API_KEY dans votre fichier .env');
        }

        // Charger l'API Google Maps de manière dynamique
        if (!window.google) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=fr`;
          script.async = true;
          script.defer = true;
          
          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Impossible de charger l\'API Google Maps'));
            document.head.appendChild(script);
          });
        }

        if (mapRef.current && window.google) {
          const mapInstance = new google.maps.Map(mapRef.current, {
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

          const markerInstance = new google.maps.Marker({
            position: initialLocation,
            map: mapInstance,
            draggable: true,
            title: 'Emplacement du restaurant',
            animation: google.maps.Animation.DROP
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
              } else {
                console.warn('Géocodage échoué:', status);
                onLocationSelect?.({
                  lat: position.lat(),
                  lng: position.lng(),
                  address: `${position.lat().toFixed(6)}, ${position.lng().toFixed(6)}`
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
        setError(err instanceof Error ? err.message : 'Impossible de charger la carte. Veuillez réessayer.');
        setIsLoading(false);
      }
    };

    initMap();
  }, [initialLocation, onLocationSelect]);

  // Mettre à jour la position du marqueur si initialLocation change
  useEffect(() => {
    if (map && marker && initialLocation) {
      marker.setPosition(initialLocation);
      map.setCenter(initialLocation);
    }
  }, [map, marker, initialLocation]);

  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center p-4 max-w-md">
          <div className="text-red-500 text-4xl mb-3">🗺️</div>
          <p className="text-red-600 font-medium mb-2">Carte non disponible</p>
          <p className="text-gray-600 text-sm mb-3">{error}</p>
          
          {error.includes('Clé API') && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
              <p className="text-blue-800 text-sm font-medium mb-2">
                🔧 Configuration requise:
              </p>
              <ol className="text-blue-700 text-xs space-y-1 list-decimal list-inside">
                <li>Allez sur <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                <li>Créez une clé API et activez "Maps JavaScript API"</li>
                <li>Activez aussi "Places API" et "Geocoding API"</li>
                <li>Copiez votre clé dans le fichier .env</li>
                <li>Redémarrez le serveur de développement</li>
              </ol>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-xs">
              💡 <strong>Alternative:</strong> Vous pouvez saisir l'adresse manuellement dans le champ texte en attendant.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-white border-2 border-dashed border-orange-300 rounded-lg z-10"
          style={{ height }}
        >
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-[#ff6600] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-700 font-medium">Chargement de la carte...</p>
            <p className="text-gray-500 text-sm mt-1">Connexion à Google Maps</p>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        style={{ height }}
        className="w-full rounded-lg border-2 border-gray-300 shadow-sm"
      />
      
      {!isLoading && !error && (
        <div className="absolute top-3 left-3 bg-white px-4 py-2 rounded-lg shadow-lg z-10 border border-gray-200">
          <p className="text-xs text-gray-700 font-medium flex items-center">
            <span className="text-[#ff6600] mr-1">📍</span>
            Cliquez ou glissez pour positionner votre restaurant
          </p>
        </div>
      )}
      
      {!isLoading && !error && (
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-75 text-white px-3 py-1 rounded-lg z-10">
          <p className="text-xs">Google Maps</p>
        </div>
      )}
    </div>
  );
};