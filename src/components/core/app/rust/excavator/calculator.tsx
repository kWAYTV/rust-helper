import { ClientCalculator } from '@/components/core/app/rust/excavator/client-calculator';

export function ExcavatorCalculator() {
  return (
    <div className='mx-auto max-w-5xl'>
      <div className='mb-8 text-center sm:text-left'>
        <h1 className='text-3xl font-bold tracking-tight'>
          Excavator Calculator
        </h1>
        <p className='text-muted-foreground mt-2'>
          Calculate resource yields from Excavator and Quarries in Rust
        </p>
      </div>

      <div className='space-y-6'>
        <ClientCalculator />
      </div>

      <div className='text-muted-foreground mt-8 text-sm'>
        <p>
          Note: All calculations are based on the standard yield rates in the
          vanilla Rust game. Modded servers may have different resource yield
          multipliers.
        </p>
      </div>
    </div>
  );
}
