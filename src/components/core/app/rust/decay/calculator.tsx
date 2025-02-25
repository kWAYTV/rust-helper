'use client';

import { DecayCalculatorShell } from '@/components/core/app/rust/decay/calculator-shell';
import { DecayInfo } from '@/components/core/app/rust/decay/decay-info';
import { HpInput } from '@/components/core/app/rust/decay/hp-input';
import { MaterialSelector } from '@/components/core/app/rust/decay/material-selector';
import { useDecayStore } from '@/store/decay';

export function DecayCalculator() {
  const { decayInfo } = useDecayStore();

  return (
    <DecayCalculatorShell>
      <div className='space-y-4'>
        <MaterialSelector />
        <HpInput />
        {decayInfo && <DecayInfo />}
      </div>
    </DecayCalculatorShell>
  );
}
