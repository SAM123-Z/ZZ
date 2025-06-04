import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const signInSchema = z.object({
  emailOrUsername: z.string().min(1, 'Email/Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional()
});

interface SignInFormProps {
  onModeChange: (mode: 'signin' | 'signup') => void;
  onClose: () => void;
}

export const SignInForm = ({ onModeChange, onClose }: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await signIn({
        emailOrUsername: data.emailOrUsername,
        password: data.password
      });
      onClose();
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Invalid credentials'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="emailOrUsername">
          Email/Username <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <Input
            {...register('emailOrUsername')}
            id="emailOrUsername"
            placeholder="Email/Username"
            className="pl-10 rounded-full border-2"
            disabled={isLoading}
          />
        </div>
        {errors.emailOrUsername && (
          <p className="text-red-500 text-sm">{errors.emailOrUsername.message as string}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">
          Password <span className="text-red-500">*</span>
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <Input
            {...register('password')}
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="8+Password"
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

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox {...register('rememberMe')} id="rememberMe" disabled={isLoading} />
          <Label htmlFor="rememberMe" className="text-sm">Remember me</Label>
        </div>
        <Button
          type="button"
          variant="link"
          className="text-[#ff6600] hover:text-[#ff6600]/80 p-0"
          disabled={isLoading}
        >
          Forgot password?
        </Button>
      </div>

      {errors.root && (
        <p className="text-red-500 text-sm text-center">{errors.root.message}</p>
      )}

      <Button
        type="submit"
        className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white rounded-full py-6"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>

      <div className="text-center">
        <p className="text-sm">
          Don't have an account?{' '}
          <Button
            type="button"
            variant="link"
            onClick={() => onModeChange('signup')}
            className="text-[#ff6600] hover:text-[#ff6600]/80 p-0"
            disabled={isLoading}
          >
            Sign up
          </Button>
          {' '}Here
        </p>
      </div>
    </form>
  );
};