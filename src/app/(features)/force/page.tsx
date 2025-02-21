import { CountdownTimer } from '@/components/core/app/rust/countdown/timer';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Force Wipe Countdown',
  description: 'Track the time until the next Rust force wipe'
});

export default function CountdownPage() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-6'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold'>Force Wipe Countdown</h1>
        <p className='text-muted-foreground mt-4'>
          Track the time until the next Rust force wipe
        </p>
      </div>
      <div className='w-full max-w-2xl'>
        <CountdownTimer />
      </div>
    </div>
  );
}
