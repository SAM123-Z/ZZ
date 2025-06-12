import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Upload, User, Mail, Phone, IdCard, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const deliverySignupSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom de famille est requis'),
  email: z.string().email('Email invalide'),
  vehicleType: z.string().min(1, 'Le type de véhicule est requis'),
  identityType: z.string().min(1, 'Le type d\'identité est requis'),
  identityNumber: z.string().min(1, 'Le numéro d\'identité est requis'),
  phone: z.string().min(1, 'Le téléphone est requis'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
  age: z.string().min(1, 'L\'âge est requis')
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

export const DeliverySignup = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [identityImage, setIdentityImage] = useState<File | null>(null);
  const [drivingLicense, setDrivingLicense] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(deliverySignupSchema)
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'identity' | 'license') => {
    const file = e.target.files?.[0];
    if (file) {
      switch (type) {
        case 'profile':
          setProfileImage(file);
          break;
        case 'identity':
          setIdentityImage(file);
          break;
        case 'license':
          setDrivingLicense(file);
          break;
      }
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      console.log('Form data:', { 
        ...data, 
        profileImage, 
        identityImage, 
        drivingLicense 
      });
      await new Promise(resolve => setTimeout(resolve, 1500));
      // Rediriger vers la page d'accueil livreur
      navigate('/delivery-home');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const vehicleTypes = [
    'Vélo',
    'Scooter',
    'Moto',
    'Voiture',
    'Camionnette'
  ];

  const identityTypes = [
    'Carte d\'identité nationale',
    'Passeport',
    'Permis de conduire',
    'Carte de séjour'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Demande D'inscription De Livreur
            </h1>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Informations Sur L'utilisateur */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Informations Sur L'utilisateur
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Prénom */}
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      Prénom
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        {...register('firstName')}
                        id="firstName"
                        placeholder="Prénom"
                        className="pl-10 h-12 rounded-lg border-2"
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-red-500 text-sm">{errors.firstName.message as string}</p>
                    )}
                  </div>

                  {/* Nom de famille */}
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Nom de famille
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        {...register('lastName')}
                        id="lastName"
                        placeholder="Nom de famille"
                        className="pl-10 h-12 rounded-lg border-2"
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-red-500 text-sm">{errors.lastName.message as string}</p>
                    )}
                  </div>

                  {/* Image de profil */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Image de profil
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#ff6600] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'profile')}
                        id="profileImage"
                      />
                      <label htmlFor="profileImage" className="cursor-pointer">
                        {profileImage ? (
                          <div className="space-y-2">
                            <img
                              src={URL.createObjectURL(profileImage)}
                              alt="Aperçu"
                              className="w-16 h-16 object-cover rounded-full mx-auto"
                            />
                            <p className="text-xs text-[#ff6600]">Cliquez pour télécharger</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <p className="text-xs text-gray-500">Cliquez pour télécharger</p>
                          </div>
                        )}
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">JPG, JPEG, PNG Moins de 1 Mo (ratio 2:1)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* E-mail */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-mail
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        {...register('email')}
                        id="email"
                        type="email"
                        placeholder="E-mail"
                        className="pl-10 h-12 rounded-lg border-2"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email.message as string}</p>
                    )}
                  </div>

                  {/* Sélectionnez le type de véhicule */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Sélectionnez le type de véhicule
                    </Label>
                    <Select onValueChange={(value) => setValue('vehicleType', value)}>
                      <SelectTrigger className="h-12 rounded-lg border-2">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.vehicleType && (
                      <p className="text-red-500 text-sm">{errors.vehicleType.message as string}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Informations Sur L'identité */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Informations Sur L'identité
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Type d'identité */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Type d'identité
                    </Label>
                    <Select onValueChange={(value) => setValue('identityType', value)}>
                      <SelectTrigger className="h-12 rounded-lg border-2">
                        <SelectValue placeholder="Sélectionnez" />
                      </SelectTrigger>
                      <SelectContent>
                        {identityTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.identityType && (
                      <p className="text-red-500 text-sm">{errors.identityType.message as string}</p>
                    )}
                  </div>

                  {/* Numéro d'identité */}
                  <div className="space-y-2">
                    <Label htmlFor="identityNumber" className="text-sm font-medium text-gray-700">
                      Numéro d'identité
                    </Label>
                    <div className="relative">
                      <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        {...register('identityNumber')}
                        id="identityNumber"
                        placeholder="Numéro d'identité"
                        className="pl-10 h-12 rounded-lg border-2"
                      />
                    </div>
                    {errors.identityNumber && (
                      <p className="text-red-500 text-sm">{errors.identityNumber.message as string}</p>
                    )}
                  </div>

                  {/* Image d'identité */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Image d'identité
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-[#ff6600] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'identity')}
                        id="identityImage"
                      />
                      <label htmlFor="identityImage" className="cursor-pointer">
                        {identityImage ? (
                          <div className="space-y-2">
                            <img
                              src={URL.createObjectURL(identityImage)}
                              alt="Aperçu"
                              className="w-16 h-16 object-cover rounded mx-auto"
                            />
                            <p className="text-xs text-[#ff6600]">Cliquez pour télécharger</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="mx-auto h-8 w-8 text-gray-400" />
                            <p className="text-xs text-gray-500">Cliquez pour télécharger</p>
                          </div>
                        )}
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">JPG, JPEG, PNG Moins de 1 Mo (ratio 2:1)</p>
                  </div>
                </div>
              </div>

              {/* Informations Sur Le Compte */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Informations Sur Le Compte
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Téléphone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Téléphone
                    </Label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg">
                        <span className="text-sm">🇺🇸 +</span>
                      </div>
                      <Input
                        {...register('phone')}
                        id="phone"
                        placeholder="YACIN@GMAIL.COM"
                        className="rounded-l-none h-12 border-2"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm">{errors.phone.message as string}</p>
                    )}
                  </div>

                  {/* Mot de passe */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        {...register('password')}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••••••••••"
                        className="pr-10 h-12 rounded-lg border-2"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password.message as string}</p>
                    )}
                  </div>

                  {/* Confirmez le mot de passe */}
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirmez le mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        {...register('confirmPassword')}
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••••••••••"
                        className="pr-10 h-12 rounded-lg border-2"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        ) : (
                          <Eye className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">{errors.confirmPassword.message as string}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Informations Complémentaires */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Informations Complémentaires
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Permis de conduire */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">
                      Permis de conduire
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#ff6600] transition-colors">
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => handleImageUpload(e, 'license')}
                        id="drivingLicense"
                      />
                      <label htmlFor="drivingLicense" className="cursor-pointer">
                        {drivingLicense ? (
                          <div className="space-y-2">
                            <div className="w-16 h-16 bg-gray-100 rounded mx-auto flex items-center justify-center">
                              <span className="text-2xl">📄</span>
                            </div>
                            <p className="text-xs text-[#ff6600]">Cliquez pour télécharger</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="text-xs text-gray-500">Cliquez pour télécharger</p>
                          </div>
                        )}
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">pdf, doc Moins de 1 Mo</p>
                  </div>

                  {/* Entrez votre âge */}
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm font-medium text-gray-700">
                      Entrez votre âge
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        {...register('age')}
                        id="age"
                        placeholder="Entrez l'âge"
                        className="pl-10 h-12 rounded-lg border-2"
                      />
                    </div>
                    {errors.age && (
                      <p className="text-red-500 text-sm">{errors.age.message as string}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  className="px-8 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => navigate('/')}
                >
                  Réinitialiser
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white rounded-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Soumettre des informations...
                    </div>
                  ) : (
                    'Soumettre des informations'
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