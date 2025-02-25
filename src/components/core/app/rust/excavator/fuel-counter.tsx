import { Minus, Plus } from 'lucide-react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { useExcavatorStore } from '@/store/excavator';

export function FuelCounter() {
  const { dieselFuel, incrementFuel, decrementFuel } = useExcavatorStore();
  const incrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const decrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Simplified handlers with cleaner implementation
  const startIncrement = () => {
    incrementFuel();
    clearTimeout(incrementTimeoutRef.current!);
    incrementTimeoutRef.current = setTimeout(() => {
      incrementTimeoutRef.current = setInterval(
        incrementFuel,
        100
      ) as unknown as NodeJS.Timeout;
    }, 300);
  };

  const startDecrement = () => {
    decrementFuel();
    clearTimeout(decrementTimeoutRef.current!);
    decrementTimeoutRef.current = setTimeout(() => {
      decrementTimeoutRef.current = setInterval(
        decrementFuel,
        100
      ) as unknown as NodeJS.Timeout;
    }, 300);
  };

  const stopCounter = (ref: React.MutableRefObject<NodeJS.Timeout | null>) => {
    if (ref.current) {
      clearTimeout(ref.current);
      clearInterval(ref.current);
      ref.current = null;
    }
  };

  return (
    <div className='flex items-center justify-center gap-4'>
      <Button
        variant='outline'
        size='icon'
        disabled={dieselFuel <= 1}
        onMouseDown={startDecrement}
        onMouseUp={() => stopCounter(decrementTimeoutRef)}
        onMouseLeave={() => stopCounter(decrementTimeoutRef)}
      >
        <Minus className='h-4 w-4' />
      </Button>
      <span className='min-w-[3ch] text-center text-lg font-medium'>
        {dieselFuel}
      </span>
      <Button
        variant='outline'
        size='icon'
        onMouseDown={startIncrement}
        onMouseUp={() => stopCounter(incrementTimeoutRef)}
        onMouseLeave={() => stopCounter(incrementTimeoutRef)}
      >
        <Plus className='h-4 w-4' />
      </Button>
    </div>
  );
}
