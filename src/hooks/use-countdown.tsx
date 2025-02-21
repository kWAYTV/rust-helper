'use client';

import { useCallback, useEffect, useState } from 'react';

import { calculateTimeRemaining, getNextFirstThursday } from '@/lib/date';
import type { CountdownTime } from '@/types/countdown';

export function useCountdown() {
  const [countDownTime, setCountDownTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  const updateCountdown = useCallback(() => {
    const nextThursday = getNextFirstThursday();
    const timeRemaining = calculateTimeRemaining(nextThursday);
    setCountDownTime(timeRemaining);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [updateCountdown]);

  return {
    countDownTime,
    isLoading
  };
}
