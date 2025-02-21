'use client';

import { useEffect, useState } from 'react';

import { calculateTimeRemaining, getNextFirstThursday } from '@/helpers/date';
import type { CountdownTime } from '@/types/countdown/countdown';

export function useCountdown() {
  const [countDownTime, setCountDownTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Get initial target date
    const targetDate = getNextFirstThursday();

    function updateCountdown() {
      setCountDownTime(calculateTimeRemaining(targetDate));
    }

    // Update immediately
    updateCountdown();

    // Then update every second
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return countDownTime;
}
