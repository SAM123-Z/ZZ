import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { OpenStreetMap } from '../../components/ui/openstreet-map';
import { LocationSearch } from '../../components/ui/location-search';
import { MapPin, Upload, User, Navigation, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const restaurantSchema = z.object({
  restaurantName: z.string().min(1, 'Le nom du restaurant est requis'),
  tags: z.string().min(1, 'Au moins un tag est requis'),
  minDeliveryTime: z.string().min(1, 'Le délai minimum est requis'),
  maxDeliveryTime: z.string().min(1, 'Le délai maximum est requis'),
  address: z.string().min(1, "L'adresse est requise"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  username: z.string()
    .min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères')
    .max(20, 'Le nom d\'utilisateur ne peut pas dépasser 20 caractères')
    .regex(/^[a-zA-Z0-9_]+$/, 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres et underscores'),
  phone: z.string().min(1, 'Le téléphone est requis'),
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

export const RestaurantSignup = () => {
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number; lng: number; address: string} | null>(null);
  const [showMap, setShowMap] = useState(false);

  const { register, handleSubmit, formState: { errors }, setError, watch, setValue } = useForm({
    resolver: zodResolver(restaurantSchema)
  });

  const watchedUsername = watch('username');

  // Vérification de disponibilité du nom d'utilisateur
  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    setCheckingUsername(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const takenUsernames = ['admin', 'user', 'test', 'demo', 'restaurant', 'foodswift'];
    const isAvailable = !takenUsernames.includes(username.toLowerCase());
    
    setUsernameAvailable(isAvailable);
    setCheckingUsername(false);
  };

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (watchedUsername) {
        checkUsernameAvailability(watchedUsername);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [watchedUsername]);

  const handleLocationSelect = (location: { lat: number; lng: number; address: string }) => {
    setSelectedLocation(location);
    setValue('address', location.address);
    setValue('latitude', location.lat);
    setValue('longitude', location.lng);
  };

  const onSubmit = async (data: any) => {
    if (!usernameAvailable) {
      setError('username', {
        type: 'manual',
        message: 'Ce nom d\'utilisateur n\'est pas disponible'
      });
      return;
    }

    if (!selectedLocation) {
      setError('address', {
        type: 'manual',
        message: 'Veuillez sélectionner une localisation précise'
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Form data:', { 
        ...data, 
        coverImage, 
        logo, 
        location: selectedLocation 
      });
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/restaurant-dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header compact */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Rejoignez notre plateforme
            </h1>
            <p className="text-gray-600">
              Développez votre activité en rejoignant notre réseau de restaurants partenaires
            </p>
          </div>

          {/* Form Container avec layout en colonnes */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Layout en 3 colonnes pour écrans larges */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                
                {/* Colonne 1: Informations restaurant */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-[#ff6600] rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                      <h2 className="text-lg font-bold text-gray-800">Restaurant</h2>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="restaurantName" className="text-sm font-medium">
                          Nom du restaurant <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          {...register('restaurantName')}
                          id="restaurantName"
                          placeholder="Nom du restaurant"
                          className="h-10 rounded-lg border-2"
                        />
                        {errors.restaurantName && (
                          <p className="text-red-500 text-xs">{errors.restaurantName.message as string}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="tags" className="text-sm font-medium">
                          Étiquettes <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          {...register('tags')}
                          id="tags"
                          placeholder="Italien, Pizza, Pasta"
                          className="h-10 rounded-lg border-2"
                        />
                        {errors.tags && (
                          <p className="text-red-500 text-xs">{errors.tags.message as string}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="minDeliveryTime" className="text-sm font-medium">
                            Délai min <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            {...register('minDeliveryTime')}
                            id="minDeliveryTime"
                            placeholder="20 min"
                            className="h-10 rounded-lg border-2"
                          />
                          {errors.minDeliveryTime && (
                            <p className="text-red-500 text-xs">{errors.minDeliveryTime.message as string}</p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="maxDeliveryTime" className="text-sm font-medium">
                            Délai max <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            {...register('maxDeliveryTime')}
                            id="maxDeliveryTime"
                            placeholder="45 min"
                            className="h-10 rounded-lg border-2"
                          />
                          {errors.maxDeliveryTime && (
                            <p className="text-red-500 text-xs">{errors.maxDeliveryTime.message as string}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Propriétaire */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-[#ff6600] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                      <h2 className="text-lg font-bold text-gray-800">Propriétaire</h2>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="firstName" className="text-sm font-medium">
                            Prénom <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            {...register('firstName')}
                            id="firstName"
                            placeholder="Prénom"
                            className="h-10 rounded-lg border-2"
                          />
                          {errors.firstName && (
                            <p className="text-red-500 text-xs">{errors.firstName.message as string}</p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="lastName" className="text-sm font-medium">
                            Nom <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            {...register('lastName')}
                            id="lastName"
                            placeholder="Nom"
                            className="h-10 rounded-lg border-2"
                          />
                          {errors.lastName && (
                            <p className="text-red-500 text-xs">{errors.lastName.message as string}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="username" className="text-sm font-medium">
                          Nom d'utilisateur <span className="text-red-500">*</span>
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <Input
                            {...register('username')}
                            id="username"
                            placeholder="nom_utilisateur"
                            className={`h-10 pl-10 pr-10 rounded-lg border-2 ${
                              usernameAvailable === true ? 'border-green-500' : 
                              usernameAvailable === false ? 'border-red-500' : ''
                            }`}
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            {checkingUsername && (
                              <div className="w-4 h-4 border-2 border-gray-300 border-t-[#ff6600] rounded-full animate-spin"></div>
                            )}
                            {!checkingUsername && usernameAvailable === true && (
                              <span className="text-green-500 text-sm">✓</span>
                            )}
                            {!checkingUsername && usernameAvailable === false && (
                              <span className="text-red-500 text-sm">✗</span>
                            )}
                          </div>
                        </div>
                        {errors.username && (
                          <p className="text-red-500 text-xs">{errors.username.message as string}</p>
                        )}
                        {usernameAvailable === true && (
                          <p className="text-green-600 text-xs">✓ Disponible</p>
                        )}
                        {usernameAvailable === false && (
                          <p className="text-red-500 text-xs">✗ Déjà pris</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Téléphone <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          {...register('phone')}
                          id="phone"
                          placeholder="+212 6XX XXX XXX"
                          className="h-10 rounded-lg border-2"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs">{errors.phone.message as string}</p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-sm font-medium">
                          E-mail <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          {...register('email')}
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          className="h-10 rounded-lg border-2"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-xs">{errors.email.message as string}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label htmlFor="password" className="text-sm font-medium">
                            Mot de passe <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            {...register('password')}
                            id="password"
                            type="password"
                            placeholder="8+ caractères"
                            className="h-10 rounded-lg border-2"
                          />
                          {errors.password && (
                            <p className="text-red-500 text-xs">{errors.password.message as string}</p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="confirmPassword" className="text-sm font-medium">
                            Confirmation <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            {...register('confirmPassword')}
                            id="confirmPassword"
                            type="password"
                            placeholder="Confirmez"
                            className="h-10 rounded-lg border-2"
                          />
                          {errors.confirmPassword && (
                            <p className="text-red-500 text-xs">{errors.confirmPassword.message as string}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colonne 2: Localisation */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-[#ff6600] rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                      <h2 className="text-lg font-bold text-gray-800">Localisation</h2>
                    </div>

                    <div className="space-y-4">
                      {/* Barre de recherche d'adresse */}
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Rechercher une adresse <span className="text-red-500">*</span>
                        </Label>
                        <LocationSearch
                          onLocationSelect={handleLocationSelect}
                          placeholder="Tapez votre adresse (ex: 123 Rue Mohammed V, Casablanca)"
                          value={selectedLocation?.address || ''}
                        />
                        <p className="text-xs text-gray-500">
                          Recherchez votre adresse ou utilisez le bouton de géolocalisation
                        </p>
                      </div>

                      {/* Adresse sélectionnée */}
                      <div className="space-y-1">
                        <Label htmlFor="address" className="text-sm font-medium">
                          Adresse sélectionnée
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                          <Input
                            {...register('address')}
                            id="address"
                            placeholder="Aucune adresse sélectionnée"
                            className="h-10 pl-10 rounded-lg border-2 bg-gray-50"
                            value={selectedLocation?.address || ''}
                            readOnly
                          />
                        </div>
                        {errors.address && (
                          <p className="text-red-500 text-xs">{errors.address.message as string}</p>
                        )}
                      </div>

                      {/* Bouton pour afficher/masquer la carte */}
                      <Button
                        type="button"
                        onClick={() => setShowMap(!showMap)}
                        variant="outline"
                        className="w-full h-10 border-2 border-[#ff6600] text-[#ff6600] hover:bg-[#ff6600] hover:text-white rounded-lg transition-all duration-200"
                      >
                        <Map className="w-4 h-4 mr-2" />
                        {showMap ? 'Masquer la carte' : 'Affiner sur la carte'}
                      </Button>

                      {/* Informations de localisation */}
                      {selectedLocation && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <span className="text-green-600 text-lg">📍</span>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-800 mb-1">
                                Position confirmée
                              </p>
                              <p className="text-xs text-green-700 mb-2">
                                {selectedLocation.address}
                              </p>
                              <div className="grid grid-cols-2 gap-2 text-xs text-green-600">
                                <span>Lat: {selectedLocation.lat.toFixed(6)}</span>
                                <span>Lng: {selectedLocation.lng.toFixed(6)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Carte OpenStreetMap */}
                    {showMap && (
                      <div className="space-y-2">
                        <OpenStreetMap
                          onLocationSelect={handleLocationSelect}
                          initialLocation={selectedLocation || { lat: 33.5731, lng: -7.5898 }}
                          height="350px"
                          className="rounded-lg overflow-hidden"
                        />
                        <p className="text-xs text-gray-500 text-center">
                          Cliquez sur la carte ou glissez le marqueur pour affiner la position
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Colonne 3: Images */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 bg-[#ff6600] rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
                      <h2 className="text-lg font-bold text-gray-800">Images</h2>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Photo de couverture</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#ff6600] transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                            id="coverImage"
                          />
                          <label htmlFor="coverImage" className="cursor-pointer">
                            <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              Cliquez pour télécharger
                            </p>
                            <p className="text-xs text-gray-500">
                              JPG, PNG • 1 Mo max • Ratio 2:1 recommandé
                            </p>
                            {coverImage && (
                              <p className="text-xs text-[#ff6600] mt-2 font-medium">
                                ✓ {coverImage.name}
                              </p>
                            )}
                          </label>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label className="text-sm font-medium">Logo du restaurant</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#ff6600] transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setLogo(e.target.files?.[0] || null)}
                            id="logo"
                          />
                          <label htmlFor="logo" className="cursor-pointer">
                            <Upload className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                            <p className="text-sm font-medium text-gray-700 mb-1">
                              Cliquez pour télécharger
                            </p>
                            <p className="text-xs text-gray-500">
                              JPG, PNG • 1 Mo max • Ratio 1:1 recommandé
                            </p>
                            {logo && (
                              <p className="text-xs text-[#ff6600] mt-2 font-medium">
                                ✓ {logo.name}
                              </p>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Aperçu des images */}
                    {(coverImage || logo) && (
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-gray-700">Aperçu</h3>
                        <div className="space-y-2">
                          {coverImage && (
                            <div className="relative">
                              <img
                                src={URL.createObjectURL(coverImage)}
                                alt="Aperçu couverture"
                                className="w-full h-24 object-cover rounded-lg"
                              />
                              <span className="absolute top-1 left-1 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                Couverture
                              </span>
                            </div>
                          )}
                          {logo && (
                            <div className="relative">
                              <img
                                src={URL.createObjectURL(logo)}
                                alt="Aperçu logo"
                                className="w-20 h-20 object-cover rounded-lg mx-auto"
                              />
                              <span className="absolute top-1 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                Logo
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 px-8 border-2 border-[#ff6600] text-[#ff6600] hover:bg-[#ff6600] hover:text-white rounded-lg transition-all duration-200"
                  onClick={() => navigate('/')}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || !usernameAvailable || !selectedLocation}
                  className="h-12 px-8 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Envoi en cours...
                    </div>
                  ) : (
                    'Confirmer l\'inscription'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};