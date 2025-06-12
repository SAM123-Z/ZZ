import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Upload, CheckCircle, Palette } from 'lucide-react';

const categorySchema = z.object({
  name: z.string().min(1, 'Le nom de la catégorie est requis'),
});

export const NewCategory = () => {
  const [categoryImage, setCategoryImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(categorySchema)
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCategoryImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      // Simuler l'envoi des données
      const formData = {
        ...data,
        image: categoryImage,
      };
      
      console.log('Données de la nouvelle catégorie:', formData);
      
      // Simuler un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      
      // Réinitialiser le formulaire après succès
      setTimeout(() => {
        setSubmitSuccess(false);
        reset();
        setCategoryImage(null);
        setImagePreview(null);
      }, 3000);
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setCategoryImage(null);
    setImagePreview(null);
  };

  if (submitSuccess) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Catégorie ajoutée avec succès !</h2>
          <p className="text-gray-600 mb-6">Votre nouvelle catégorie a été créée et est maintenant disponible.</p>
          <Button 
            onClick={() => setSubmitSuccess(false)}
            className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
          >
            Ajouter une autre catégorie
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      {/* Header avec icône colorée */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">New Category</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Colonne gauche - Nom de la catégorie */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-base font-medium text-gray-700">
                Name
              </Label>
              <Input
                {...register('name')}
                id="name"
                placeholder="Ex: Category Name"
                className="h-12 rounded-lg border-2 text-base placeholder:text-gray-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message as string}</p>
              )}
            </div>
          </div>

          {/* Colonne droite - Upload d'image */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-medium text-gray-700">
                Category image
              </Label>
              
              {/* Zone d'upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-[#ff6600] transition-colors bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  id="categoryImage"
                />
                <label htmlFor="categoryImage" className="cursor-pointer">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Aperçu"
                        className="w-24 h-24 object-cover rounded-lg mx-auto"
                      />
                      <p className="text-sm text-[#ff6600] font-medium">
                        Cliquez pour changer l'image
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-base font-medium text-gray-600 mb-2">Upload Image</p>
                        <div className="space-y-1 text-sm text-gray-500">
                          <p>Image format - jpg png jpeg gif</p>
                          <p>Image Size - maximum size 2 MB</p>
                          <p>Image Ratio - 1:1</p>
                        </div>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="flex justify-end gap-4 pt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="px-8 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg"
            disabled={isSubmitting}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Ajout en cours...
              </div>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};