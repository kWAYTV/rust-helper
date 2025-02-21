'use client';

import { CountdownSkeleton } from '@/components/core/app/rust/countdown/skeleton';
import { CountdownUnit } from '@/components/core/app/rust/countdown/unit';
import { useCountdown } from '@/hooks/use-countdown';

export function CountdownTimer() {
  const { countDownTime, isLoading } = useCountdown();

  if (isLoading) {
    return <CountdownSkeleton />;
  }

  const units = [
    { value: countDownTime.days, label: 'days' },
    { value: countDownTime.hours, label: 'hours' },
    { value: countDownTime.minutes, label: 'minutes' },
    { value: countDownTime.seconds, label: 'seconds' }
  ];

  return (
    <div className='flex flex-col items-center gap-6'>
      <h2 className='text-3xl font-bold text-white'>Next Force Wipe In:</h2>
      <div className='flex gap-4'>
        {units.map((unit, index) => (
          <CountdownUnit key={index} {...unit} />
        ))}
      </div>
    </div>
  );
}
