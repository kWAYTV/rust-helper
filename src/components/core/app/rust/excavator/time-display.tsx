import { useExcavatorStore } from '@/store/excavator';

export function TimeDisplay() {
  const { totalTime } = useExcavatorStore();
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;

  const formatTimeString = () => {
    const parts = [];

    if (hours > 0) {
      parts.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    }
    if (minutes > 0) {
      parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
    }
    if (seconds > 0) {
      parts.push(`${seconds} second${seconds > 1 ? 's' : ''}`);
    }

    return parts.length ? parts.join(', ') : '0 seconds';
  };

  return (
    <div className='bg-card flex items-center justify-center gap-2 rounded-lg border p-4'>
      <span className='text-lg font-semibold'>Time:</span>
      <span className='text-primary text-lg font-bold'>
        {formatTimeString()}
      </span>
    </div>
  );
}
