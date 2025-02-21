'use client';

import { CountdownSkeleton } from '@/components/core/app/rust/countdown/skeleton';
import { CountdownUnit } from '@/components/core/app/rust/countdown/unit';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCountdown } from '@/hooks/use-countdown';

export function CountdownTimer() {
  const { countDownTime, isLoading } = useCountdown();

  if (isLoading) {
    return <CountdownSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-center'>Next Force Wipe In:</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6'>
          {[
            { value: countDownTime.days, label: 'days' },
            { value: countDownTime.hours, label: 'hours' },
            { value: countDownTime.minutes, label: 'minutes' },
            { value: countDownTime.seconds, label: 'seconds' }
          ].map(unit => (
            <CountdownUnit key={unit.label} {...unit} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
