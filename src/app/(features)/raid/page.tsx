import { RocketIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Rust Raid Calculator',
  description: 'Calculate raid costs and requirements in Rust. Coming soon!'
});

export default function RaidPage() {
  return (
    <div className='flex flex-1 items-center justify-center py-8'>
      <Card className='w-full max-w-lg'>
        <CardContent className='flex flex-col items-center gap-6 pt-6'>
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-primary/10'>
            <RocketIcon className='h-10 w-10 text-primary' />
          </div>
          <div className='text-center'>
            <h1 className='text-3xl font-bold'>Raid Calculator</h1>
            <p className='mt-2 text-muted-foreground'>
              Calculate raid costs and requirements in Rust
            </p>
          </div>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center text-muted-foreground/60'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                Coming Soon
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
