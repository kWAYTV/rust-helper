'use client';

import { useEffect, useState } from 'react';

import CategoryButtons from '@/components/core/app/rust/raid/category-buttons';
import { CollectionDrawer } from '@/components/core/app/rust/raid/collection-drawer';
import ItemGrid from '@/components/core/app/rust/raid/item-grid';

export function ClientRaidCalculator() {
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // You could add a skeleton loader here
    return <div className='min-h-[500px]'></div>;
  }

  return (
    <>
      <CategoryButtons className='my-4' />
      <ItemGrid />
      <CollectionDrawer />
    </>
  );
}
