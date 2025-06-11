import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const signUpSchema = z.object({
  firstName: z.string().min(1, 'Le prénom est requis'),
  lastName: z.string().min(1, 'Le nom est requis'),
  username: z.string()
    .min(3, 'Le nom d\'utilisateur doit contenir au moins 3 caractères')
    .max(20, 'Le nom d\'utilisateur ne peut pas dépasser 20 caractères')
    .regex(/^[a-zA-Z0-9_]+$/, 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres et underscores'),
  phone: z.string().optional(),
  email: z.string().email('Adresse email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions d\'utilisation'
  })
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

interface SignUpFormProps {
  onModeChange: (mode: 'signin' | 'signup') => void;
  onClose: () => void;
}

export const SignUpForm = ({ onModeChange, onClose }: SignUpFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const { signUp } = useAuth();
  
  const { register, handleSubmit, formState: { errors }, setError, watch } = useForm({
    resolver: zodResolver(signUpSchema)
  });

  const watchedUsername = watch('username');

  // Simuler la vérification de disponibilité du nom d'utilisateur
  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) {
      setUsernameAvailable(null);
      return;
    }

    setCheckingUsername(true);
    
    // Simuler un appel API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simuler quelques noms d'utilisateur déjà pris
    const takenUsernames = ['admin', 'user', 'test', 'demo', 'restaurant'];
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

  const onSubmit = async (data: any) => {
    if (!usernameAvailable) {
      setError('username', {
        type: 'manual',
        message: 'Ce nom d\'utilisateur n\'est pas disponible'
      });
      return;
    }

    try {
      setIsLoading(true);
      await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone
      });
      onClose();
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Échec de l\'inscription. Veuillez réessayer.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom <span className="text-red-500">*</span></Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              {...register('firstName')}
              id="firstName"
              placeholder="Prénom"
              className="pl-10 rounded-full border-2"
              disabled={isLoading}
            />
          </div>
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Nom <span className="text-red-500">*</span></Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              {...register('lastName')}
              id="lastName"
              placeholder="Nom"
              className="pl-10 rounded-full border-2"
              disabled={isLoading}
            />
          </div>
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message as string}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">
          Nom d'utilisateur <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <Input
            {...register('username')}
            id="username"
            placeholder="nom_utilisateur"
            className={`pl-10 pr-10 rounded-full border-2 ${
              usernameAvailable === true ? 'border-green-500' : 
              usernameAvailable === false ? 'border-red-500' : ''
            }`}
            disabled={isLoading}
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
          <p className="text-red-500 text-sm">{errors.username.message as string}</p>
        )}
        {usernameAvailable === true && (
          <p className="text-green-600 text-sm">✓ Ce nom d'utilisateur est disponible</p>
        )}
        {usernameAvailable === false && (
          <p className="text-red-500 text-sm">✗ Ce nom d'utilisateur est déjà pris</p>
        )}
        <p className="text-gray-500 text-xs">
          3-20 caractères, lettres, chiffres et underscores uniquement
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              {...register('email')}
              id="email"
              type="email"
              placeholder="email@exemple.com"
              className="pl-10 rounded-full border-2"
              disabled={isLoading}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              {...register('phone')}
              id="phone"
              placeholder="+212 6XX XXX XXX"
              className="pl-10 rounded-full border-2"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">
            Mot de passe <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              {...register('password')}
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="8+ caractères"
              className="pl-10 pr-10 rounded-full border-2"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            Confirmation <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
            <Input
              {...register('confirmPassword')}
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmez"
              className="pl-10 pr-10 rounded-full border-2"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              disabled={isLoading}
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword.message as string}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox {...register('acceptTerms')} id="acceptTerms" disabled={isLoading} />
        <Label htmlFor="acceptTerms" className="text-sm">
          J'accepte les{' '}
          <Button
            type="button"
            variant="link"
            className="text-[#ff6600] hover:text-[#ff6600]/80 p-0"
            disabled={isLoading}
          >
            conditions d'utilisation
          </Button>
        </Label>
      </div>
      {errors.acceptTerms && (
        <p className="text-red-500 text-sm">{errors.acceptTerms.message as string}</p>
      )}

      {errors.root && (
        <p className="text-red-500 text-sm text-center">{errors.root.message}</p>
      )}

      <Button
        type="submit"
        className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white rounded-full py-6"
        disabled={isLoading || !usernameAvailable}
      >
        {isLoading ? 'Inscription...' : 'S\'inscrire'}
      </Button>

      <div className="text-center">
        <p className="text-sm">
          Déjà un compte ?{' '}
          <Button
            type="button"
            variant="link"
            onClick={() => onModeChange('signin')}
            className="text-[#ff6600] hover:text-[#ff6600]/80 p-0"
            disabled={isLoading}
          >
            Se connecter
          </Button>
          {' '}ici
        </p>
      </div>
    </form>
  );
};