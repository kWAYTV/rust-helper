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
import { resourceImageKeys, sulfurImageKey } from '@/constants/raid';
import { type SulfurCost } from '@/types/rust/raid';

interface SulfurCostsProps {
  costs: SulfurCost[];
}

const SulfurCosts = memo(function SulfurCosts({ costs }: SulfurCostsProps) {
  if (costs.length === 0 || costs.every(cost => cost.quantity === 0)) {
    return null;
  }

  return (
    <div>
      <div className='mb-3 flex items-center gap-2'>
        <h3 className='font-medium'>Sulfur Costs (Lowest to Highest)</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className='text-muted-foreground h-4 w-4' />
            </TooltipTrigger>
            <TooltipContent side='top'>
              <p>All methods ranked by sulfur efficiency</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className='p-4'>
        <div className='space-y-3'>
          {costs.map(cost => {
            if (cost.quantity <= 0) return null;

            return (
              <div
                key={cost.method}
                className='border-border bg-card flex items-center gap-3 rounded border p-3'
              >
                <div className='flex items-center gap-2'>
                  <div className='bg-background/80 relative flex aspect-square h-10 w-10 items-center justify-center overflow-hidden rounded'>
                    <RustImage
                      imageKey={resourceImageKeys[cost.method]}
                      alt={cost.method}
                      width={32}
                      height={32}
                      className='h-8 w-8'
                    />
                  </div>
                  <div className='bg-background/80 relative flex aspect-square h-6 w-6 items-center justify-center overflow-hidden rounded'>
                    <RustImage
                      imageKey={sulfurImageKey}
                      alt='Sulfur'
                      width={18}
                      height={18}
                      className='h-5 w-5'
                    />
                  </div>
                </div>
                <div>
                  <p className='text-sm font-medium capitalize'>
                    {cost.method}
                  </p>
                  <p className='text-xs text-yellow-400'>
                    {cost.quantity.toLocaleString()} sulfur
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
});

export default SulfurCosts;
