'use client';

import { Calendar } from 'lucide-react';

import { CountdownUnit } from '@/components/core/app/rust/countdown/unit';
import { useCountdown } from '@/hooks/use-countdown';

export function CountdownTimer() {
  const countdown = useCountdown();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex items-center gap-2 text-center'>
        <Calendar className='text-primary h-5 w-5' />
        <h2 className='text-2xl font-semibold tracking-tight'>
          Next Force Wipe
        </h2>
      </div>

      <div className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6'>
        {[
          { value: countdown.days, label: 'days' },
          { value: countdown.hours, label: 'hours' },
          { value: countdown.minutes, label: 'minutes' },
          { value: countdown.seconds, label: 'seconds' }
        ].map(unit => (
          <CountdownUnit key={unit.label} {...unit} />
        ))}
      </div>

      <p className='text-muted-foreground text-center text-sm'>
        Based on your local timezone:{' '}
        <span className='font-medium'>{timeZone}</span>
      </p>
    </div>
  );
}
