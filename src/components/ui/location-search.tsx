import React, { useState, useEffect, useRef } from 'react';
import { Input } from './input';
import { Button } from './button';
import { MapPin, Search, Navigation, X, Loader2 } from 'lucide-react';

interface LocationResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: string;
  type: string;
  importance: number;
}

interface LocationSearchProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  placeholder?: string;
  className?: string;
  value?: string;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
  onLocationSelect,
  placeholder = "Rechercher une adresse...",
  className = "",
  value = ""
}) => {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<LocationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const resultsRef = useRef<HTMLDivElement>(null);

  // Mettre à jour la valeur quand elle change de l'extérieur
  useEffect(() => {
    setQuery(value);
  }, [value]);

  // Fermer les résultats quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchLocations = async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setIsLoading(true);
    
    try {
      // Utiliser l'API Nominatim d'OpenStreetMap pour le géocodage
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=5&addressdetails=1&countrycodes=ma,fr,es,us,ca,gb,de,it&accept-language=fr`
      );
      
      if (response.ok) {
        const data: LocationResult[] = await response.json();
        setResults(data);
        setShowResults(data.length > 0);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
      setResults([]);
      setShowResults(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Débounce la recherche
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      searchLocations(newQuery);
    }, 300);
  };

  const handleLocationSelect = (result: LocationResult) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    
    setQuery(result.display_name);
    setShowResults(false);
    setResults([]);
    
    onLocationSelect({
      lat,
      lng,
      address: result.display_name
    });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('La géolocalisation n\'est pas supportée par ce navigateur.');
      return;
    }

    setIsGeolocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Géocodage inverse pour obtenir l'adresse
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=fr`
          );
          
          if (response.ok) {
            const data = await response.json();
            const address = data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
            
            setQuery(address);
            onLocationSelect({
              lat: latitude,
              lng: longitude,
              address
            });
          }
        } catch (error) {
          console.error('Erreur de géocodage inverse:', error);
          const address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
          setQuery(address);
          onLocationSelect({
            lat: latitude,
            lng: longitude,
            address
          });
        } finally {
          setIsGeolocating(false);
        }
      },
      (error) => {
        console.error('Erreur de géolocalisation:', error);
        setIsGeolocating(false);
        
        let message = 'Impossible d\'obtenir votre position.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = 'Permission de géolocalisation refusée.';
            break;
          case error.POSITION_UNAVAILABLE:
            message = 'Position non disponible.';
            break;
          case error.TIMEOUT:
            message = 'Délai de géolocalisation dépassé.';
            break;
        }
        alert(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  const formatLocationName = (result: LocationResult) => {
    const parts = result.display_name.split(',');
    if (parts.length > 3) {
      return `${parts[0]}, ${parts[1]}, ${parts[2]}...`;
    }
    return result.display_name;
  };

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'house':
      case 'building':
        return '🏠';
      case 'restaurant':
      case 'cafe':
        return '🍽️';
      case 'shop':
        return '🏪';
      case 'city':
      case 'town':
        return '🏙️';
      case 'village':
        return '🏘️';
      case 'road':
      case 'street':
        return '🛣️';
      default:
        return '📍';
    }
  };

  return (
    <div className={`relative ${className}`} ref={resultsRef}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <Input
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="pl-10 pr-10 h-12 rounded-lg border-2 focus:border-[#ff6600] transition-colors"
            onFocus={() => {
              if (results.length > 0) {
                setShowResults(true);
              }
            }}
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {isLoading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Loader2 className="h-4 w-4 animate-spin text-[#ff6600]" />
            </div>
          )}
        </div>
        
        <Button
          type="button"
          onClick={getCurrentLocation}
          disabled={isGeolocating}
          className="h-12 px-4 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white rounded-lg transition-all duration-200 disabled:opacity-50"
          title="Utiliser ma position actuelle"
        >
          {isGeolocating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Navigation className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Résultats de recherche */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={result.place_id || index}
              onClick={() => handleLocationSelect(result)}
              className="w-full px-4 py-3 text-left hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-orange-50"
            >
              <div className="flex items-start space-x-3">
                <span className="text-lg mt-0.5 flex-shrink-0">
                  {getLocationIcon(result.type)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {formatLocationName(result)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {result.type && (
                      <span className="inline-block bg-gray-100 px-2 py-0.5 rounded-full mr-2 capitalize">
                        {result.type}
                      </span>
                    )}
                    Lat: {parseFloat(result.lat).toFixed(4)}, Lng: {parseFloat(result.lon).toFixed(4)}
                  </p>
                </div>
                <MapPin className="h-4 w-4 text-[#ff6600] flex-shrink-0 mt-1" />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Message quand aucun résultat */}
      {showResults && results.length === 0 && !isLoading && query.length >= 3 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-lg shadow-xl z-50 p-4 text-center">
          <div className="text-gray-500">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm font-medium">Aucun résultat trouvé</p>
            <p className="text-xs mt-1">Essayez avec une adresse plus précise</p>
          </div>
        </div>
      )}
    </div>
  );
};