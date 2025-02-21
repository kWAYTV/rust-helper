import Hero from '@/components/core/app/home/hero';
import { CountdownTimer } from '@/components/core/app/rust/countdown/timer';

export default function Home() {
  return (
    <div className='w-full max-w-3xl px-4 py-8'>
      <div className='space-y-24'>
        <Hero />
        {/* Force Wipe Timer */}
        <section className='flex w-full justify-center'>
          <CountdownTimer />
        </section>
      </div>
    </div>
  );
}
