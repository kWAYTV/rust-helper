import Hero from '@/components/core/app/home/hero';
import { CountdownTimer } from '@/components/core/app/rust/countdown/timer';

export default function Home() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-24 px-4 py-8 sm:px-6 lg:px-8'>
      <Hero />
      <section className='w-full'>
        <CountdownTimer />
      </section>
    </div>
  );
}
