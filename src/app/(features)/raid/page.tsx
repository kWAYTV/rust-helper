import { RocketIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Rust Raid Calculator',
  description: 'Calculate raid costs and requirements in Rust. Coming soon!'
});

export default function RaidPage() {
  return (
    <div className='flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8'>
      <Card className='w-full max-w-lg'>
        <CardContent className='flex flex-col items-center gap-6 pt-6'>
          <div className='bg-primary/10 flex h-20 w-20 items-center justify-center rounded-full'>
            <RocketIcon className='text-primary h-10 w-10' />
          </div>
          <div className='text-center'>
            <h1 className='text-3xl font-bold'>Raid Calculator</h1>
            <p className='text-muted-foreground mt-2'>
              Calculate raid costs and requirements in Rust
            </p>
          </div>
          <div className='relative'>
            <div className='text-muted-foreground/60 absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background text-muted-foreground px-2'>
                Coming Soon
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
