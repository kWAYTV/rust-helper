import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

// Initial state to avoid repetition
const initialState = {
  dieselFuel: 1,
  selectedOperation: 'Excavator' as OperationType,
  timePerFuel: EXCAVATOR_TIME_PER_FUEL,
  totalTime: EXCAVATOR_TIME_PER_FUEL,
  resources: EXCAVATOR_DATA.filter(item => item.name !== 'Diesel Fuel')
};

export const useExcavatorStore = create<ExcavatorState>()(
  persist(
    set => ({
      ...initialState,

      setDieselFuel: (amount: number) =>
        set(state => ({
          dieselFuel: Math.max(1, amount),
          totalTime: Math.max(1, amount) * state.timePerFuel
        })),

      setOperation: (operation: OperationType) =>
        set(state => {
          // Get operation data more efficiently
          const quarryData =
            operation !== 'Excavator'
              ? QUARRY_DATA.find(q => q.type === operation)
              : null;

          const newTimePerFuel =
            quarryData?.timePerFuelInSeconds ?? EXCAVATOR_TIME_PER_FUEL;
          const newResources =
            quarryData?.yield ??
            EXCAVATOR_DATA.filter(item => item.name !== 'Diesel Fuel');

          toast.success(`Switched to ${operation} operation`);

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
          if (newFuel % 100 === 0)
            toast.success(`Added ${newFuel} diesel fuel`);

          return {
            dieselFuel: newFuel,
            totalTime: newFuel * state.timePerFuel
          };
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
        set(initialState);
        toast.success('Reset excavator calculator');
      }
    }),
    {
      name: 'excavator-storage',
      partialize: state => ({
        dieselFuel: state.dieselFuel,
        selectedOperation: state.selectedOperation
      })
    }
  )
);
