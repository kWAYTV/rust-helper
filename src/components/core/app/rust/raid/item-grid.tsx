'use client';

import { useMemo, memo } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { getItemsByCategory, useRaidStore } from '@/store/raid';
import { cn } from '@/lib/utils';
import { RustImage } from '@/components/shared/rust-image';

const ItemGrid = memo(function ItemGrid() {
  const { activeCategory, collection, addItem, removeItem } = useRaidStore();

  const items = useMemo(
    () => getItemsByCategory(activeCategory),
    [activeCategory]
  );

  const collectionMap = useMemo(() => {
    const map = new Map<string, number>();
    collection.forEach(c => {
      map.set(c.item.id, c.quantity);
    });
    return map;
  }, [collection]);

  if (!activeCategory) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className='py-12 text-center'>
        <p className='text-neutral-400'>No items in this category</p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {items.map(item => {
        const quantity = collectionMap.get(item.id) || 0;

        return (
          <Card key={item.id} className='border-neutral-800 bg-neutral-900'>
            <CardContent className='flex flex-col items-center p-4'>
              <div className='relative mb-2 flex h-24 w-24 items-center justify-center'>
                <RustImage
                  imageKey={item.imageKey}
                  alt={item.name}
                  className='h-20 w-20 object-contain'
                />
              </div>

              <h3 className='mt-1 mb-3 flex h-10 items-center text-center text-sm font-medium text-neutral-200'>
                {item.name}
              </h3>

              <div className='flex w-full items-center justify-center gap-2'>
                <button
                  disabled={quantity === 0}
                  className={cn(
                    'flex h-7 w-7 items-center justify-center rounded-sm text-white',
                    quantity > 0
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'cursor-not-allowed bg-neutral-700 opacity-50'
                  )}
                  onClick={() => removeItem(item)}
                >
                  -
                </button>

                <span className='w-6 text-center text-sm font-medium'>
                  {quantity}
                </span>

                <button
                  className='flex h-7 w-7 items-center justify-center rounded-sm bg-neutral-700 text-white hover:bg-neutral-600'
                  onClick={() => addItem(item)}
                >
                  +
                </button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
});

export default ItemGrid;
