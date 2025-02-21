'use client';

import Image from 'next/image';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { RustItem } from '@/types/raid-costs';

interface ItemGridProps {
  items: RustItem[];
  selectedItem: RustItem | null;
  onSelectItem: (item: RustItem) => void;
}

export default function ItemGrid({
  items,
  selectedItem,
  onSelectItem
}: ItemGridProps) {
  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
      {items.map(item => (
        <Card
          key={item.name}
          className={cn(
            'cursor-pointer p-2 transition-all hover:scale-105',
            selectedItem?.name === item.name && 'ring-primary ring-2'
          )}
          onClick={() => onSelectItem(item)}
        >
          <div className='flex flex-col items-center gap-2'>
            <div className='relative h-16 w-16'>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className='object-contain'
                sizes='(max-width: 768px) 64px, 64px'
              />
            </div>
            <span className='text-center text-xs font-medium'>{item.name}</span>
          </div>
        </Card>
      ))}
    </div>
  );
}
