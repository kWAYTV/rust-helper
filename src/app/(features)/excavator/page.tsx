import { ExcavatorCalculator } from '@/components/core/app/rust/excavator/calculator';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Rust Excavator Calculator',
  description:
    'Calculate resource yields from Excavator in Rust. Plan your resource gathering efficiently.'
});

export default function ExcavatorPage() {
  return (
    <div className='flex flex-1 items-start justify-center px-4 py-8 sm:px-6 lg:px-8'>
      <div className='w-full max-w-4xl'>
        <ExcavatorCalculator />
      </div>
    </div>
  );
}
