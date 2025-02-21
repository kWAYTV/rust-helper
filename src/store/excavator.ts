import { create } from 'zustand';

import {
  EXCAVATOR_DATA,
  EXCAVATOR_TIME_PER_FUEL,
  QUARRY_DATA
} from '@/constants/excavator';
import type { OperationType, ResourceItem } from '@/types/excavator';

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
}

export const useExcavatorStore = create<ExcavatorState>((set, get) => ({
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

      return {
        selectedOperation: operation,
        timePerFuel: newTimePerFuel,
        totalTime: state.dieselFuel * newTimePerFuel,
        resources: newResources
      };
    }),

  incrementFuel: () => get().setDieselFuel(get().dieselFuel + 1),
  decrementFuel: () => get().setDieselFuel(get().dieselFuel - 1)
}));
