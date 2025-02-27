'use client';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export function CountdownUnit({
  value,
  label
}: {
  value: number;
  label: string;
}) {
  return (
    <div className='flex flex-col items-center gap-2'>
      <Card
        className={cn(
          'bg-primary/5 border-primary/10 flex items-center justify-center transition-all',
          'h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24'
        )}
      >
        <span className='font-mono text-2xl font-bold sm:text-3xl md:text-4xl'>
          {value.toString().padStart(2, '0')}
        </span>
      </Card>
      <span className='text-muted-foreground text-xs font-medium tracking-wider uppercase sm:text-sm'>
        {label}
      </span>
    </div>
  );
}
