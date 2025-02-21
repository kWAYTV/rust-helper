import Hero from '@/components/core/app/home/hero';
import { CountdownTimer } from '@/components/core/app/rust/countdown/timer';

export default function Home() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-24 py-8'>
      <Hero />
      <section className='w-full'>
        <CountdownTimer />
      </section>
    </div>
  );
}
