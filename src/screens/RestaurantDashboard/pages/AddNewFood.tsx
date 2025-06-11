import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Checkbox } from '../../../components/ui/checkbox';
import { Badge } from '../../../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { 
  Upload, 
  Plus, 
  X, 
  ImageIcon, 
  DollarSign, 
  Clock, 
  Users, 
  Utensils,
  AlertCircle,
  CheckCircle,
  Star,
  Flame,
  Leaf,
  Wheat,
  Milk,
  Fish,
  Egg,
  Nut
} from 'lucide-react';

const foodSchema = z.object({
  name: z.string().min(1, 'Le nom du plat est requis'),
  shortDescription: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  longDescription: z.string().optional(),
  category: z.string().min(1, 'La catégorie est requise'),
  foodType: z.string().min(1, 'Le type de plat est requis'),
  price: z.number().min(0.01, 'Le prix doit être supérieur à 0'),
  discountPrice: z.number().optional(),
  preparationTime: z.number().min(1, 'Le temps de préparation est requis'),
  servingSize: z.number().min(1, 'La taille de portion est requise'),
  calories: z.number().optional(),
  spicyLevel: z.number().min(0).max(3).optional(),
  isVegetarian: z.boolean().optional(),
  isVegan: z.boolean().optional(),
  isGlutenFree: z.boolean().optional(),
  isDairyFree: z.boolean().optional(),
  isAvailable: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  allergens: z.array(z.string()).optional(),
  ingredients: z.array(z.string()).optional(),
});

const categories = [
  'Entrées',
  'Plats principaux', 
  'Desserts',
  'Boissons',
  'Salades',
  'Pizzas',
  'Burgers',
  'Pâtes',
  'Soupes',
  'Snacks'
];

const foodTypes = [
  'Végétarien',
  'Vegan',
  'Sans gluten',
  'Sans lactose',
  'Halal',
  'Casher',
  'Bio',
  'Fait maison',
  'Épicé',
  'Populaire'
];

const allergensList = [
  { id: 'gluten', name: 'Gluten', icon: <Wheat className="w-4 h-4" /> },
  { id: 'dairy', name: 'Produits laitiers', icon: <Milk className="w-4 h-4" /> },
  { id: 'eggs', name: 'Œufs', icon: <Egg className="w-4 h-4" /> },
  { id: 'fish', name: 'Poisson', icon: <Fish className="w-4 h-4" /> },
  { id: 'nuts', name: 'Fruits à coque', icon: <Nut className="w-4 h-4" /> },
  { id: 'soy', name: 'Soja', icon: <Leaf className="w-4 h-4" /> },
];

const spicyLevels = [
  { value: 0, label: 'Pas épicé', icon: '😊' },
  { value: 1, label: 'Légèrement épicé', icon: '🌶️' },
  { value: 2, label: 'Moyennement épicé', icon: '🌶️🌶️' },
  { value: 3, label: 'Très épicé', icon: '🌶️🌶️🌶️' },
];

