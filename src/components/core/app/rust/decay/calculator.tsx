import { InfoIcon } from 'lucide-react';

import ClientDecayCalculator from '@/components/core/app/rust/decay/client-calculator';
import { Card, CardContent } from '@/components/ui/card';

export function DecayCalculator() {
  return (
    <div className='w-full max-w-3xl'>
      <div className='mb-8 text-center'>
        <h1 className='text-3xl font-bold tracking-tight'>Decay Calculator</h1>
        <p className='text-muted-foreground mt-2'>
          Calculate when your structures will decay in Rust
        </p>
      </div>

      <Card className='w-full overflow-hidden shadow-md'>
        <CardContent className='p-6'>
          <ClientDecayCalculator />
        </CardContent>
      </Card>

      <div className='text-muted-foreground mt-8 text-center text-sm'>
        <p className='flex items-center justify-center gap-2'>
          <InfoIcon className='h-4 w-4' />
          All calculations are based on vanilla Rust decay rates
        </p>
      </div>
    </div>
  );
}
