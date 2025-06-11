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
          throw new Error('🔑 Clé API Google Maps non configurée. Suivez le guide ACTIVATION_GOOGLE_MAPS.md pour configurer votre clé API.');
        }

        // Charger l'API Google Maps de manière dynamique
        if (!window.google) {
          const script = document.createElement('script');
          script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=fr`;
          script.async = true;
          script.defer = true;
          
          await new Promise<void>((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('❌ Échec du chargement de l\'API Google Maps. Vérifiez votre clé API.'));
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
            title: 'Emplacement du restaurant - Cliquez et glissez pour déplacer',
            animation: google.maps.Animation.DROP,
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 2C14.5 2 10 6.5 10 12C10 20 20 38 20 38S30 20 30 12C30 6.5 25.5 2 20 2Z" fill="#ff6600" stroke="white" stroke-width="2"/>
                  <circle cx="20" cy="12" r="5" fill="white"/>
                  <circle cx="20" cy="12" r="3" fill="#ff6600"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(40, 40),
              anchor: new google.maps.Point(20, 40)
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
                  address: `Coordonnées: ${position.lat().toFixed(6)}, ${position.lng().toFixed(6)}`
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

          // Animation du marqueur au survol
          markerInstance.addListener('mouseover', () => {
            markerInstance.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(() => markerInstance.setAnimation(null), 1000);
          });

          // Initialiser avec la position par défaut
          updateLocation(new google.maps.LatLng(initialLocation.lat, initialLocation.lng));

          setMap(mapInstance);
          setMarker(markerInstance);
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Erreur lors du chargement de Google Maps:', err);
        setError(err instanceof Error ? err.message : '❌ Impossible de charger la carte. Veuillez réessayer.');
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
        className={`flex items-center justify-center bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 border-2 border-dashed border-red-300 rounded-xl ${className}`}
        style={{ height }}
      >
        <div className="text-center p-8 max-w-2xl">
          <div className="text-8xl mb-6 animate-bounce">🗺️</div>
          <h3 className="text-red-700 font-bold text-2xl mb-4 flex items-center justify-center">
            <span className="mr-3">⚠️</span>
            Google Maps non configuré
          </h3>
          
          {error.includes('non configurée') && (
            <div className="bg-white border-2 border-red-200 rounded-xl p-6 text-left mb-6 shadow-lg">
              <h4 className="text-red-800 font-bold text-lg mb-4 flex items-center">
                🚀 Configuration requise - 5 minutes
              </h4>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-bold text-blue-800 mb-2 flex items-center">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">1</span>
                    Créer un projet Google Cloud
                  </h5>
                  <a 
                    href="https://console.cloud.google.com/projectcreate" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    🔗 Créer un projet
                    <span className="ml-2">↗️</span>
                  </a>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4">
                  <h5 className="font-bold text-green-800 mb-3 flex items-center">
                    <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">2</span>
                    Activer les 3 APIs (obligatoire)
                  </h5>
                  <div className="space-y-2">
                    <a 
                      href="https://console.cloud.google.com/apis/library/maps-backend.googleapis.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors text-sm"
                    >
                      📍 Activer Maps JavaScript API ↗️
                    </a>
                    <a 
                      href="https://console.cloud.google.com/apis/library/places-backend.googleapis.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors text-sm"
                    >
                      📍 Activer Places API ↗️
                    </a>
                    <a 
                      href="https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 transition-colors text-sm"
                    >
                      📍 Activer Geocoding API ↗️
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4">
                  <h5 className="font-bold text-purple-800 mb-2 flex items-center">
                    <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">3</span>
                    Créer une clé API
                  </h5>
                  <a 
                    href="https://console.cloud.google.com/apis/credentials" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    🔑 Créer une clé API
                    <span className="ml-2">↗️</span>
                  </a>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4">
                  <h5 className="font-bold text-orange-800 mb-2 flex items-center">
                    <span className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">4</span>
                    Configurer dans votre projet
                  </h5>
                  <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
                    <div className="text-gray-400"># Fichier .env</div>
                    <div>VITE_GOOGLE_MAPS_API_KEY=<span className="text-yellow-300">votre_clé_ici</span></div>
                  </div>
                  <p className="text-orange-700 text-sm mt-2">
                    Puis redémarrez avec <code className="bg-orange-200 px-2 py-1 rounded">npm run dev</code>
                  </p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm flex items-center">
                  <span className="text-2xl mr-3">📖</span>
                  <span>
                    <strong>Guide détaillé :</strong> Consultez le fichier 
                    <code className="bg-yellow-200 px-2 py-1 rounded mx-1">ACTIVATION_GOOGLE_MAPS.md</code>
                    pour des instructions complètes
                  </span>
                </p>
              </div>
            </div>
          )}
          
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-lg">
            <h4 className="text-blue-800 font-bold text-lg mb-3 flex items-center justify-center">
              <span className="mr-3">💡</span>
              Alternative temporaire
            </h4>
            <p className="text-blue-700 text-sm leading-relaxed">
              En attendant la configuration de Google Maps, vous pouvez saisir l'adresse 
              manuellement dans le champ texte. La géolocalisation sera disponible une fois 
              l'API configurée.
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
            <h3 className="text-gray-800 font-bold text-xl mb-2">Chargement de Google Maps</h3>
            <p className="text-gray-600 text-sm mb-4">Connexion en cours...</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-3 h-3 bg-[#ff6600] rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-[#ff6600] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-[#ff6600] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}
      
      <div 
        ref={mapRef} 
        style={{ height }}
        className="w-full rounded-xl border-2 border-gray-300 shadow-xl overflow-hidden"
      />
      
      {!isLoading && !error && (
        <div className="absolute top-4 left-4 bg-white px-5 py-4 rounded-xl shadow-xl z-10 border border-gray-200 max-w-sm">
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
      
      {!isLoading && !error && (
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-90 text-white px-4 py-2 rounded-lg z-10 shadow-lg">
          <p className="text-xs font-medium flex items-center">
            <span className="mr-2">⚡</span>
            Powered by Google Maps
          </p>
        </div>
      )}
    </div>
  );
};