import { memo } from 'react';

import { RustImage } from '@/components/shared/rust-image';
import { resourceImageKeys } from '@/constants/raid';
import { type DestructionOptions } from '@/types/rust/raid';

interface RequiredResourcesProps {
  resources: DestructionOptions;
}

const RequiredResources = memo(function RequiredResources({
  resources
}: RequiredResourcesProps) {
  const hasResources = Object.values(resources).some(amount => amount > 0);

  if (!hasResources) {
    return null;
  }

  return (
    <div>
      <h3 className='mb-3 font-medium'>Required Resources</h3>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-4'>
        {(Object.keys(resources) as Array<keyof typeof resources>).map(key => {
          const amount = resources[key];
          if (amount <= 0) return null;

          return (
            <div
              key={key}
              className='border-border bg-card flex items-center gap-3 rounded border p-3'
            >
              <div className='bg-background/80 relative flex aspect-square h-10 w-10 items-center justify-center overflow-hidden rounded'>
                <RustImage
                  imageKey={resourceImageKeys[key]}
                  alt={key}
                  width={32}
                  height={32}
                  className='h-8 w-8'
                />
              </div>
              <div>
                <p className='text-sm font-medium capitalize'>{key}</p>
                <p className='text-muted-foreground text-xs'>{amount}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default RequiredResources;
