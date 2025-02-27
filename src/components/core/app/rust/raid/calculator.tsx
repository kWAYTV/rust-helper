import { InfoIcon } from 'lucide-react';

import { ClientRaidCalculator } from '@/components/core/app/rust/raid/client-calculator';

export function RaidCalculator() {
  return (
    <div className='mx-auto max-w-6xl'>
      <div className='mb-8 text-center sm:text-left'>
        <h1 className='text-3xl font-bold tracking-tight'>Raid Calculator</h1>
        <p className='text-muted-foreground mt-2'>
          Calculate the resources needed to raid different structures in Rust
        </p>
      </div>

      <div className='space-y-6'>
        <ClientRaidCalculator />
      </div>

      <div className='text-muted-foreground mt-12 text-center text-sm sm:text-left'>
        <p className='flex items-center justify-center gap-2 sm:justify-start'>
          <InfoIcon className='h-4 w-4' />
          All calculations are based on vanilla Rust damage values. Modded
          servers may have different raid costs.
        </p>
      </div>
    </div>
  );
}
