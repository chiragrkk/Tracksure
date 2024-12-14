import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '@components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@components/ui/dialog';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Card, CardContent } from '@components/ui/card';

interface ProductCardProps {
  name: string;
  image: string;
  price: number;
  quantity: number;
  onSave: (quantity: number, price: number) => void;
  onRemove: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  quantity,
  onSave,
  onRemove,
}) => {
  const [editedPrice, setEditedPrice] = useState(price);
  const [editedQuantity, setEditedQuantity] = useState(quantity);

  // handle save and trigger onSave callback
  const handleSave = () => {
    onSave(editedQuantity, editedPrice);  // Save the edited values
  };

  return (
    <Card className="w-full max-w-xs">
      <CardContent className="p-2 relative">
        <div className="aspect-square relative mb-2">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover rounded-md"
          />
        </div>
        <h3 className="text-sm font-semibold mb-1">{name}</h3>
        <p className="text-base font-bold mb-2">₹{price.toFixed(2)}</p>

        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-semibold">Qty: {Number(quantity)}</span>

          <div className="flex items-center space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <Edit2 className="h-3 w-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Product Details</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={editedPrice}
                      onChange={(e) => setEditedPrice(Number(e.target.value))}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quantity" className="text-right">
                      Quantity
                    </Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={editedQuantity}
                      onChange={(e) => setEditedQuantity(Number(e.target.value))}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button" onClick={handleSave}>
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={onRemove}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
