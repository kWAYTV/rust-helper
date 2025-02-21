'use client';

import { Clock, Timer } from 'lucide-react';

import { Progress } from '@/components/ui/progress';
import { useDecayStore } from '@/store/decay';

export function DecayInfo() {
  const { decayInfo, selectedMaterial, currentHp } = useDecayStore();

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Timer className='text-muted-foreground h-5 w-5' />
          <span>Time until decay:</span>
        </div>
        <span className='text-primary font-semibold'>{decayInfo.timeLeft}</span>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Clock className='text-muted-foreground h-5 w-5' />
          <span>Decay date:</span>
        </div>
        <span className='text-muted-foreground font-medium'>
          {decayInfo.decayDateTime}
        </span>
      </div>
      <Progress
        value={
          selectedMaterial ? (currentHp / selectedMaterial.maxHp) * 100 : 0
        }
        className='h-2'
      />
    </div>
  );
}
