'use client';

import { memo } from 'react';

import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
}

const CountdownLoadingSkeleton = memo(function CountdownLoadingSkeleton({
  className
}: LoadingSkeletonProps) {
  return (
    <div className={cn('flex flex-col items-center gap-6', className)}>
      {/* Title skeleton */}
      <div className='flex items-center gap-2 text-center'>
        <Skeleton className='h-5 w-5 rounded-full' />
        <Skeleton className='h-8 w-36' />
      </div>

      {/* Countdown units skeleton */}
      <div className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='flex flex-col items-center gap-2'>
            <Card className='bg-primary/5 border-primary/10 flex h-16 w-16 items-center justify-center sm:h-20 sm:w-20 md:h-24 md:w-24'>
              <Skeleton className='h-8 w-10 sm:h-10 sm:w-12 md:h-12 md:w-14' />
            </Card>
            <Skeleton className='h-4 w-12' />
          </div>
        ))}
      </div>

      {/* Timezone skeleton */}
      <div className='text-center'>
        <Skeleton className='mx-auto mb-2 h-4 w-36' />
        <Skeleton className='mx-auto h-5 w-24' />
      </div>
    </div>
  );
});

export default CountdownLoadingSkeleton;
