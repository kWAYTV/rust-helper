'use client';

import { ChevronDown, Cog } from 'lucide-react';
import { motion } from 'motion/react';

export function EmptyState() {
  return (
    <motion.div
      key='operation-empty'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='py-8 text-center'
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className='space-y-4'
      >
        <div className='bg-muted/50 mx-auto flex h-16 w-16 items-center justify-center rounded-full'>
          <Cog className='text-muted-foreground h-8 w-8' />
        </div>
        <div>
          <h3 className='mb-1 text-lg font-medium'>Choose an Operation</h3>
          <p className='text-muted-foreground text-sm'>
            Select an operation type above to start calculating resource yields
          </p>
        </div>
        <motion.div
          initial={{ y: 5 }}
          animate={{ y: 0 }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 1.5
          }}
        >
          <ChevronDown className='text-muted-foreground/50 mx-auto h-6 w-6' />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
