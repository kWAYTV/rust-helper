import { ExcavatorCalculator } from '@/components/core/app/rust/excavator/calculator';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Rust Excavator Calculator',
  description:
    'Calculate resource yields from Excavator in Rust. Plan your resource gathering efficiently.'
});

export default function ExcavatorPage() {
  return (
    <div className='flex flex-1 items-start justify-center py-8'>
      <ExcavatorCalculator />
    </div>
  );
}
