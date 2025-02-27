import CategoryButtons from '@/components/core/app/rust/raid/category-buttons';
import { CollectionDrawer } from '@/components/core/app/rust/raid/collection-drawer';
import ItemGrid from '@/components/core/app/rust/raid/item-grid';

import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Raid Calculator',
  description:
    'Calculate resources needed to raid structures in Rust. Plan your raids efficiently with our raid calculator.'
});

export default function RaidCalculatorPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold'>Raid Calculator</h1>
          <p className='text-neutral-400'>
            Calculate the resources needed to raid different structures in Rust
          </p>
        </div>

        <CategoryButtons />
        <ItemGrid />
        <CollectionDrawer />
      </div>
    </div>
  );
}
