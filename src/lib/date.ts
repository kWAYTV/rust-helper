export function getNextFirstThursday(): Date {
  const now = new Date();
  let date = new Date(now.getFullYear(), now.getMonth(), 1);

  // Find the first Thursday of the current month
  while (date.getDay() !== 4) {
    date.setDate(date.getDate() + 1);
  }

  // If today is the first Thursday but before 8 PM
  if (now.getDate() === date.getDate() && now.getHours() < 20) {
    date = now;
  } else if (
    now > date ||
    (now.getDate() === date.getDate() && now.getHours() >= 20)
  ) {
    // Move to next month if we're past the first Thursday
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);
    while (date.getDay() !== 4) {
      date.setDate(date.getDate() + 1);
    }
  }

  // Set to 8 PM
  date.setHours(20, 0, 0, 0);
  return date;
}

export function calculateTimeRemaining(targetDate: Date) {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
