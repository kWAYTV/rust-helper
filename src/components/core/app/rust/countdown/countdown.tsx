import { ClientCountdown } from '@/components/core/app/rust/countdown/client-countdown';

export function Countdown() {
  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='flex items-center gap-2 text-center'>
        <h2 className='text-2xl font-semibold tracking-tight'>
          Next Force Wipe
        </h2>
      </div>

      <ClientCountdown />
    </div>
  );
}
