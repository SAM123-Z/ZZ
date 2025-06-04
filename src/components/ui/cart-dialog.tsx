import React from "react";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { Button } from "./button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../context/CartContext";

interface CartDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export function CartDialog({
  open,
  onOpenChange,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDialogProps) {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onOpenChange(false);
    navigate('/checkout');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Votre Panier</DialogTitle>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {items.length} article{items.length !== 1 ? 's' : ''} dans votre panier
            </h2>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-auto pr-2">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4 py-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  {item.variation && (
                    <p className="text-sm text-gray-600">
                      Variation : {item.variation}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-auto text-red-500 hover:text-red-700"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-[#ff6600] font-medium mt-2">
                    {(item.price * item.quantity).toFixed(2)} Dh
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-medium mb-4">
              <span>Prix total</span>
              <span>{total.toFixed(2)} Dh</span>
            </div>
            <Button
              className="w-full bg-[#ff6600] hover:bg-[#ff6600]/90 text-white"
              onClick={handleCheckout}
            >
              Passer à la caisse
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}