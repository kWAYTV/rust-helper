import { RaidCalculator } from '@/components/core/app/rust/raid/calculator';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Raid Calculator',
  description:
    'Calculate resources needed to raid structures in Rust. Plan your raids efficiently with our raid calculator.'
});

export default function RaidCalculatorPage() {
  return (
    <div className='container mx-auto px-4 py-8 sm:px-6 lg:px-8'>
      <RaidCalculator />
    </div>
  );
}
