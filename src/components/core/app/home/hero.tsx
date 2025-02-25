import { Hammer } from 'lucide-react';

export default function Hero() {
  return (
    <div className='text-center'>
      <div className='bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full'>
        <Hammer className='text-primary h-8 w-8' />
      </div>
      <h1 className='from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl'>
        Rust Helper
      </h1>
      <p className='text-muted-foreground mx-auto mt-4 max-w-md text-lg'>
        Your essential toolkit for raids, resource management, and base upkeep
        in Rust
      </p>
    </div>
  );
}