export const AddNewFood = () => {
  const [foodImage, setFoodImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    resolver: zodResolver(foodSchema),
    defaultValues: {
      isAvailable: true,
      isFeatured: false,
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
      isDairyFree: false,
      spicyLevel: 0,
      servingSize: 1,
    }
  });

  const watchedPrice = watch('price');
  const watchedDiscountPrice = watch('discountPrice');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoodImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !customTags.includes(newTag.trim())) {
      const updatedTags = [...customTags, newTag.trim()];
      setCustomTags(updatedTags);
      setValue('tags', updatedTags);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const updatedTags = customTags.filter(tag => tag !== tagToRemove);
    setCustomTags(updatedTags);
    setValue('tags', updatedTags);
  };

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      const updatedIngredients = [...ingredients, newIngredient.trim()];
      setIngredients(updatedIngredients);
      setValue('ingredients', updatedIngredients);
      setNewIngredient('');
    }
  };

  const removeIngredient = (ingredientToRemove: string) => {
    const updatedIngredients = ingredients.filter(ingredient => ingredient !== ingredientToRemove);
    setIngredients(updatedIngredients);
    setValue('ingredients', updatedIngredients);
  };

  const toggleAllergen = (allergenId: string) => {
    const updatedAllergens = selectedAllergens.includes(allergenId)
      ? selectedAllergens.filter(id => id !== allergenId)
      : [...selectedAllergens, allergenId];
    setSelectedAllergens(updatedAllergens);
    setValue('allergens', updatedAllergens);
  };

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      
      // Simuler l'envoi des données
      const formData = {
        ...data,
        image: foodImage,
        tags: customTags,
        allergens: selectedAllergens,
        ingredients: ingredients,
      };
      
      console.log('Données du nouveau plat:', formData);
      
      // Simuler un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitSuccess(true);
      
      // Réinitialiser le formulaire après succès
      setTimeout(() => {
        setSubmitSuccess(false);
        reset();
        setFoodImage(null);
        setImagePreview(null);
        setCustomTags([]);
        setSelectedAllergens([]);
        setIngredients([]);
      }, 3000);
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout du plat:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center py-12">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Plat ajouté avec succès !</h2>
          <p className="text-gray-600 mb-6">Votre nouveau plat a été ajouté au menu et est maintenant disponible pour les commandes.</p>
          <Button 
            onClick={() => setSubmitSuccess(false)}
            className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
          >
            Ajouter un autre plat
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-[#ff6600] rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Add New Food</h1>
          </div>
          <p className="text-gray-600">Ajoutez un nouveau plat à votre menu avec tous les détails nécessaires</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Colonne 1: Informations de base */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Informations générales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-[#ff6600]" />
                    Informations générales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Nom du plat <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      {...register('name')}
                      id="name"
                      placeholder="Ex: Pizza Margherita"
                      className="h-12 rounded-lg border-2"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">
                      Description courte <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      {...register('shortDescription')}
                      id="shortDescription"
                      placeholder="Description qui apparaîtra sur le menu (max 100 caractères)"
                      className="rounded-lg border-2 resize-none"
                      rows={3}
                    />
                    {errors.shortDescription && (
                      <p className="text-red-500 text-sm">{errors.shortDescription.message as string}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longDescription">Description détaillée</Label>
                    <Textarea
                      {...register('longDescription')}
                      id="longDescription"
                      placeholder="Description complète avec tous les détails"
                      className="rounded-lg border-2 resize-none"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Catégorie et type */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#ff6600]" />
                    Category Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Catégorie <span className="text-red-500">*</span>
                      </Label>
                      <Select onValueChange={(value) => setValue('category', value)}>
                        <SelectTrigger className="h-12 rounded-lg border-2">
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-red-500 text-sm">{errors.category.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="foodType">
                        Food Type <span className="text-red-500">*</span>
                      </Label>
                      <Select onValueChange={(value) => setValue('foodType', value)}>
                        <SelectTrigger className="h-12 rounded-lg border-2">
                          <SelectValue placeholder="Select Preferences" />
                        </SelectTrigger>
                        <SelectContent>
                          {foodTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.foodType && (
                        <p className="text-red-500 text-sm">{errors.foodType.message as string}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Prix et détails */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#ff6600]" />
                    Prix et détails
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">
                        Prix (€) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        {...register('price', { valueAsNumber: true })}
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="12.99"
                        className="h-12 rounded-lg border-2"
                      />
                      {errors.price && (
                        <p className="text-red-500 text-sm">{errors.price.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="discountPrice">Prix réduit (€)</Label>
                      <Input
                        {...register('discountPrice', { valueAsNumber: true })}
                        id="discountPrice"
                        type="number"
                        step="0.01"
                        placeholder="9.99"
                        className="h-12 rounded-lg border-2"
                      />
                      {watchedDiscountPrice && watchedPrice && watchedDiscountPrice >= watchedPrice && (
                        <p className="text-red-500 text-sm">Le prix réduit doit être inférieur au prix normal</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preparationTime">
                        Temps de préparation (min) <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        {...register('preparationTime', { valueAsNumber: true })}
                        id="preparationTime"
                        type="number"
                        placeholder="15"
                        className="h-12 rounded-lg border-2"
                      />
                      {errors.preparationTime && (
                        <p className="text-red-500 text-sm">{errors.preparationTime.message as string}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="servingSize">
                        Taille de portion <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        {...register('servingSize', { valueAsNumber: true })}
                        id="servingSize"
                        type="number"
                        placeholder="1"
                        className="h-12 rounded-lg border-2"
                      />
                      {errors.servingSize && (
                        <p className="text-red-500 text-sm">{errors.servingSize.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="calories">Calories (optionnel)</Label>
                      <Input
                        {...register('calories', { valueAsNumber: true })}
                        id="calories"
                        type="number"
                        placeholder="350"
                        className="h-12 rounded-lg border-2"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Niveau d'épice */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-[#ff6600]" />
                    Niveau d'épice
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {spicyLevels.map((level) => (
                      <label
                        key={level.value}
                        className="flex items-center space-x-2 cursor-pointer p-3 border-2 rounded-lg hover:border-[#ff6600] transition-colors"
                      >
                        <input
                          {...register('spicyLevel', { valueAsNumber: true })}
                          type="radio"
                          value={level.value}
                          className="text-[#ff6600]"
                        />
                        <div className="text-center">
                          <div className="text-lg mb-1">{level.icon}</div>
                          <span className="text-xs font-medium">{level.label}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Allergènes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-[#ff6600]" />
                    Allergènes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {allergensList.map((allergen) => (
                      <label
                        key={allergen.id}
                        className="flex items-center space-x-3 cursor-pointer p-3 border-2 rounded-lg hover:border-[#ff6600] transition-colors"
                      >
                        <Checkbox
                          checked={selectedAllergens.includes(allergen.id)}
                          onCheckedChange={() => toggleAllergen(allergen.id)}
                        />
                        {allergen.icon}
                        <span className="text-sm font-medium">{allergen.name}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tags personnalisés */}
              <Card>
                <CardHeader>
                  <CardTitle>Tags personnalisés</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Ajouter un tag"
                      className="flex-1 h-10 rounded-lg border-2"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    />
                    <Button
                      type="button"
                      onClick={addTag}
                      className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {customTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {customTags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-[#ff6600]/10 text-[#ff6600] border-[#ff6600]/20 px-3 py-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Ingrédients */}
              <Card>
                <CardHeader>
                  <CardTitle>Ingrédients</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                      placeholder="Ajouter un ingrédient"
                      className="flex-1 h-10 rounded-lg border-2"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIngredient())}
                    />
                    <Button
                      type="button"
                      onClick={addIngredient}
                      className="bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {ingredients.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map((ingredient, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 px-3 py-1"
                        >
                          {ingredient}
                          <button
                            type="button"
                            onClick={() => removeIngredient(ingredient)}
                            className="ml-2 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Colonne 2: Image et options */}
            <div className="space-y-6">
              
              {/* Upload d'image */}
              <Card>
                <CardHeader>
                  <CardTitle>Food Image</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#ff6600] transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                        id="foodImage"
                      />
                      <label htmlFor="foodImage" className="cursor-pointer">
                        {imagePreview ? (
                          <div className="space-y-3">
                            <img
                              src={imagePreview}
                              alt="Aperçu"
                              className="w-full h-48 object-cover rounded-lg"
                            />
                            <p className="text-sm text-[#ff6600] font-medium">
                              Cliquez pour changer l'image
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium text-gray-700">Upload Image</p>
                              <p className="text-xs text-gray-500 mt-1">
                                Image format - jpg png jpeg gif<br />
                                Image Size - maximum size 2 MB<br />
                                Image Ratio - 1:1
                              </p>
                            </div>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Options de disponibilité */}
              <Card>
                <CardHeader>
                  <CardTitle>Options de disponibilité</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <Checkbox {...register('isAvailable')} defaultChecked />
                      <span className="text-sm font-medium">Disponible</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <Checkbox {...register('isFeatured')} />
                      <span className="text-sm font-medium">Plat vedette</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <Checkbox {...register('isVegetarian')} />
                      <span className="text-sm font-medium">Végétarien</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <Checkbox {...register('isVegan')} />
                      <span className="text-sm font-medium">Vegan</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <Checkbox {...register('isGlutenFree')} />
                      <span className="text-sm font-medium">Sans gluten</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <Checkbox {...register('isDairyFree')} />
                      <span className="text-sm font-medium">Sans lactose</span>
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Aperçu du prix */}
              {watchedPrice && (
                <Card>
                  <CardHeader>
                    <CardTitle>Aperçu du prix</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      {watchedDiscountPrice && watchedDiscountPrice < watchedPrice ? (
                        <div>
                          <span className="text-2xl font-bold text-[#ff6600]">
                            {watchedDiscountPrice.toFixed(2)}€
                          </span>
                          <span className="text-lg text-gray-500 line-through ml-2">
                            {watchedPrice.toFixed(2)}€
                          </span>
                          <div className="text-sm text-green-600 font-medium">
                            Économie: {(watchedPrice - watchedDiscountPrice).toFixed(2)}€
                          </div>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-[#ff6600]">
                          {watchedPrice.toFixed(2)}€
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              className="px-8 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => reset()}
            >
              Réinitialiser
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Ajout en cours...
                </div>
              ) : (
                'Ajouter le plat'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};