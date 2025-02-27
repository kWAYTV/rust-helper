'use client';

import { Info } from 'lucide-react';
import { memo } from 'react';

import { RustImage } from '@/components/shared/rust-image';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { resourceImageKeys } from '@/constants/raid';
import { type DestructionMethod } from '@/types/rust/raid';

interface BestOptionsProps {
  options: Partial<Record<DestructionMethod, number>>;
}

const BestOptions = memo(function BestOptions({ options }: BestOptionsProps) {
  if (Object.keys(options).length === 0) {
    return null;
  }

  return (
    <div>
      <div className='mb-3 flex items-center gap-2'>
        <h3 className='font-medium'>Optimal Raiding Strategy</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className='text-muted-foreground h-4 w-4' />
            </TooltipTrigger>
            <TooltipContent side='top'>
              <p>The most efficient combination of raid tools</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className='p-4'>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
          {(Object.entries(options) as [DestructionMethod, number][]).map(
            ([method, quantity]) => (
              <div
                key={method}
                className='border-border bg-card flex items-center gap-3 rounded border p-3'
              >
                <div className='bg-background/80 relative flex aspect-square h-10 w-10 items-center justify-center overflow-hidden rounded'>
                  <RustImage
                    imageKey={resourceImageKeys[method]}
                    alt={method}
                    width={32}
                    height={32}
                    className='h-8 w-8'
                  />
                </div>
                <div>
                  <p className='text-sm font-medium capitalize'>{method}</p>
                  <p className='text-muted-foreground text-xs'>{quantity}</p>
                </div>
              </div>
            )
          )}
        </div>
      </Card>
    </div>
  );
});

export default BestOptions;
