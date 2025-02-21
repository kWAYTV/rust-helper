'use client';

import { Clock, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';

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
import { calculateDecay } from '@/lib/decay';
import type { DecayInfo, Material } from '@/types/decay';

export function DecayCalculator() {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(
    null
  );
  const [currentHp, setCurrentHp] = useState<number>(0);
  const [decayInfo, setDecayInfo] = useState<DecayInfo>({
    timeLeft: '',
    decayDateTime: ''
  });
  const [error, setError] = useState<string>('');

  const handleMaterialChange = (value: string) => {
    const material = materials.find(mat => mat.name === value) || null;
    setSelectedMaterial(material);

    if (material) {
      if (currentHp > material.maxHp) {
        setCurrentHp(0);
        setError(
          `HP cannot exceed max HP of ${material.maxHp} for selected material.`
        );
        setDecayInfo({ timeLeft: '', decayDateTime: '' });
      } else {
        setError('');
      }
    } else {
      setCurrentHp(0);
      setError('');
      setDecayInfo({ timeLeft: '', decayDateTime: '' });
    }
  };

  const handleHpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setCurrentHp(0);
      setError('');
      setDecayInfo({ timeLeft: '', decayDateTime: '' });
    } else {
      const hp = parseFloat(value);
      if (isNaN(hp) || hp < 0) {
        setError('Please enter a valid HP value.');
        setDecayInfo({ timeLeft: '', decayDateTime: '' });
      } else if (selectedMaterial && hp > selectedMaterial.maxHp) {
        setError(
          `HP cannot exceed max HP of ${selectedMaterial.maxHp} for selected material.`
        );
        setDecayInfo({ timeLeft: '', decayDateTime: '' });
      } else {
        setError('');
        setCurrentHp(hp);
      }
    }
  };

  useEffect(() => {
    if (selectedMaterial && currentHp >= 0 && !error) {
      const result = calculateDecay(selectedMaterial, currentHp);
      setDecayInfo(result);
    } else {
      setDecayInfo({ timeLeft: '', decayDateTime: '' });
    }
  }, [selectedMaterial, currentHp, error]);

  return (
    <Card className='mx-auto max-w-2xl'>
      <CardHeader>
        <CardTitle className='flex items-center justify-center gap-2'>
          <Shield className='h-6 w-6' />
          Wall Decay Calculator
        </CardTitle>
        <CardDescription className='text-center'>
          Calculate when your walls will decay based on their current HP
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-6'>
        {/* Material Selection */}
        <div className='flex flex-col items-center gap-2'>
          <Label htmlFor='material' className='flex items-center gap-2'>
            Building Material
            {selectedMaterial && (
              <span className='text-muted-foreground text-sm font-normal'>
                Max HP: {selectedMaterial.maxHp} • Decay Time:{' '}
                {selectedMaterial.decayTime}h
              </span>
            )}
          </Label>
          <Select
            value={selectedMaterial?.name || ''}
            onValueChange={handleMaterialChange}
            className='w-full max-w-md'
          >
            <SelectTrigger>
              <SelectValue placeholder='Choose a material' />
            </SelectTrigger>
            <SelectContent>
              {materials.map(material => (
                <SelectItem
                  key={material.name}
                  value={material.name}
                  className='flex items-center justify-between'
                >
                  <span>{material.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Current HP Input */}
        <div className='flex flex-col items-center gap-2'>
          <Label htmlFor='currentHp' className='flex items-center gap-2'>
            Current HP
            {selectedMaterial && currentHp > 0 && !error && (
              <span className='text-muted-foreground text-sm font-normal'>
                {Math.round((currentHp / selectedMaterial.maxHp) * 100)}%
                remaining
              </span>
            )}
          </Label>
          <div className='w-full max-w-md space-y-2'>
            <Input
              id='currentHp'
              type='number'
              value={currentHp === 0 && error === '' ? '' : currentHp}
              onChange={handleHpChange}
              min='0'
              disabled={!selectedMaterial}
              placeholder={
                selectedMaterial
                  ? `0 - ${selectedMaterial.maxHp}`
                  : 'Select a material first'
              }
            />
            {selectedMaterial && !error && (
              <Progress
                value={(currentHp / selectedMaterial.maxHp) * 100}
                className='h-2'
              />
            )}
            {error && (
              <p className='text-destructive text-center text-sm'>{error}</p>
            )}
          </div>
        </div>

        {/* Results */}
        {decayInfo.timeLeft && !error && (
          <div className='flex flex-col items-center'>
            <Card className='w-full max-w-md border-2'>
              <CardHeader className='pb-2'>
                <div className='flex items-center justify-center gap-2 text-2xl font-bold'>
                  <Clock className='h-6 w-6' />
                  {decayInfo.timeLeft}
                </div>
              </CardHeader>
              <CardContent>
                <p className='text-muted-foreground text-center'>
                  Expected Decay Time:
                  <br />
                  {decayInfo.decayDateTime}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Material Info Cards */}
        <div className='grid gap-4 pt-4 sm:grid-cols-2'>
          {selectedMaterial && (
            <>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-center text-sm'>
                    Decay Rate
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                  <p className='text-2xl font-bold'>
                    {(
                      selectedMaterial.maxHp / selectedMaterial.decayTime
                    ).toFixed(1)}
                    <span className='text-muted-foreground text-sm font-normal'>
                      {' '}
                      HP/hour
                    </span>
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='pb-2'>
                  <CardTitle className='text-center text-sm'>
                    Full Decay Time
                  </CardTitle>
                </CardHeader>
                <CardContent className='text-center'>
                  <p className='text-2xl font-bold'>
                    {selectedMaterial.decayTime}
                    <span className='text-muted-foreground text-sm font-normal'>
                      {' '}
                      hours
                    </span>
                  </p>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
