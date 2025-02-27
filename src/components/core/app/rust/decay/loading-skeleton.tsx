'use client';

import { memo } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
}

const DecayLoadingSkeleton = memo(function DecayLoadingSkeleton({
  className
}: LoadingSkeletonProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Material Selector Skeleton */}
      <div className='space-y-2'>
        <Skeleton className='h-4 w-24' />
        <div className='flex items-center rounded border p-3'>
          <Skeleton className='h-9 flex-1' />
        </div>
      </div>

      {/* HP Input Skeleton */}
      <div className='space-y-2'>
        <div className='flex justify-between'>
          <Skeleton className='h-4 w-36' />
          <Skeleton className='h-4 w-24' />
        </div>
        <Skeleton className='mb-1 h-4 w-full' />
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <Skeleton className='h-10 w-full' />
          </div>
          <div className='space-y-2'>
            <Skeleton className='h-10 w-full' />
          </div>
        </div>
        <div className='mt-2 flex justify-between'>
          <Skeleton className='h-9 w-20' />
          <Skeleton className='h-9 w-20' />
        </div>
      </div>

      {/* Decay Result Skeleton */}
      <Card>
        <CardContent className='space-y-4 pt-6'>
          <Skeleton className='h-6 w-1/3' />
          <Skeleton className='h-12 w-full' />
          <Skeleton className='h-px w-full' />
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-2/3' />
              <Skeleton className='h-6 w-1/2' />
            </div>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-2/3' />
              <Skeleton className='h-6 w-1/2' />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default DecayLoadingSkeleton;
