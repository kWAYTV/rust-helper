'use client';

import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { type Dispatch, type SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { RaidMethod, RustItem } from '@/types/raid-costs';

interface ItemSelectorProps {
  item: RustItem;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
  selectedMethod: RaidMethod;
  setSelectedMethod: (method: RaidMethod) => void;
  addToCart: () => void;
}

export default function ItemSelector({
  item,
  quantity,
  setQuantity,
  selectedMethod,
  setSelectedMethod,
  addToCart
}: ItemSelectorProps) {
  return (
    <>
      <div className='flex items-center gap-3'>
        <div className='relative h-12 w-12 flex-shrink-0'>
          <Image
            src={item.image}
            alt={item.name}
            fill
            className='object-contain'
            sizes='48px'
          />
        </div>
        <div>
          <h3 className='font-medium'>{item.name}</h3>
          <p className='text-muted-foreground text-xs'>{item.category}</p>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <div>
          <label className='mb-1 block text-sm font-medium'>Quantity</label>
          <Input
            type='number'
            min='1'
            value={quantity}
            onChange={e =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium'>Method</label>
          <select
            className='border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none'
            value={selectedMethod}
            onChange={e => setSelectedMethod(e.target.value as RaidMethod)}
          >
            <option value='c4'>C4</option>
            <option value='rockets'>Rockets</option>
            <option value='satchel'>Satchel</option>
            <option value='bullets'>Bullets</option>
          </select>
        </div>
      </div>

      <Button className='w-full' onClick={addToCart} size='sm'>
        <PlusCircle className='mr-2 h-4 w-4' />
        Add to Raid Plan
      </Button>
    </>
  );
}
