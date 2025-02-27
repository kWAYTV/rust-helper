import { InfoIcon } from 'lucide-react';

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
    <div className='container mx-auto px-4 py-8 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8 text-center sm:text-left'>
          <h1 className='text-3xl font-bold tracking-tight'>Raid Calculator</h1>
          <p className='text-muted-foreground mt-2'>
            Calculate the resources needed to raid different structures in Rust
          </p>
        </div>

        <div className='space-y-6'>
          <CategoryButtons className='my-4' />
          <ItemGrid />
          <CollectionDrawer />
        </div>

        <div className='text-muted-foreground mt-12 text-center text-sm sm:text-left'>
          <p className='flex items-center justify-center gap-2 sm:justify-start'>
            <InfoIcon className='h-4 w-4' />
            All calculations are based on vanilla Rust damage values. Modded
            servers may have different raid costs.
          </p>
        </div>
      </div>
    </div>
  );
}
