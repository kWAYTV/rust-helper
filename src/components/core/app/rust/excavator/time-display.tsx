'use client';

import { useExcavatorStore } from '@/store/excavator';

export function TimeDisplay() {
  const { totalTime } = useExcavatorStore();

  const formatTimeString = () => {
    if (totalTime === 0) return '0s';

    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;

    // More concise time formatting
    return [
      hours > 0 && `${hours}h`,
      minutes > 0 && `${minutes}m`,
      seconds > 0 && `${seconds}s`
    ]
      .filter(Boolean)
      .join(' ');
  };

  return (
    <div className='flex items-center justify-center'>
      <span className='text-2xl font-bold tracking-tight tabular-nums'>
        {formatTimeString()}
      </span>
    </div>
  );
}
