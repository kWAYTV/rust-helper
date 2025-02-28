'use client';

import { Info, Shield } from 'lucide-react';
import { memo } from 'react';

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
  TooltipTrigger
} from '@/components/ui/tooltip';
import { materials } from '@/constants/decay';
import { useDecayStore } from '@/store/decay';
import { type Material } from '@/types/decay/decay';

interface MaterialSelectorProps {
  className?: string;
}

const MaterialSelector = memo(function MaterialSelector({
  className
}: MaterialSelectorProps) {
  const selectedMaterial = useDecayStore(state => state.selectedMaterial);
  const setMaterial = useDecayStore(state => state.setMaterial);

  const handleMaterialChange = (value: string) => {
    setMaterial(value);
  };

  return (
    <div className={className}>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Shield className='text-primary h-4 w-4' />
            <label
              htmlFor='material-select'
              className='text-sm leading-none font-medium'
            >
              Structure Material
            </label>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='text-muted-foreground h-4 w-4' />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select the material type to calculate decay time</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <Select
          value={selectedMaterial?.name || ''}
          onValueChange={handleMaterialChange}
        >
          <SelectTrigger
            id='material-select'
            className='from-background to-muted/10 bg-gradient-to-r'
          >
            <SelectValue placeholder='Select material' />
          </SelectTrigger>
          <SelectContent>
            {materials.map((material: Material) => (
              <SelectItem
                key={material.name}
                value={material.name}
                className='flex items-center gap-2'
              >
                {material.name}{' '}
                <span className='text-muted-foreground text-xs'>
                  ({material.maxHp} HP)
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedMaterial && (
          <p className='text-muted-foreground text-xs'>
            Max Health:{' '}
            <span className='font-medium'>{selectedMaterial.maxHp} HP</span> •
            Decay Time:{' '}
            <span className='font-medium'>
              {selectedMaterial.decayTime} hours
            </span>
          </p>
        )}
      </div>
    </div>
  );
});

export default MaterialSelector;
