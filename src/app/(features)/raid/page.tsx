import { Suspense } from 'react';

import RaidCalculator from '@/components/core/app/rust/raid/raid-calculator';
import RaidCalculatorSkeleton from '@/components/core/app/rust/raid/raid-calculator-skeleton';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Raid Costs Calculator',
  description: 'Plan and calculate resource costs for raids in Rust'
});

export default function RaidPage() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-6'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>Raid Costs Calculator</h1>
        <p className='text-muted-foreground mt-4'>
          Plan your raids and calculate total resource costs
        </p>
      </div>
      <div className='w-full max-w-6xl'>
        <Suspense fallback={<RaidCalculatorSkeleton />}>
          <RaidCalculator />
        </Suspense>
      </div>
    </div>
  );
}
