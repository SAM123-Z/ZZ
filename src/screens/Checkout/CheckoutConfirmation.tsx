import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Button } from "../../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Label } from "../../components/ui/label";
import { MapPin, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CheckoutConfirmation = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = React.useState("domicile");
  const [paymentMethod, setPaymentMethod] = React.useState("ligne");
  const [cardType, setCardType] = React.useState("visa");
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculs
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * 0.03; // 3% de remise
  const deliveryFee = 54.08;
  const total = subtotal - discount + deliveryFee;

  const handleSubmitOrder = async () => {
    setIsProcessing(true);

    try {
      // Simuler le traitement de la commande
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Créer l'objet de commande
      const order = {
        items,
        deliveryOption,
        paymentMethod,
        cardType,
        subtotal,
        discount,
        deliveryFee,
        total,
        orderDate: new Date().toISOString(),
        status: 'confirmed',
        deliveryAddress: 'Q972+VPF, Dhaka, Bangladesh'
      };

      // Simuler la sauvegarde de la commande
      console.log('Commande traitée:', order);

      // Vider le panier
      clearCart();

      // Rediriger vers la page de confirmation
      navigate('/order-success', { 
        state: { 
          orderNumber: Math.floor(Math.random() * 1000000),
          total: total
        }
      });

    } catch (error) {
      console.error('Erreur lors du traitement de la commande:', error);
      alert('Une erreur est survenue lors du traitement de votre commande. Veuillez réessayer.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Colonne de gauche - Détails de livraison */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">DÉTAILS DE LIVRAISON</h2>

            {/* Options de livraison */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-4">Options de livraison</h3>
              <RadioGroup
                value={deliveryOption}
                onValueChange={setDeliveryOption}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="domicile" id="domicile" />
                  <Label htmlFor="domicile">Livraison à domicile</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bureau" id="bureau" />
                  <Label htmlFor="bureau">Livraison au bureau</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="campus" id="campus" />
                  <Label htmlFor="campus">Livraison sur campus</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Adresse de livraison */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium">Adresses de livraison</h3>
                <span className="text-[#ff6600] text-sm">Adresse enregistrée</span>
              </div>
              <div className="bg-[#fff3e9] p-4 rounded-lg flex items-start gap-3">
                <MapPin className="text-[#ff6600] mt-1" size={20} />
                <p className="text-gray-700">Q972+VPF, Dhaka, Bangladesh</p>
              </div>
            </div>

            {/* Informations Complémentaires */}
            <div>
              <h3 className="text-sm font-medium mb-2 flex justify-between items-center">
                Informations Complémentaires
                <span>▼</span>
              </h3>
            </div>
          </div>

          {/* Options de paiement */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-sm font-medium mb-4">Options de paiement</h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="flex gap-4 mb-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ligne" id="ligne" />
                <Label htmlFor="ligne">paiement en ligne</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hors-ligne" id="hors-ligne" />
                <Label htmlFor="hors-ligne">paiement hors ligne</Label>
              </div>
            </RadioGroup>

            <h3 className="text-sm font-medium mb-4">choix de la carte</h3>
            <RadioGroup
              value={cardType}
              onValueChange={setCardType}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="visa" id="visa" />
                <Label htmlFor="visa">Visa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="mastercard" id="mastercard" />
                <Label htmlFor="mastercard">MasterCard</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Colonne de droite - Résumé de la commande */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Résumé De La Commande</h2>

          {/* Articles */}
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 mb-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Variation : {item.variation || "Taille( Petit )"}
                </p>
                <p className="text-sm text-gray-600">Quantité : {item.quantity}</p>
                <p className="text-[#ff6600] font-medium">
                  {(item.price * item.quantity).toFixed(2)} Dh
                </p>
              </div>
            </div>
          ))}

          {/* Calculs */}
          <div className="space-y-3 mt-6 pt-6 border-t">
            <div className="flex justify-between">
              <span>Total</span>
              <span>{subtotal.toFixed(2)} Dh</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Rabais</span>
              <span>(-) {discount.toFixed(2)} Dh</span>
            </div>
            <div className="flex justify-between">
              <span className="flex items-center">
                Frais de livraison
                <span className="ml-1 text-xs">ℹ</span>
              </span>
              <span>(+) {deliveryFee.toFixed(2)} Dh</span>
            </div>
            <div className="flex justify-between text-[#ff6600] font-medium pt-3 border-t">
              <span>Total</span>
              <span>{total.toFixed(2)} Dh</span>
            </div>
          </div>

          {/* Bouton de commande */}
          <Button
            className="w-full mt-6 bg-[#ff6600] hover:bg-[#ff6600]/90 text-white py-3 rounded-lg"
            onClick={handleSubmitOrder}
            disabled={isProcessing || items.length === 0}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Traitement en cours...
              </div>
            ) : (
              'Passer une commande'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};