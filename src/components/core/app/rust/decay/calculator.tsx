'use client';

import { DecayInfo } from '@/components/core/app/rust/decay/decay-info';
import { HpInput } from '@/components/core/app/rust/decay/hp-input';
import { MaterialSelector } from '@/components/core/app/rust/decay/material-selector';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { useDecayStore } from '@/store/decay';

export function DecayCalculator() {
  const { decayInfo } = useDecayStore();

  return (
    <div>
      <Card className='w-full'>
        <CardHeader className='space-y-2'>
          <div>
            <CardTitle className='text-center text-2xl sm:text-3xl'>
              Decay Calculator
            </CardTitle>
            <CardDescription className='text-center'>
              Calculate when your walls will decay based on their current HP
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className='space-y-8'>
          <div className='space-y-4'>
            <MaterialSelector />
            <HpInput />
            {decayInfo && <DecayInfo />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
