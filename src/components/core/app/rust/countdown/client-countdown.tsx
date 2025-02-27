'use client';

import { Calendar } from 'lucide-react';
import { Spoiler } from 'spoiled';
import { useEffect, useState } from 'react';

import { CountdownUnit } from '@/components/core/app/rust/countdown/unit';
import { useCountdown } from '@/hooks/use-countdown';

export function ClientCountdown() {
  const [mounted, setMounted] = useState(false);
  const countdown = useCountdown();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='flex min-h-[120px] flex-wrap justify-center gap-3 sm:gap-4 md:gap-6'></div>
    );
  }

  return (
    <>
      <div className='flex items-center gap-2 text-center'>
        <Calendar className='text-primary h-5 w-5' />
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
        Based on your local timezone:
        <br />
        <Spoiler hint='Click to reveal'>
          <span className='text-primary font-medium'>{timeZone}</span>
        </Spoiler>
      </p>
    </>
  );
}
