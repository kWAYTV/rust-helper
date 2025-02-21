'use client';

import { CountdownUnit } from '@/components/core/app/rust/countdown/unit';
import { useCountdown } from '@/hooks/use-countdown';

export function CountdownTimer() {
  const countdown = useCountdown();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div className='flex flex-col items-center gap-4'>
      <div className='text-center'>
        <h2 className='text-xl font-semibold tracking-tight'>
          Next Force Wipe
        </h2>
        <p className='text-muted-foreground mt-1 text-sm'>{timeZone}</p>
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
    </div>
  );
}
