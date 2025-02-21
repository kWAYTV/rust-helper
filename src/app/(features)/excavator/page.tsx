import { ExcavatorCalculator } from '@/components/core/app/rust/excavator/calculator';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Rust Excavator Calculator',
  description:
    'Calculate resource yields from Excavator in Rust. Plan your resource gathering efficiently.'
});

export default function ExcavatorPage() {
  return (
    <main className='container mx-auto py-8'>
      <ExcavatorCalculator />
    </main>
  );
}
