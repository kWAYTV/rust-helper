'use client';

import { Blocks, HelpCircle, Home, Shield } from 'lucide-react';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { materials } from '@/constants/decay';
import { useDecayStore } from '@/store/decay';

export function MaterialSelector() {
  const { selectedMaterial, setMaterial } = useDecayStore();

  return (
    <div className='space-y-1.5'>
      <div className='flex items-center gap-2'>
        <Label htmlFor='material-type'>Material Type</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className='h-4 w-4 text-muted-foreground' />
            </TooltipTrigger>
            <TooltipContent>
              <p>Select the building material to calculate decay time</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Select
        value={selectedMaterial?.name || ''}
        onValueChange={setMaterial}
      >
        <SelectTrigger id='material-type'>
          <SelectValue placeholder='Select material type' />
        </SelectTrigger>
        <SelectContent>
          {materials.map(material => (
            <SelectItem key={material.name} value={material.name}>
              <div className='flex items-center gap-2'>
                {material.name.toLowerCase().includes('wood') ? (
                  <Blocks className='h-4 w-4' />
                ) : material.name.toLowerCase().includes('stone') ? (
                  <Home className='h-4 w-4' />
                ) : (
                  <Shield className='h-4 w-4' />
                )}
                {material.name}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
