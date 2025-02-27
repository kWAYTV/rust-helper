'use client';

import { memo } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ResultSkeletonProps {
  className?: string;
}

const ResultSkeleton = memo(function ResultSkeleton({
  className
}: ResultSkeletonProps) {
  return (
    <div className={className}>
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

export default ResultSkeleton;
