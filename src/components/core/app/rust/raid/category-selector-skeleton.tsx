import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategorySelectorSkeleton() {
  return (
    <Card className='p-2'>
      <div className='flex flex-wrap justify-center gap-2'>
        {[1, 2, 3, 4, 5].map(i => (
          <Skeleton key={i} className='h-8 w-24' />
        ))}
      </div>
    </Card>
  );
}
