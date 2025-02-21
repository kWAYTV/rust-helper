'use client';

import { Clock, Timer } from 'lucide-react';
import { motion } from 'motion/react';

import { FuelCounter } from '@/components/core/app/rust/excavator/fuel-counter';
import { FuelImage } from '@/components/core/app/rust/excavator/fuel-image';
import { ResourceTable } from '@/components/core/app/rust/excavator/resource-table';
import { TimeDisplay } from '@/components/core/app/rust/excavator/time-display';

export function OperationContent() {
  return (
    <motion.div
      key='operation-content'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='space-y-6'
    >
      <FuelImage />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='space-y-6'
      >
        <div className='bg-card rounded-lg border p-4 shadow-sm'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Timer className='text-muted-foreground h-5 w-5' />
                <span>Duration:</span>
              </div>
              <TimeDisplay />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <Clock className='text-muted-foreground h-5 w-5' />
                <span>Fuel Amount:</span>
              </div>
              <FuelCounter />
            </div>
          </div>
        </div>

        <div className='bg-card rounded-lg border shadow-sm'>
          <ResourceTable />
        </div>
      </motion.div>
    </motion.div>
  );
}
