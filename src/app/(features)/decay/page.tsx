import { InfoIcon } from 'lucide-react';

import { DecayCalculator } from '@/components/core/app/rust/decay/calculator';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Rust Decay Calculator',
  description:
    'Calculate when your walls will decay in Rust based on their current HP and material type.'
});

export default function DecayPage() {
  return (
    <div className='container flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center px-4 py-8'>
      <div className='w-full max-w-md'>
        <div className='mb-6 text-center'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Decay Calculator
          </h1>
          <p className='text-muted-foreground mt-2'>
            Calculate when your structures will decay in Rust
          </p>
        </div>

        <DecayCalculator />

        <div className='text-muted-foreground mt-8 text-center text-sm'>
          <p className='flex items-center justify-center gap-2'>
            <InfoIcon className='h-4 w-4' />
            All calculations are based on vanilla Rust decay rates
          </p>
        </div>
      </div>
    </div>
  );
}
