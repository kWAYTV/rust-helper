'use client';

import { ChevronDown, Cog } from 'lucide-react';

export function EmptyState() {
  return (
    <div className='py-8 text-center'>
      <div className='space-y-4'>
        <div className='bg-muted/50 mx-auto flex h-16 w-16 items-center justify-center rounded-full'>
          <Cog className='text-muted-foreground h-8 w-8' />
        </div>
        <div>
          <h3 className='mb-1 text-lg font-medium'>Choose an Operation</h3>
          <p className='text-muted-foreground text-sm'>
            Select an operation type above to start calculating resource yields
          </p>
        </div>
        <div>
          <ChevronDown className='text-muted-foreground/50 mx-auto h-6 w-6' />
        </div>
      </div>
    </div>
  );
}
