import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Star, Store } from 'lucide-react';

const feedbackSchema = z.object({
  fullName: z.string().min(1, 'Le nom complet est requis'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  message: z.string().min(50, 'Le message doit contenir au moins 50 caractères'),
  rating: z.number().min(1, 'La note est requise').max(5)
});

export const FeedbackPage = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(feedbackSchema)
  });

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Simuler l'envoi du formulaire
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Feedback submitted:', data);
      setSubmitSuccess(true);
      // Réinitialiser le formulaire après 2 secondes
      setTimeout(() => {
        setSubmitSuccess(false);
        setRating(0);
      }, 2000);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (value: number) => {
    setRating(value);
    setValue('rating', value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Bouton Devenir Restaurateur */}
      <div className="container mx-auto px-4 mb-8">
        <Button
          onClick={() => navigate('/restaurant-signup')}
          className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white font-semibold py-3 px-6 rounded-full flex items-center gap-2"
        >
          <Store className="w-5 h-5" />
          Devenir Restaurateur
        </Button>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Donnez-nous votre avis
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Note */}
            <div className="flex flex-col items-center mb-8">
              <Label className="mb-4 text-lg">Votre note</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleRatingClick(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        value <= (hoveredRating || rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="text-red-500 text-sm mt-2">{errors.rating.message as string}</p>
              )}
            </div>

            {/* Nom complet */}
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Nom complet <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register('fullName')}
                id="fullName"
                className="rounded-lg border-2"
                placeholder="Votre nom complet"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName.message as string}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register('email')}
                id="email"
                type="email"
                className="rounded-lg border-2"
                placeholder="votre@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message as string}</p>
              )}
            </div>

            {/* Téléphone */}
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                {...register('phone')}
                id="phone"
                className="rounded-lg border-2"
                placeholder="+212 XXXXXXXXX"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">
                Message <span className="text-red-500">*</span>
              </Label>
              <textarea
                {...register('message')}
                id="message"
                rows={5}
                className="w-full rounded-lg border-2 resize-none focus:ring-2 focus:ring-[#ff6600] focus:border-transparent"
                placeholder="Partagez votre expérience (minimum 50 caractères)"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message as string}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white rounded-full py-6 text-lg font-semibold transition-all ${
                submitSuccess ? 'bg-green-500' : ''
              }`}
            >
              {isSubmitting
                ? 'Envoi en cours...'
                : submitSuccess
                ? 'Merci pour votre avis !'
                : 'Envoyer'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};