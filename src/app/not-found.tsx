'use client';

import { Link } from 'next-view-transitions';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8'>
      <div className='space-y-2 text-center'>
        <h1 className='text-8xl font-bold'>404</h1>
        <h2 className='text-2xl font-semibold'>Page Not Found</h2>
      </div>

      <p className='text-muted-foreground max-w-md text-center'>
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <div>
        <Link href='/'>
          <Button className='font-medium' variant='default'>
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
