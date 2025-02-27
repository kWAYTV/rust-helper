import { memo } from 'react';

import { RustImage } from '@/components/shared/rust-image';
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
      <h3 className='mb-3 font-medium'>Optimal Raiding Strategy</h3>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
        {(Object.entries(options) as [DestructionMethod, number][]).map(
          ([method, quantity]) => (
            <div
              key={method}
              className='flex items-center gap-3 rounded border border-neutral-800 bg-neutral-900 p-3'
            >
              <div className='flex h-10 w-10 items-center justify-center'>
                <RustImage
                  imageKey={resourceImageKeys[method]}
                  alt={method}
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <p className='text-sm font-medium capitalize'>{method}</p>
                <p className='text-xs text-neutral-400'>{quantity}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
});

export default BestOptions;
