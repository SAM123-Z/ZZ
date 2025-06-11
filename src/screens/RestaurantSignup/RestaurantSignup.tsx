import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { MapPin, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const restaurantSchema = z.object({
  restaurantName: z.string().min(1, 'Le nom du restaurant est requis'),
  tags: z.string().min(1, 'Au moins un tag est requis'),
  minDeliveryTime: z.string().min(1, 'Le délai minimum est requis'),
  maxDeliveryTime: z.string().min(1, 'Le délai maximum est requis'),
  address: z.string().min(1, "L'adresse est requise"),
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
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

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(restaurantSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Simuler l'envoi du formulaire
      console.log('Form data:', { ...data, coverImage, logo });
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Rediriger vers le tableau de bord du restaurant
      navigate('/restaurant-dashboard');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Rejoignez notre plateforme
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Développez votre activité en rejoignant notre réseau de restaurants partenaires
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              {/* Informations sur le restaurant */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#ff6600] rounded-full flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Informations sur le restaurant</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="restaurantName" className="text-base font-medium">
                      Nom du restaurant <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('restaurantName')}
                      id="restaurantName"
                      placeholder="Nom du restaurant"
                      className="h-12 rounded-xl border-2 text-base"
                    />
                    {errors.restaurantName && (
                      <p className="text-red-500 text-sm">{errors.restaurantName.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags" className="text-base font-medium">
                      Étiquette <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('tags')}
                      id="tags"
                      placeholder="Ex: Italien, Pizza, Pasta"
                      className="h-12 rounded-xl border-2 text-base"
                    />
                    {errors.tags && (
                      <p className="text-red-500 text-sm">{errors.tags.message as string}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="minDeliveryTime" className="text-base font-medium">
                      Délai de livraison minimum <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('minDeliveryTime')}
                      id="minDeliveryTime"
                      placeholder="Ex: 20 minutes"
                      className="h-12 rounded-xl border-2 text-base"
                    />
                    {errors.minDeliveryTime && (
                      <p className="text-red-500 text-sm">{errors.minDeliveryTime.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxDeliveryTime" className="text-base font-medium">
                      Délai de livraison maximal <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('maxDeliveryTime')}
                      id="maxDeliveryTime"
                      placeholder="Ex: 45 minutes"
                      className="h-12 rounded-xl border-2 text-base"
                    />
                    {errors.maxDeliveryTime && (
                      <p className="text-red-500 text-sm">{errors.maxDeliveryTime.message as string}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base font-medium">
                    Adresse du restaurant <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <Input
                      {...register('address')}
                      id="address"
                      placeholder="Adresse complète du restaurant"
                      className="h-12 pl-12 rounded-xl border-2 text-base"
                    />
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address.message as string}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-base font-medium">Photo de couverture</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#ff6600] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                        id="coverImage"
                      />
                      <label htmlFor="coverImage" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                        <p className="text-base font-medium text-gray-700 mb-1">
                          Cliquez pour télécharger
                        </p>
                        <p className="text-sm text-gray-500">
                          JPG, JPEG, PNG • Moins de 1 Mo • Ratio 2:1
                        </p>
                        {coverImage && (
                          <p className="text-sm text-[#ff6600] mt-2 font-medium">
                            ✓ {coverImage.name}
                          </p>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-medium">Logo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-[#ff6600] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setLogo(e.target.files?.[0] || null)}
                        id="logo"
                      />
                      <label htmlFor="logo" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                        <p className="text-base font-medium text-gray-700 mb-1">
                          Cliquez pour télécharger
                        </p>
                        <p className="text-sm text-gray-500">
                          JPG, JPEG, PNG • Moins de 1 Mo • Ratio 1:1
                        </p>
                        {logo && (
                          <p className="text-sm text-[#ff6600] mt-2 font-medium">
                            ✓ {logo.name}
                          </p>
                        )}
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Informations sur le propriétaire */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#ff6600] rounded-full flex items-center justify-center text-white font-bold">
                    2
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Informations sur le propriétaire</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-base font-medium">
                      Prénom <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('firstName')}
                      id="firstName"
                      placeholder="Votre prénom"
                      className="h-12 rounded-xl border-2 text-base"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-base font-medium">
                      Nom de famille <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('lastName')}
                      id="lastName"
                      placeholder="Votre nom de famille"
                      className="h-12 rounded-xl border-2 text-base"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName.message as string}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-base font-medium">
                    Téléphone <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('phone')}
                    id="phone"
                    placeholder="+212 6XX XXX XXX"
                    className="h-12 rounded-xl border-2 text-base"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone.message as string}</p>
                  )}
                </div>
              </div>

              {/* Informations sur le compte */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-[#ff6600] rounded-full flex items-center justify-center text-white font-bold">
                    3
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Informations sur le compte</h2>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base font-medium">
                    E-mail <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('email')}
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="h-12 rounded-xl border-2 text-base"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message as string}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-base font-medium">
                      Mot de passe <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('password')}
                      id="password"
                      type="password"
                      placeholder="Minimum 8 caractères"
                      className="h-12 rounded-xl border-2 text-base"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-base font-medium">
                      Confirmez le mot de passe <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('confirmPassword')}
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirmez votre mot de passe"
                      className="h-12 rounded-xl border-2 text-base"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">{errors.confirmPassword.message as string}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 px-8 text-base border-2 border-[#ff6600] text-[#ff6600] hover:bg-[#ff6600] hover:text-white rounded-xl transition-all duration-200"
                  onClick={() => navigate('/')}
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-8 text-base bg-[#ff6600] hover:bg-[#ff6600]/90 text-white rounded-xl transition-all duration-200 transform hover:scale-105"
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