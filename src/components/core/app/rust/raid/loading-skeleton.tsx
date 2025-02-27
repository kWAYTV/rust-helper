'use client';

import { memo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  className?: string;
}

const RaidLoadingSkeleton = memo(function RaidLoadingSkeleton({
  className
}: LoadingSkeletonProps) {
  return (
    <div className={className}>
      {/* Category Buttons Skeleton */}
      <div className='mb-6 flex flex-wrap justify-center gap-2 sm:justify-start'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className='h-10 w-24 sm:w-28' />
        ))}
      </div>

      {/* Item Grid Skeleton */}
      <Card className='mb-6'>
        <CardContent className='p-4'>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className='flex flex-col gap-2 p-2'>
                <div className='flex items-center gap-2'>
                  <Skeleton className='h-12 w-12 rounded-md' />
                  <div className='flex-1'>
                    <Skeleton className='mb-1 h-4 w-20' />
                    <Skeleton className='h-3 w-16' />
                  </div>
                </div>
                <div className='mt-1 flex justify-between'>
                  <Skeleton className='h-7 w-7 rounded-md' />
                  <Skeleton className='h-7 w-7 rounded-md' />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Collection Drawer Skeleton (collapsed state) */}
      <div className='relative'>
        <Card className='border shadow'>
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-2'>
              <Skeleton className='h-5 w-5 rounded-full' />
              <Skeleton className='h-5 w-32' />
              <Badge variant='outline'>
                <Skeleton className='mr-1 h-3 w-3' />
                <Skeleton className='h-3 w-5' />
              </Badge>
            </div>
            <Skeleton className='h-9 w-9 rounded-md' />
          </div>
        </Card>
      </div>
    </div>
  );
});

export default RaidLoadingSkeleton;
