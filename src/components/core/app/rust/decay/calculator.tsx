'use client';

import { motion } from 'motion/react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { DecayInfo } from '@/components/core/app/rust/decay/decay-info';
import { HpInput } from '@/components/core/app/rust/decay/hp-input';
import { MaterialSelector } from '@/components/core/app/rust/decay/material-selector';
import { useDecayStore } from '@/store/decay';

export function DecayCalculator() {
  const { decayInfo } = useDecayStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className='w-full'>
        <CardHeader className='space-y-2'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className='text-center text-2xl sm:text-3xl'>
              Decay Calculator
            </CardTitle>
            <CardDescription className='text-center'>
              Calculate when your walls will decay based on their current HP
            </CardDescription>
          </motion.div>
        </CardHeader>

        <CardContent className='space-y-8'>
          <div className='space-y-4'>
            <MaterialSelector />
            <HpInput />
            {decayInfo && <DecayInfo />}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
