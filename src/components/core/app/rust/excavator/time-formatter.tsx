export function formatTimeString(totalTime: number): string {
  if (totalTime === 0) return '0s';

  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor((totalTime % 3600) / 60);
  const seconds = totalTime % 60;

  return [
    hours > 0 && `${hours}h`,
    minutes > 0 && `${minutes}m`,
    seconds > 0 && `${seconds}s`
  ]
    .filter(Boolean)
    .join(' ');
}
