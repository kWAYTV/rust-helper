'use client';

import { AnimatePresence, motion } from 'motion/react';

import { EmptyState } from '@/components/core/app/rust/excavator/empty-state';
import { OperationContent } from '@/components/core/app/rust/excavator/operation-content';
import { OperationSelector } from '@/components/core/app/rust/excavator/operation-selector';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useExcavatorStore } from '@/store/excavator';

export function ExcavatorCalculator() {
  const { selectedOperation } = useExcavatorStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className='w-full'>
        <CardHeader className='space-y-2 pb-4'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className='text-center text-2xl sm:text-3xl'>
              Resource Yield Calculator
            </CardTitle>
            <CardDescription className='text-center'>
              Calculate resource yields from Excavator and Quarries
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className='space-y-6'>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <OperationSelector />
          </motion.div>

          <AnimatePresence mode='wait'>
            {selectedOperation ? <OperationContent /> : <EmptyState />}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
