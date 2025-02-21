import type React from 'react';
import { useRef } from 'react';

import { Button } from '@/components/ui/button';

interface FuelCounterProps {
  value: number;
  onChange: (value: number) => void;
}

export function FuelCounter({ value, onChange }: FuelCounterProps) {
  const incrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const decrementTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleIncrement = () => {
    const increment = () => {
      onChange(value + 1);
      incrementTimeoutRef.current = setTimeout(increment, 300);
    };
    increment();
  };

  const handleDecrement = () => {
    const decrement = () => {
      onChange(Math.max(1, value - 1));
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
    <div className='flex items-center gap-4'>
      <Button
        variant='destructive'
        size='icon'
        disabled={value <= 1}
        onMouseDown={handleDecrement}
        onMouseUp={() => stopCounter(decrementTimeoutRef)}
        onMouseLeave={() => stopCounter(decrementTimeoutRef)}
      >
        -
      </Button>
      <span className='min-w-[3ch] text-center text-lg font-medium'>
        {value}
      </span>
      <Button
        variant='default'
        size='icon'
        onMouseDown={handleIncrement}
        onMouseUp={() => stopCounter(incrementTimeoutRef)}
        onMouseLeave={() => stopCounter(incrementTimeoutRef)}
      >
        +
      </Button>
    </div>
  );
}
