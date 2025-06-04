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
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Demande d'enregistrement de restaurant
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Informations sur le restaurant */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Informations sur le restaurant</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="restaurantName">
                    Nom du restaurant <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('restaurantName')}
                    id="restaurantName"
                    placeholder="Nom du restaurant"
                    className="rounded-lg border-2"
                  />
                  {errors.restaurantName && (
                    <p className="text-red-500 text-sm">{errors.restaurantName.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">
                    Étiquette <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('tags')}
                    id="tags"
                    placeholder="Ex: Italien, Pizza, Pasta"
                    className="rounded-lg border-2"
                  />
                  {errors.tags && (
                    <p className="text-red-500 text-sm">{errors.tags.message as string}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="minDeliveryTime">
                    Délai de livraison minimum <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('minDeliveryTime')}
                    id="minDeliveryTime"
                    placeholder="Délai de livraison"
                    className="rounded-lg border-2"
                  />
                  {errors.minDeliveryTime && (
                    <p className="text-red-500 text-sm">{errors.minDeliveryTime.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxDeliveryTime">
                    Délai de livraison maximal <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('maxDeliveryTime')}
                    id="maxDeliveryTime"
                    placeholder="Délai de livraison"
                    className="rounded-lg border-2"
                  />
                  {errors.maxDeliveryTime && (
                    <p className="text-red-500 text-sm">{errors.maxDeliveryTime.message as string}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Adresse du restaurant <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    {...register('address')}
                    id="address"
                    placeholder="Adresse du restaurant"
                    className="pl-10 rounded-lg border-2"
                  />
                </div>
                {errors.address && (
                  <p className="text-red-500 text-sm">{errors.address.message as string}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Photo de couverture</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-[#ff6600]">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                      id="coverImage"
                    />
                    <label htmlFor="coverImage" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        JPG, JPEG, PNG Moins de 1 Mo (ratio 2:1)
                      </p>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Logo</Label>
                  <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-[#ff6600]">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setLogo(e.target.files?.[0] || null)}
                      id="logo"
                    />
                    <label htmlFor="logo" className="cursor-pointer">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-500">
                        JPG, JPEG, PNG Moins de 1 Mo (ratio 1:1)
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations sur le propriétaire */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Informations sur le propriétaire</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">
                    Prénom <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('firstName')}
                    id="firstName"
                    placeholder="Prénom"
                    className="rounded-lg border-2"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">
                    Nom de famille <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('lastName')}
                    id="lastName"
                    placeholder="Nom de famille"
                    className="rounded-lg border-2"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName.message as string}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Téléphone <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register('phone')}
                  id="phone"
                  placeholder="+212"
                  className="rounded-lg border-2"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message as string}</p>
                )}
              </div>
            </div>

            {/* Informations sur le compte */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Informations sur le compte</h2>
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  E-mail <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register('email')}
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  className="rounded-lg border-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message as string}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="password">
                    Mot de passe <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('password')}
                    id="password"
                    type="password"
                    className="rounded-lg border-2"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirmez le mot de passe <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    {...register('confirmPassword')}
                    id="confirmPassword"
                    type="password"
                    className="rounded-lg border-2"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm">{errors.confirmPassword.message as string}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                className="px-6 py-2 text-[#ff6600] border-[#ff6600] hover:bg-[#ff6600] hover:text-white"
              >
                Réinitialiser
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Confirme'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};