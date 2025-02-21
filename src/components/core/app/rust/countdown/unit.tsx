'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { CountdownUnit as CountdownUnitType } from '@/types/countdown';

export function CountdownUnit({ value, label }: CountdownUnitType) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (value !== displayValue) {
      setDisplayValue(value);
    }
  }, [value, displayValue]);

  return (
    <div className='flex flex-col items-center gap-2'>
      <div className='relative h-[80px] w-[80px]'>
        <div className='absolute inset-0 rounded-lg bg-black/10' />
        <AnimatePresence mode='popLayout'>
          <motion.div
            key={displayValue}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.65, 0, 0.35, 1],
              opacity: { duration: 0.2 }
            }}
            className='absolute inset-0 flex items-center justify-center rounded-lg bg-zinc-900 text-white shadow-lg'
          >
            <motion.span 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className='font-mono text-3xl font-bold'
            >
              {displayValue.toString().padStart(2, '0')}
            </motion.span>
          </motion.div>
        </AnimatePresence>
        {/* Border for better visibility in light mode */}
        <div className='absolute inset-0 rounded-lg ring-1 ring-black/20' />
      </div>
      <span className='text-sm font-medium text-neutral-500'>{label}</span>
    </div>
  );
}
