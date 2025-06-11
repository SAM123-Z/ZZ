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
          throw new Error('Google Maps API key is not configured. Please add VITE_GOOGLE_MAPS_API_KEY to your environment variables.');
        }

        // Charger l'API Google Maps de manière dynamique
        if (!window.google) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=fr`;
          script.async = true;
          script.defer = true;
          
          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load Google Maps API'));
            document.head.appendChild(script);
          });
        }

        if (mapRef.current && window.google) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: initialLocation,
            zoom: 15,
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
            animation: google.maps.Animation.DROP,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 2C11.6 2 8 5.6 8 10C8 16 16 30 16 30S24 16 24 10C24 5.6 20.4 2 16 2Z" fill="#ff6600"/>
                  <circle cx="16" cy="10" r="4" fill="white"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32),
              anchor: new google.maps.Point(16, 32)
            }
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
              mapInstance.panTo(event.latLng);
              updateLocation(event.latLng);
            }
          });

          // Événement de glissement du marqueur
          markerInstance.addListener('dragend', () => {
            const position = markerInstance.getPosition();
            if (position) {
              mapInstance.panTo(position);
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
        setError(err instanceof Error ? err.message : 'Unable to load map. Please try again.');
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
        className={`flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 border-2 border-dashed border-red-300 rounded-lg ${className}`}
        style={{ height }}
      >
        <div className="text-center p-6 max-w-lg">
          <div className="text-6xl mb-4">🗺️</div>
          <h3 className="text-red-700 font-bold text-lg mb-2">Carte Google Maps non disponible</h3>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          
          {error.includes('not configured') && (
            <div className="bg-white border border-red-200 rounded-lg p-4 text-left mb-4">
              <h4 className="text-red-800 font-semibold mb-3 flex items-center">
                🔧 Configuration requise
              </h4>
              <div className="space-y-2 text-sm text-red-700">
                <div className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">1</span>
                  <span>Allez sur <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noopener noreferrer" className="underline font-medium">Google Cloud Console</a></span>
                </div>
                <div className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">2</span>
                  <span>Créez un projet et activez ces APIs :</span>
                </div>
                <div className="ml-7 space-y-1 text-xs">
                  <div>• Maps JavaScript API</div>
                  <div>• Places API</div>
                  <div>• Geocoding API</div>
                </div>
                <div className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">3</span>
                  <span>Créez une clé API</span>
                </div>
                <div className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">4</span>
                  <span>Copiez la clé dans votre fichier <code className="bg-gray-100 px-1 rounded">.env</code></span>
                </div>
                <div className="flex items-start">
                  <span className="bg-red-100 text-red-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">5</span>
                  <span>Redémarrez avec <code className="bg-gray-100 px-1 rounded">npm run dev</code></span>
                </div>
              </div>
            </div>
          )}
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-sm">
              <span className="font-medium">💡 Alternative temporaire :</span><br />
              Vous pouvez saisir l'adresse manuellement dans le champ texte en attendant la configuration de l\'API.
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
            <div className="w-12 h-12 border-4 border-[#ff6600] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-700 font-semibold text-lg">Chargement de la carte...</p>
            <p className="text-gray-500 text-sm mt-1">Connexion à Google Maps</p>
            <div className="mt-3 flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-[#ff6600] rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-[#ff6600] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-[#ff6600] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        style={{ height }}
        className="w-full rounded-lg border-2 border-gray-300 shadow-lg"
      />
      
      {!isLoading && !error && (
        <div className="absolute top-4 left-4 bg-white px-4 py-3 rounded-lg shadow-lg z-10 border border-gray-200 max-w-xs">
          <p className="text-sm text-gray-700 font-medium flex items-center">
            <span className="text-[#ff6600] mr-2 text-lg">📍</span>
            <span>Cliquez sur la carte ou glissez le marqueur pour positionner votre restaurant</span>
          </p>
        </div>
      )}
      
      {!isLoading && !error && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-80 text-white px-3 py-2 rounded-lg z-10 shadow-lg">
          <p className="text-xs font-medium">Powered by Google Maps</p>
        </div>
      )}
    </div>
  );
};