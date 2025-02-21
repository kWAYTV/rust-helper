'use client';

import { useExcavatorStore } from '@/store/excavator';

export function TimeDisplay() {
  const { totalTime } = useExcavatorStore();

  const formatTimeString = () => {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor((totalTime % 3600) / 60);
    const seconds = totalTime % 60;

    if (totalTime === 0) {
      return '0 seconds';
    }

    const parts = [];
    if (hours > 0) {
      parts.push(`${hours}h`);
    }
    if (minutes > 0) {
      parts.push(`${minutes}m`);
    }
    if (seconds > 0) {
      parts.push(`${seconds}s`);
    }

    return parts.join(' ');
  };

  return (
    <div className='flex items-center justify-center'>
      <span className='text-2xl font-bold tracking-tight tabular-nums'>
        {formatTimeString()}
      </span>
    </div>
  );
}
