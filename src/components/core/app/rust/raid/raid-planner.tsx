'use client';

import { type Dispatch, type SetStateAction } from 'react';

import CartItemList from '@/components/core/app/rust/raid/cart-item-list';
import ItemSelector from '@/components/core/app/rust/raid/item-selector';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import type { RaidMethod, RustItem } from '@/types/raid-costs';

interface RaidPlannerProps {
  selectedItem: RustItem | null;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  selectedMethod: RaidMethod;
  setSelectedMethod: (method: RaidMethod) => void;
  addToCart: () => void;
  cartItems: {
    item: RustItem;
    quantity: number;
    method: RaidMethod;
  }[];
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  updateMethod: (index: number, method: RaidMethod) => void;
}

export default function RaidPlanner({
  selectedItem,
  quantity,
  setQuantity,
  selectedMethod,
  setSelectedMethod,
  addToCart,
  cartItems,
  removeItem,
  updateQuantity,
  updateMethod
}: RaidPlannerProps) {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle className='text-center'>Raid Plan</CardTitle>
      </CardHeader>
      <CardContent>
        {selectedItem ? (
          <div className='space-y-4'>
            <ItemSelector
              item={selectedItem}
              quantity={quantity}
              setQuantity={setQuantity}
              selectedMethod={selectedMethod}
              setSelectedMethod={setSelectedMethod}
              addToCart={addToCart}
            />
          </div>
        ) : (
          <p className='text-muted-foreground text-center'>
            Select an item to add to your raid plan
          </p>
        )}

        {cartItems.length > 0 && (
          <>
            <Separator className='my-4' />

            <div className='space-y-3'>
              <h3 className='font-medium'>Raid Items:</h3>

              <CartItemList
                items={cartItems}
                onRemove={removeItem}
                onUpdateQuantity={updateQuantity}
                onUpdateMethod={updateMethod}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
