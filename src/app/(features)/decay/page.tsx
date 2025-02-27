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
      <DecayCalculator />
    </div>
  );
}
