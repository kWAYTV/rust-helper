import { ClientDecayCalculator } from '@/components/core/app/rust/decay/client-calculator';

export function DecayCalculator() {
  return (
    <div className='w-full'>
      <ClientDecayCalculator />
    </div>
  );
}
