import CategorySelectorSkeleton from '@/components/core/app/rust/raid/category-selector-skeleton';
import ItemGridSkeleton from '@/components/core/app/rust/raid/item-grid-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function RaidCalculatorSkeleton() {
  return (
    <div className='w-full space-y-6'>
      <CategorySelectorSkeleton />
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <ItemGridSkeleton />
        </div>
        <div>
          <Skeleton className='h-[400px] w-full rounded-lg' />
        </div>
      </div>
    </div>
  );
}
