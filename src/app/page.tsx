import Hero from '@/components/core/app/home/hero';
import { CountdownTimer } from '@/components/core/app/rust/countdown/timer';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className='container mx-auto flex flex-1 flex-col items-center justify-center gap-16 px-4 py-12 sm:px-6 lg:px-8'>
      <div className='w-full rounded-lg bg-gradient-to-r p-8 text-center shadow-sm'>
        <Hero />
      </div>

      <Card className='w-full max-w-2xl border-none bg-transparent shadow-none'>
        <CardContent className='p-0'>
          <CountdownTimer />
        </CardContent>
      </Card>
    </div>
  );
}
