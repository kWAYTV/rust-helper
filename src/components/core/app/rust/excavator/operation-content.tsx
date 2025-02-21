'use client';

import { Clock, Timer } from 'lucide-react';
import { motion } from 'motion/react';

import { FuelCounter } from '@/components/core/app/rust/excavator/fuel-counter';
import { FuelImage } from '@/components/core/app/rust/excavator/fuel-image';
import { ResourceTable } from '@/components/core/app/rust/excavator/resource-table';
import { TimeDisplay } from '@/components/core/app/rust/excavator/time-display';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function OperationContent() {
  return (
    <motion.div
      key='operation-content'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className='space-y-6'
    >
      <div className='flex items-center justify-center'>
        <FuelImage />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='grid gap-6 sm:grid-cols-2'
      >
        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='flex items-center gap-2 text-base font-medium'>
              <Timer className='text-muted-foreground h-5 w-5' />
              Duration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TimeDisplay />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className='pb-3'>
            <CardTitle className='flex items-center gap-2 text-base font-medium'>
              <Clock className='text-muted-foreground h-5 w-5' />
              Fuel Amount
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FuelCounter />
          </CardContent>
        </Card>

        <Card className='sm:col-span-2'>
          <CardHeader className='pb-3'>
            <CardTitle className='text-base font-medium'>
              Resource Yields
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResourceTable />
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
