'use client';

import { Trash2 } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import type { RaidMethod, RustItem } from '@/types/raid-costs';

interface CartItemListProps {
  items: {
    item: RustItem;
    quantity: number;
    method: RaidMethod;
  }[];
  onRemove: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onUpdateMethod: (index: number, method: RaidMethod) => void;
}

export default function CartItemList({
  items,
  onRemove,
  onUpdateQuantity,
  onUpdateMethod
}: CartItemListProps) {
  return (
    <div className='max-h-[250px] space-y-2 overflow-y-auto pr-1'>
      {items.map((cartItem, index) => (
        <Card key={index} className='p-2'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <div className='relative h-8 w-8 flex-shrink-0'>
                <Image
                  src={cartItem.item.image}
                  alt={cartItem.item.name}
                  fill
                  className='object-contain'
                  sizes='32px'
                />
              </div>
              <div>
                <p className='text-sm font-medium'>{cartItem.item.name}</p>
                <div className='flex items-center gap-2'>
                  <select
                    className='h-5 border-none bg-transparent p-0 text-xs'
                    value={cartItem.method}
                    onChange={e =>
                      onUpdateMethod(index, e.target.value as RaidMethod)
                    }
                  >
                    <option value='c4'>C4</option>
                    <option value='rockets'>Rockets</option>
                    <option value='satchel'>Satchel</option>
                    <option value='bullets'>Bullets</option>
                  </select>
                  <span className='text-xs'>×</span>
                  <Input
                    type='number'
                    min='1'
                    value={cartItem.quantity}
                    onChange={e =>
                      onUpdateQuantity(index, parseInt(e.target.value) || 1)
                    }
                    className='h-5 w-12 p-0 pl-1 text-xs'
                  />
                </div>
              </div>
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='h-6 w-6'
              onClick={() => onRemove(index)}
            >
              <Trash2 className='text-muted-foreground h-4 w-4' />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
