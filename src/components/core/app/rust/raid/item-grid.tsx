'use client';

import { MinusCircle, PlusCircle } from 'lucide-react';
import { memo, useMemo } from 'react';

import { RustImage } from '@/components/shared/rust-image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getItemsByCategory, useRaidStore } from '@/store/raid';

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
    return (
      <Card className='w-full'>
        <CardContent className='flex flex-col items-center justify-center py-16 text-center'>
          <p className='text-muted-foreground text-lg font-medium'>
            Select a category to view items
          </p>
          <p className='text-muted-foreground mt-2 text-sm'>
            Choose from walls, doors, and more
          </p>
        </CardContent>
      </Card>
    );
  }

  if (items.length === 0) {
    return (
      <Card className='w-full'>
        <CardContent className='py-12 text-center'>
          <p className='text-muted-foreground'>No items in this category</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {items.map(item => {
        const quantity = collectionMap.get(item.id) || 0;

        return (
          <Card
            key={item.id}
            className={cn(
              'group relative overflow-hidden border transition-all duration-200',
              quantity > 0
                ? 'border-primary/30 bg-primary/5'
                : 'border-border bg-card hover:border-border/80'
            )}
          >
            {quantity > 0 && (
              <Badge className='absolute top-2 right-2 z-10'>{quantity}</Badge>
            )}

            <CardContent className='flex flex-col items-center p-3'>
              <div className='bg-background/80 relative mb-2 flex aspect-square w-20 items-center justify-center overflow-hidden rounded-md'>
                <RustImage
                  imageKey={item.imageKey}
                  alt={item.name}
                  className='h-16 w-16 object-contain transition-all duration-200 group-hover:scale-105'
                  width={64}
                  height={64}
                />
              </div>

              <h3 className='mb-3 line-clamp-2 h-10 text-center text-sm font-medium'>
                {item.name}
              </h3>

              <div className='flex w-full items-center justify-between gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  disabled={quantity === 0}
                  className={cn(
                    'h-7 w-7 rounded-full',
                    quantity > 0
                      ? 'border-primary/50 text-primary hover:bg-primary/10'
                      : 'opacity-50'
                  )}
                  onClick={() => removeItem(item)}
                >
                  <MinusCircle className='h-4 w-4' />
                  <span className='sr-only'>Remove {item.name}</span>
                </Button>

                <Button
                  variant='outline'
                  size='icon'
                  className='hover:bg-primary/10 hover:text-primary h-7 w-7 rounded-full'
                  onClick={() => addItem(item)}
                >
                  <PlusCircle className='h-4 w-4' />
                  <span className='sr-only'>Add {item.name}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
});

export default ItemGrid;
