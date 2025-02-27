'use client';

import { memo } from 'react';

import { RustImage } from '@/components/shared/rust-image';
import { Button } from '@/components/ui/button';
import { useRaidStore } from '@/store/raid';
import { type CollectionItem } from '@/types/rust/raid';

interface CollectionListProps {
  collection: CollectionItem[];
}

const CollectionList = memo(function CollectionList({
  collection
}: CollectionListProps) {
  const { removeItem } = useRaidStore();

  return (
    <div className='space-y-2'>
      {collection.map(c => (
        <div
          key={c.item.id}
          className='border-border bg-card flex items-center justify-between rounded border p-3'
        >
          <div className='flex items-center gap-3'>
            <div className='bg-background/80 relative flex aspect-square h-10 w-10 items-center justify-center overflow-hidden rounded'>
              <RustImage
                imageKey={c.item.imageKey}
                alt={c.item.name}
                width={32}
                height={32}
                className='h-8 w-8'
              />
            </div>
            <div>
              <p className='text-sm font-medium'>{c.item.name}</p>
              <p className='text-muted-foreground text-xs'>
                Quantity: {c.quantity}
              </p>
            </div>
          </div>

          <Button
            size='sm'
            variant='ghost'
            className='text-muted-foreground hover:bg-destructive/10 hover:text-destructive h-8 w-8 rounded-sm p-0'
            onClick={() => removeItem(c.item)}
          >
            <RemoveIcon className='h-4 w-4' />
            <span className='sr-only'>Remove</span>
          </Button>
        </div>
      ))}
    </div>
  );
});

function RemoveIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <line x1='18' y1='6' x2='6' y2='18'></line>
      <line x1='6' y1='6' x2='18' y2='18'></line>
    </svg>
  );
}

export default CollectionList;
