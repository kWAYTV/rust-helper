'use client';

import { motion } from 'motion/react';
import { Link } from 'next-view-transitions';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8'>
      <motion.div
        className='space-y-2 text-center'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className='text-8xl font-bold'>404</h1>
        <h2 className='text-2xl font-semibold'>Page Not Found</h2>
      </motion.div>

      <motion.p
        className='text-muted-foreground max-w-md text-center'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Link href='/'>
          <Button className='font-medium' variant='default'>
            Return Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
