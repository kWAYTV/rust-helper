'use client';

import { Cog } from 'lucide-react';
import { memo } from 'react';

import { Card, CardContent } from '@/components/ui/card';

interface EmptyStateProps {
  className?: string;
}

const EmptyState = memo(function EmptyState({ className }: EmptyStateProps) {
  return (
    <Card className={className}>
      <CardContent className='py-12'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='bg-muted/50 flex h-20 w-20 items-center justify-center rounded-full'>
            <Cog className='text-muted-foreground h-10 w-10' />
          </div>
          <h3 className='text-xl font-medium'>Select an Operation</h3>
          <p className='text-muted-foreground max-w-md'>
            Choose an operation type from the dropdown above to calculate
            resource yields
          </p>
        </div>
      </CardContent>
    </Card>
  );
});

export default EmptyState;
