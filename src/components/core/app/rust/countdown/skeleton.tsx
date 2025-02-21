import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function CountdownSkeleton() {
  return (
    <Card>
      <div className='flex flex-col space-y-1.5 p-6'>
        <Skeleton className='mx-auto h-7 w-48' />
      </div>
      <div className='p-6 pt-0'>
        <div className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='flex flex-col items-center gap-2'>
              <Skeleton className='h-[60px] w-[60px] sm:h-[70px] sm:w-[70px] md:h-[80px] md:w-[80px]' />
              <Skeleton className='h-4 w-12' />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
