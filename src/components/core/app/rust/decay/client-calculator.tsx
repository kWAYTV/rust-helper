'use client';

import { useEffect, useState } from 'react';

import { useDecayStore } from '@/store/decay';

import DecayResult from './decay-result';
import HpInput from './hp-input';
import MaterialSelector from './material-selector';

export default function ClientDecayCalculator() {
  const [mounted, setMounted] = useState(false);
  const reset = useDecayStore(state => state.reset);

  // Initialize the store on mount
  useEffect(() => {
    setMounted(true);
    return () => {
      reset();
    };
  }, [reset]);

  if (!mounted) {
    return null;
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-4'>
        <MaterialSelector />
        <HpInput />
      </div>
      <DecayResult className='mt-6' />
    </div>
  );
}
