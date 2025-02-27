import { memo } from 'react';

import { RustImage } from '@/components/shared/rust-image';
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
      <h3 className='mb-3 font-medium'>Sulfur Costs (Lowest to Highest)</h3>
      <div className='space-y-3'>
        {costs.map(cost => {
          if (cost.quantity <= 0) return null;

          return (
            <div
              key={cost.method}
              className='flex items-center gap-3 rounded border border-neutral-800 bg-neutral-900 p-3'
            >
              <div className='flex items-center gap-2'>
                <div className='flex h-10 w-10 items-center justify-center'>
                  <RustImage
                    imageKey={resourceImageKeys[cost.method]}
                    alt={cost.method}
                    width={36}
                    height={36}
                  />
                </div>
                <div className='flex h-6 w-6 items-center justify-center'>
                  <RustImage
                    imageKey={sulfurImageKey}
                    alt='Sulfur'
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div>
                <p className='text-sm font-medium capitalize'>{cost.method}</p>
                <p className='text-xs text-yellow-300'>
                  {cost.quantity.toLocaleString()} sulfur
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default SulfurCosts;
