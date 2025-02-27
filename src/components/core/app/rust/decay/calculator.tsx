import ClientDecayCalculator from '@/components/core/app/rust/decay/client-calculator';

export function DecayCalculator() {
  return (
    <div className='container max-w-2xl py-6'>
      <ClientDecayCalculator />
    </div>
  );
}
