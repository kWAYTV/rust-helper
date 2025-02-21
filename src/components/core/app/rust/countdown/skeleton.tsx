import { Skeleton } from '@/components/ui/skeleton';

export function CountdownSkeleton() {
  return (
    <div className='flex items-center gap-4'>
      {[...Array(4)].map((_, i) => (
        <div key={i} className='flex flex-col items-center gap-2'>
          <Skeleton className='h-[80px] w-[80px] rounded-lg bg-black/20' />
          <Skeleton className='h-4 w-12 bg-black/20' />
        </div>
      ))}
    </div>
  );
}
