'use client';

import { AnimatePresence, motion } from 'motion/react';
import { Clock, Shield, Trash2 } from 'lucide-react';

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
            <div className='space-y-2'>
              <Label htmlFor='material'>Material Type</Label>
              <div className='flex items-center gap-2'>
                <motion.div
                  className='flex-1'
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Select
                    value={selectedMaterial?.name}
                    onValueChange={setMaterial}
                  >
                    <SelectTrigger id='material'>
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
                </motion.div>
                <AnimatePresence>
                  {previousMaterial && previousHp > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={undo}
                        title='Undo material change'
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence mode='wait'>
              {selectedMaterial ? (
                <motion.div
                  key='material-selected'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className='space-y-4'
                >
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
                        />
                      </div>
                      <Button
                        variant='outline'
                        size='icon'
                        onClick={clear}
                        className='shrink-0'
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
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className='rounded-lg border p-4'
                    >
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
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key='material-empty'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='py-8 text-center'
                >
                  <div className='bg-muted/50 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full p-4'>
                    <Shield className='text-muted-foreground h-8 w-8' />
                  </div>
                  <p className='text-muted-foreground'>
                    Select a material type to calculate decay time
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
