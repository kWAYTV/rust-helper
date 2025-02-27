'use client';

import { useEffect, useState } from 'react';

import { useExcavatorStore } from '@/store/excavator';

import EmptyState from '@/components/core/app/rust/excavator/empty-state';
import FuelInput from '@/components/core/app/rust/excavator/fuel-input';
import LoadingSkeleton from '@/components/core/app/rust/excavator/loading-skeleton';
import OperationSelector from '@/components/core/app/rust/excavator/operation-selector';
import ResourceDisplay from '@/components/core/app/rust/excavator/resource-display';

export function ClientCalculator() {
  const [mounted, setMounted] = useState(false);
  const selectedOperation = useExcavatorStore(state => state.selectedOperation);

  // Initialize client-side state
  useEffect(() => {
    setMounted(true);

    // Cleanup
    return () => {
      // Clean up any side effects if needed
    };
  }, []);

  if (!mounted) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      {/* Operation Header */}
      <div className='from-primary/10 via-primary/5 to-background rounded-lg bg-gradient-to-r p-6 shadow-sm'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <div>
            <h1 className='text-2xl font-bold sm:text-3xl'>
              Resource Yield Calculator
            </h1>
            <p className='text-muted-foreground mt-1'>
              Calculate resource yields from mining operations
            </p>
          </div>

          <div className='w-full sm:w-64'>
            <OperationSelector />
          </div>
        </div>
      </div>

      {selectedOperation ? (
        <div className='grid gap-6 lg:grid-cols-3'>
          <FuelInput className='lg:col-span-1' />
          <ResourceDisplay className='lg:col-span-2' />
        </div>
      ) : (
        <EmptyState className='py-12' />
      )}
    </>
  );
}
