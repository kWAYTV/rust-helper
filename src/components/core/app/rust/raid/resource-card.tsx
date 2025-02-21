'use client';

import Image from 'next/image';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface ResourceCardProps {
  name: string;
  quantity: number;
  icon: string;
}

export default function ResourceCard({
  name,
  quantity,
  icon
}: ResourceCardProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='bg-muted/50 hover:bg-muted flex items-center gap-2 rounded-md p-3 transition-colors'>
            {icon && (
              <div className='relative h-8 w-8 flex-shrink-0'>
                <Image
                  src={icon}
                  alt={name}
                  fill
                  className='object-contain'
                  sizes='32px'
                />
              </div>
            )}
            <div className='flex flex-col'>
              <span className='text-xs'>{name}</span>
              <span className='font-semibold'>{quantity.toLocaleString()}</span>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className='text-xs'>
            <p>
              {name}: {quantity.toLocaleString()}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
