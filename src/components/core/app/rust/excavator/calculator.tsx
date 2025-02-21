'use client';

import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';

import { FuelCounter } from '@/components/core/app/rust/excavator/fuel-counter';
import { ResourceTable } from '@/components/core/app/rust/excavator/resource-table';
import { TimeDisplay } from '@/components/core/app/rust/excavator/time-display';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { EXCAVATOR_DATA, QUARRY_DATA } from '@/constants/excavator';
import { useExcavatorStore } from '@/store/excavator';
import type { OperationType } from '@/types/excavator/excavator';
import { useState } from 'react';

export function ExcavatorCalculator() {
  const { selectedOperation, setOperation } = useExcavatorStore();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const getFuelImage = () => {
    if (selectedOperation === 'Excavator') {
      return EXCAVATOR_DATA.find(item => item.name === 'Diesel Fuel')?.image;
    }
    return QUARRY_DATA.find(q => q.type === selectedOperation)?.fuel;
  };

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
            <div className='space-y-1.5'>
              <Label htmlFor='operation-type'>Operation Type</Label>
              <Select
                value={selectedOperation}
                onValueChange={value => setOperation(value as OperationType)}
              >
                <SelectTrigger id='operation-type'>
                  <SelectValue placeholder='Select operation type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Excavator'>Excavator</SelectItem>
                  <SelectItem value='HQM Quarry'>HQM Quarry</SelectItem>
                  <SelectItem value='Sulfur Quarry'>Sulfur Quarry</SelectItem>
                  <SelectItem value='Stone Quarry'>Stone Quarry</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          <AnimatePresence mode='wait'>
            {selectedOperation ? (
              <motion.div
                key='operation-content'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className='space-y-4'
              >
                <Collapsible open={isInfoOpen} onOpenChange={setIsInfoOpen}>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      {getFuelImage() && (
                        <div className='relative h-8 w-8'>
                          <Image
                            src={getFuelImage()!}
                            alt='Fuel'
                            fill
                            sizes='2rem'
                            className='object-contain'
                          />
                        </div>
                      )}
                      <span className='text-sm font-medium'>
                        {selectedOperation === 'Excavator' ? 'Diesel Fuel Info' : 'Low Grade Fuel Info'}
                      </span>
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant='ghost' size='sm'>
                        <Info className='mr-2 h-4 w-4' />
                        {isInfoOpen ? (
                          <ChevronUp className='h-4 w-4' />
                        ) : (
                          <ChevronDown className='h-4 w-4' />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                  <CollapsibleContent className='pt-2'>
                    <div className='rounded-lg bg-muted/50 p-3 text-sm'>
                      <p className='text-muted-foreground'>
                        {selectedOperation === 'Excavator'
                          ? 'The Excavator is located at the Mining Outpost. Each unit of Diesel Fuel runs for 5 minutes.'
                          : `${selectedOperation} can be found in various locations. Each unit of Low Grade Fuel runs for 5 minutes.`}
                      </p>
                    </div>
                  </CollapsibleContent>
                </Collapsible>

                <Separator />

                <div className='space-y-4'>
                  <FuelCounter />
                  <TimeDisplay />
                  <ResourceTable />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key='operation-empty'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='py-6 text-center'
              >
                <div className='bg-muted/50 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='text-muted-foreground h-6 w-6'
                  >
                    <path d='M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16' />
                  </svg>
                </div>
                <p className='text-muted-foreground text-sm'>
                  Select an operation type to calculate resource yields
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
