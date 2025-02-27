import { ExcavatorCalculator } from '@/components/core/app/rust/excavator/calculator';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Rust Excavator Calculator',
  description:
    'Calculate resource yields from Excavator and Quarries in Rust. Plan your resource gathering efficiently.'
});

export default function ExcavatorPage() {
  return (
    <div className='container mx-auto px-4 py-8 sm:px-6 lg:px-8'>
      <ExcavatorCalculator />
    </div>
  );
}
