import { toast } from 'sonner';
import { create } from 'zustand';

import {
  EXCAVATOR_DATA,
  EXCAVATOR_TIME_PER_FUEL,
  QUARRY_DATA
} from '@/constants/excavator';
import type { OperationType, ResourceItem } from '@/types/excavator/excavator';

interface ExcavatorState {
  dieselFuel: number;
  selectedOperation: OperationType;
  timePerFuel: number;
  totalTime: number;
  resources: ResourceItem[];
  setDieselFuel: (amount: number) => void;
  setOperation: (operation: OperationType) => void;
  incrementFuel: () => void;
  decrementFuel: () => void;
  clear: () => void;
}

export const useExcavatorStore = create<ExcavatorState>(set => ({
  dieselFuel: 1,
  selectedOperation: 'Excavator',
  timePerFuel: EXCAVATOR_TIME_PER_FUEL,
  totalTime: EXCAVATOR_TIME_PER_FUEL,
  resources: EXCAVATOR_DATA.filter(item => item.name !== 'Diesel Fuel'),

  setDieselFuel: (amount: number) =>
    set(state => {
      const newAmount = Math.max(1, amount);
      return {
        dieselFuel: newAmount,
        totalTime: newAmount * state.timePerFuel
      };
    }),

  setOperation: (operation: OperationType) =>
    set(state => {
      const newTimePerFuel =
        operation === 'Excavator'
          ? EXCAVATOR_TIME_PER_FUEL
          : (QUARRY_DATA.find(q => q.type === operation)
              ?.timePerFuelInSeconds ?? EXCAVATOR_TIME_PER_FUEL);

      const newResources =
        operation === 'Excavator'
          ? EXCAVATOR_DATA.filter(item => item.name !== 'Diesel Fuel')
          : (QUARRY_DATA.find(q => q.type === operation)?.yield ?? []);

      toast.info(`Switched to ${operation} operation`);
      return {
        selectedOperation: operation,
        timePerFuel: newTimePerFuel,
        totalTime: state.dieselFuel * newTimePerFuel,
        resources: newResources
      };
    }),

  incrementFuel: () =>
    set(state => {
      const newFuel = state.dieselFuel + 1;
      if (newFuel % 100 === 0) {
        toast.info(`Added ${newFuel} diesel fuel`);
      }
      return { dieselFuel: newFuel, totalTime: newFuel * state.timePerFuel };
    }),

  decrementFuel: () =>
    set(state => {
      if (state.dieselFuel <= 1) {
        toast.error('Minimum fuel amount reached');
        return state;
      }
      return {
        dieselFuel: state.dieselFuel - 1,
        totalTime: (state.dieselFuel - 1) * state.timePerFuel
      };
    }),

  clear: () => {
    set({
      dieselFuel: 1,
      selectedOperation: 'Excavator',
      timePerFuel: EXCAVATOR_TIME_PER_FUEL,
      totalTime: EXCAVATOR_TIME_PER_FUEL,
      resources: EXCAVATOR_DATA.filter(item => item.name !== 'Diesel Fuel')
    });
    toast.info('Reset excavator calculator');
  }
}));
