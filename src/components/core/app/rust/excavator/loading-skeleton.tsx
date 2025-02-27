'use client';

import { memo } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface LoadingSkeletonProps {
  className?: string;
}

const LoadingSkeleton = memo(function LoadingSkeleton({
  className
}: LoadingSkeletonProps) {
  return (
    <div className={className}>
      <div className='mb-6'>
        <Skeleton className='h-10 w-full max-w-sm' />
        <Skeleton className='mt-2 h-5 w-full max-w-xs' />
      </div>

      <div className='grid gap-6 lg:grid-cols-3'>
        <Card className='lg:col-span-1'>
          <CardContent className='space-y-4 p-6'>
            <Skeleton className='h-6 w-24' />
            <div className='my-4 flex justify-center'>
              <Skeleton className='h-20 w-20 rounded-full' />
            </div>
            <Skeleton className='h-5 w-20' />
            <div className='flex items-center gap-3'>
              <Skeleton className='h-10 w-10' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-10' />
            </div>
            <Skeleton className='h-5 w-32' />
            <Skeleton className='h-12 w-full' />
            <Skeleton className='h-10 w-full' />
          </CardContent>
        </Card>

        <Card className='lg:col-span-2'>
          <CardContent className='space-y-4 p-6'>
            <Skeleton className='h-6 w-32' />
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-6 w-1/4' />
                <Skeleton className='h-6 w-1/6' />
              </div>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-6 w-1/3' />
                <Skeleton className='h-6 w-1/6' />
              </div>
              <div className='flex items-center justify-between'>
                <Skeleton className='h-6 w-1/5' />
                <Skeleton className='h-6 w-1/5' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
});

export default LoadingSkeleton;
