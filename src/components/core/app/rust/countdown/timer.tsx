'use client';

import { CountdownUnit } from '@/components/core/app/rust/countdown/unit';
import { useCountdown } from '@/hooks/use-countdown';

export function CountdownTimer() {
  const countdown = useCountdown();

  return (
    <div className='flex flex-col items-center gap-4'>
      <h1 className='text-2xl font-bold tracking-wider uppercase'>Next Force Wipe</h1>
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
    </div>
  );
}
