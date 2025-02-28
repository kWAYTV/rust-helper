'use client';

import { useEffect, useState } from 'react';

import DecayResult from '@/components/core/app/rust/decay/decay-result';
import HpInput from '@/components/core/app/rust/decay/hp-input';
import DecayLoadingSkeleton from '@/components/core/app/rust/decay/loading-skeleton';
import MaterialSelector from '@/components/core/app/rust/decay/material-selector';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useDecayStore } from '@/store/decay';

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
    return <DecayLoadingSkeleton />;
  }

  return (
    <div className='space-y-6'>
      {/* Input Section */}
      <div className='grid gap-6 md:grid-cols-2'>
        <Card className='shadow-sm'>
          <CardContent className='p-5'>
            <div className='space-y-5'>
              <h3 className='text-lg font-medium'>Material Properties</h3>
              <Separator className='bg-primary/10' />
              <MaterialSelector />
            </div>
          </CardContent>
        </Card>

        <Card className='shadow-sm'>
          <CardContent className='p-5'>
            <div className='space-y-5'>
              <h3 className='text-lg font-medium'>Structure Health</h3>
              <Separator className='bg-primary/10' />
              <HpInput />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Section */}
      <DecayResult className='mt-6' />
    </div>
  );
}
