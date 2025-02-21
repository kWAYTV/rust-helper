import { DecayCalculator } from '@/components/core/app/rust/decay/calculator';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Rust Decay Calculator',
  description:
    'Calculate when your walls will decay in Rust based on their current HP and material type.'
});

export default function DecayPage() {
  return (
    <div className='container py-8'>
      <DecayCalculator />
    </div>
  );
}
