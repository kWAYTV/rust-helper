import { Link } from 'next-view-transitions';

import Hero from '@/components/core/app/home/hero';
import { CountdownTimer } from '@/components/core/app/rust/countdown/timer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { navItems } from '@/constants/navigation';

export default function Home() {
  return (
    <div className='mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8'>
      {/* Hero Section */}
      <div className='mb-16 space-y-2 text-center'>
        <Hero />
        <p className='text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed'>
          Tools and calculators to optimize your Rust gameplay experience.
          Simple, accurate, and always up-to-date.
        </p>
      </div>

      {/* Feature Cards */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {navItems
          .filter(item => item.href !== '/')
          .map(item => (
            <Link
              href={item.href}
              key={item.href}
              className='group transition-all'
            >
              <Card className='border-primary/5 from-background to-secondary/5 hover:border-primary/20 h-full overflow-hidden bg-gradient-to-b transition-all hover:shadow-md'>
                <CardContent className='p-6'>
                  <h3 className='mb-2 text-xl font-medium tracking-tight'>
                    {item.label}
                  </h3>
                  <Separator className='bg-primary/10 mb-3' />
                  <p className='text-muted-foreground text-sm'>
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}

        {/* Countdown Card - Spans Multiple Columns */}
        <Card className='border-primary/5 from-background to-primary/5 col-span-full mt-4 overflow-hidden bg-gradient-to-b hover:shadow-md sm:mt-6'>
          <CardContent className='p-6'>
            <CountdownTimer />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
