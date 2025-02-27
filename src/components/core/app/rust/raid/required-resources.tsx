import { Info } from 'lucide-react';
import { memo } from 'react';

import { RustImage } from '@/components/shared/rust-image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
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
      <div className='mb-3 flex items-center gap-2'>
        <h3 className='font-medium'>Required Resources</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className='text-muted-foreground h-4 w-4' />
            </TooltipTrigger>
            <TooltipContent side='top'>
              <p>
                Choose any one of these methods to raid your selected structures
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Card className='relative p-4'>
        <Badge
          variant='outline'
          className='bg-background absolute -top-2 right-3'
        >
          Choose one method
        </Badge>

        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
          {(Object.keys(resources) as Array<keyof typeof resources>).map(
            key => {
              const amount = resources[key];
              if (amount <= 0) return null;

              return (
                <div key={key}>
                  <div className='border-border bg-card flex items-center gap-3 rounded border p-3'>
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
                </div>
              );
            }
          )}
        </div>
      </Card>
    </div>
  );
});

export default RequiredResources;
