'use client';

import { Clock, KeyRound, Shield, Trash2 } from 'lucide-react';
import { useRef } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { materials } from '@/constants/decay';
import { useCalculatorKeyboard } from '@/hooks/use-calculator-keyboard';
import { useDecayStore } from '@/store/decay';

export function DecayCalculator() {
  const {
    selectedMaterial,
    currentHp,
    previousMaterial,
    previousHp,
    decayInfo,
    error,
    setMaterial,
    setHp,
    clear,
    undo
  } = useDecayStore();

  // Refs for focusing elements
  const materialSelectRef = useRef<HTMLButtonElement>(null);
  const hpInputRef = useRef<HTMLInputElement>(null);

  // Setup keyboard shortcuts
  useCalculatorKeyboard({
    onClear: clear,
    onUndo: previousMaterial && previousHp > 0 ? undo : undefined,
    onIncrement: () => currentHp < (selectedMaterial?.maxHp || 0) && setHp(currentHp + 100),
    onDecrement: () => currentHp > 0 && setHp(currentHp - 100),
    onFocusNext: () => {
      if (document.activeElement === materialSelectRef.current) {
        hpInputRef.current?.focus();
      } else if (document.activeElement === hpInputRef.current) {
        materialSelectRef.current?.focus();
      } else {
        materialSelectRef.current?.focus();
      }
    },
    onFocusPrev: () => {
      if (document.activeElement === materialSelectRef.current) {
        hpInputRef.current?.focus();
      } else if (document.activeElement === hpInputRef.current) {
        materialSelectRef.current?.focus();
      } else {
        hpInputRef.current?.focus();
      }
    }
  });

  return (
    <Card className='w-full'>
      <CardHeader className='space-y-2'>
        <CardTitle className='text-center text-2xl sm:text-3xl'>
          Decay Calculator
        </CardTitle>
        <CardDescription className='text-center'>
          Calculate when your walls will decay based on their current HP
        </CardDescription>
        <div className='flex flex-col items-center gap-2'>
          <div className='flex items-center gap-1.5'>
            <KeyRound className='h-3 w-3' />
            <span className='text-sm text-muted-foreground'>Controls</span>
          </div>
          <div className='flex flex-wrap justify-center gap-2'>
            <Badge variant='outline' className='text-muted-foreground'>
              ↑/↓: ±100 HP
            </Badge>
            <Badge variant='outline' className='text-muted-foreground'>
              C: Clear
            </Badge>
            <Badge variant='outline' className='text-muted-foreground'>
              Ctrl+Z: Undo
            </Badge>
            <Badge variant='outline' className='text-muted-foreground'>
              Tab: Navigate
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className='space-y-8'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='material'>Material Type</Label>
            <div className='flex items-center gap-2'>
              <div className='flex-1'>
                <Select
                  value={selectedMaterial?.name}
                  onValueChange={setMaterial}
                >
                  <SelectTrigger id='material' ref={materialSelectRef}>
                    <SelectValue placeholder='Select material type' />
                  </SelectTrigger>
                  <SelectContent>
                    {materials.map(material => (
                      <SelectItem key={material.name} value={material.name}>
                        {material.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {previousMaterial && previousHp > 0 && (
                <Button
                  variant='outline'
                  size='icon'
                  onClick={undo}
                  title='Undo material change (Ctrl+Z)'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='h-4 w-4'
                  >
                    <path d='M9 14 4 9l5-5' />
                    <path d='M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11' />
                  </svg>
                </Button>
              )}
            </div>
          </div>

          {selectedMaterial && (
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='hp'>Current HP</Label>
                <div className='flex items-center gap-4'>
                  <div className='flex-1'>
                    <Input
                      id='hp'
                      type='number'
                      min={0}
                      max={selectedMaterial.maxHp}
                      value={currentHp || ''}
                      onChange={e => setHp(parseInt(e.target.value) || 0)}
                      className='w-full'
                      ref={hpInputRef}
                    />
                  </div>
                  <Button
                    variant='outline'
                    size='icon'
                    onClick={clear}
                    className='shrink-0'
                    title='Clear calculator (C)'
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
                {error && (
                  <p className='text-destructive text-sm font-medium'>
                    {error}
                  </p>
                )}
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between text-sm'>
                  <span className='text-muted-foreground'>HP</span>
                  <span className='font-medium'>
                    {currentHp} / {selectedMaterial.maxHp}
                  </span>
                </div>
                <Progress
                  value={(currentHp / selectedMaterial.maxHp) * 100}
                  className='h-2'
                />
              </div>

              {decayInfo.timeLeft && (
                <div className='rounded-lg border p-4'>
                  <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
                    <div className='flex items-center gap-2'>
                      <Shield className='text-primary h-4 w-4' />
                      <span className='text-sm font-medium'>
                        Time until decay
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Clock className='text-primary h-4 w-4' />
                      <span className='text-sm'>{decayInfo.timeLeft}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
