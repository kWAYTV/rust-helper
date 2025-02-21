import type { Material } from '@/types/decay/decay';

export function calculateDecay(material: Material, hp: number) {
  if (hp > material.maxHp || hp < 0) {
    return { timeLeft: 'Invalid HP value.', decayDateTime: '' };
  }

  const decayPerHp = material.decayTime / material.maxHp; // hours per HP
  const timeRemaining = decayPerHp * hp; // in hours

  // Convert time to hours, minutes, and seconds
  const totalSeconds = Math.floor(timeRemaining * 3600);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const timeLeft = `${hours}h ${minutes}m ${seconds}s`;

  // Calculate the exact decay date and time in the user's local timezone
  const decayTime = new Date();
  decayTime.setSeconds(decayTime.getSeconds() + totalSeconds);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  };

  const formattedDecayTime = decayTime.toLocaleString(undefined, options);

  return { timeLeft, decayDateTime: formattedDecayTime };
}
