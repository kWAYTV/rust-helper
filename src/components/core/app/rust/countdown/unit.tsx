import { useEffect, useState } from 'react';

import type { CountdownUnit as CountdownUnitType } from '@/types/countdown';

export function CountdownUnit({ value, label }: CountdownUnitType) {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    setIsFlipping(true);
    const timer = setTimeout(() => setIsFlipping(false), 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='relative h-[80px] w-[80px]'>
        <div className='absolute inset-0 rounded-lg bg-black/10' />
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-lg bg-zinc-900 text-white shadow-lg transition-transform duration-300 ${
            isFlipping ? '[transform:rotateX(-180deg)]' : ''
          }`}
        >
          <span className='font-mono text-3xl font-bold'>
            {value.toString().padStart(2, '0')}
          </span>
        </div>
        {/* Border for better visibility in light mode */}
        <div className='absolute inset-0 rounded-lg ring-1 ring-black/20' />
      </div>
      <span className='text-sm font-medium text-neutral-500'>{label}</span>
    </div>
  );
}
