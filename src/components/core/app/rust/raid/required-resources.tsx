import { memo } from 'react';

import { RustImage } from '@/components/shared/rust-image';
import { resourceImageKeys } from '@/constants/raid';
import { DestructionOptions } from '@/types/rust/raid';

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
              className='flex items-center gap-3 rounded border border-neutral-800 bg-neutral-900 p-3'
            >
              <div className='flex h-10 w-10 items-center justify-center'>
                <RustImage
                  imageKey={resourceImageKeys[key]}
                  alt={key}
                  width={36}
                  height={36}
                />
              </div>
              <div>
                <p className='text-sm font-medium capitalize'>{key}</p>
                <p className='text-xs text-neutral-400'>{amount}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default RequiredResources;
