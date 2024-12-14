import React, { useState } from 'react';
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
  onBuy: (quantity: number) => void; // Callback with quantity
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  price,
  quantity,
  onBuy,
}) => {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Handle buy action
  const handleBuy = () => {
    onBuy(selectedQuantity); // Call the parent function with selected quantity
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

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">Qty: {Number(quantity)}</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default">Buy</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Enter Quantity</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="quantity" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min={1}
                    max={quantity}
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(Number(e.target.value))}
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
                  <Button type="button" onClick={handleBuy}>
                    Confirm Buy
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
