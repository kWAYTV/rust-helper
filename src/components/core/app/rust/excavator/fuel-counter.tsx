import { Minus, Plus } from 'lucide-react';
import type React from 'react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';
import { useExcavatorStore } from '@/store/excavator';

export function FuelCounter() {
  const { dieselFuel, incrementFuel, decrementFuel } = useExcavatorStore();
  const incrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const decrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIncrement = () => {
    const increment = () => {
      incrementFuel();
      incrementTimeoutRef.current = setTimeout(increment, 300);
    };
    increment();
  };

  const handleDecrement = () => {
    const decrement = () => {
      decrementFuel();
      decrementTimeoutRef.current = setTimeout(decrement, 300);
    };
    decrement();
  };

  const stopCounter = (
    timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div className='flex items-center justify-center gap-4'>
      <Button
        variant='outline'
        size='icon'
        disabled={dieselFuel <= 1}
        onMouseDown={handleDecrement}
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
        onMouseDown={handleIncrement}
        onMouseUp={() => stopCounter(incrementTimeoutRef)}
        onMouseLeave={() => stopCounter(incrementTimeoutRef)}
      >
        <Plus className='h-4 w-4' />
      </Button>
    </div>
  );
}
