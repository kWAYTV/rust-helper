import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ItemGridSkeleton() {
  return (
    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <Card key={index} className='p-2'>
            <div className='flex flex-col items-center gap-2'>
              <Skeleton className='h-16 w-16 rounded-md' />
              <Skeleton className='h-4 w-20' />
            </div>
          </Card>
        ))}
    </div>
  );
}
