import { DecayCalculator } from '@/components/core/app/rust/decay/calculator';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Rust Decay Calculator',
  description:
    'Calculate when your walls will decay in Rust based on their current HP and material type.'
});

export default function DecayPage() {
  return (
    <div className='flex flex-1 items-start justify-center px-4 py-8 sm:px-6 lg:px-8'>
      <div className='w-full max-w-4xl'>
        <DecayCalculator />
      </div>
    </div>
  );
}
