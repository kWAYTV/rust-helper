import { Card } from '@/components/ui/card';
import type { CountdownUnit as CountdownUnitType } from '@/types/countdown';
import { cn } from '@/lib/utils';

export function CountdownUnit({ value, label }: CountdownUnitType) {
  return (
    <div className='flex flex-col items-center gap-2'>
      <div className={cn(
        'flex items-center justify-center bg-red-600 rounded-md transition-all',
        'h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] md:h-[80px] md:w-[80px]'
      )}>
        <span className='font-mono text-2xl font-bold text-white sm:text-2xl md:text-3xl'>
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className='text-muted-foreground text-xs font-medium sm:text-sm'>
        {label}
      </span>
    </div>
  );
}
