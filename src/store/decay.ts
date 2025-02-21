import { toast } from 'sonner';
import { create } from 'zustand';

import { materials } from '@/constants/decay';
import { calculateDecay } from '@/helpers/decay';
import type { DecayInfo, Material } from '@/types/decay/decay';

interface DecayStore {
  // State
  selectedMaterial: Material | null;
  currentHp: number;
  previousMaterial: Material | null;
  previousHp: number;
  decayInfo: DecayInfo;
  error: string;

  // Actions
  setMaterial: (materialName: string) => void;
  setHp: (hp: number) => void;
  clear: () => void;
  undo: () => void;
}

export const useDecayStore = create<DecayStore>((set, get) => ({
  // Initial state
  selectedMaterial: null,
  currentHp: 0,
  previousMaterial: null,
  previousHp: 0,
  decayInfo: {
    timeLeft: '',
    decayDateTime: ''
  },
  error: '',

  // Actions
  setMaterial: (materialName: string) => {
    const material = materials.find(mat => mat.name === materialName) || null;
    const state = get();

    if (material && state.selectedMaterial) {
      // Store previous state
      const previousMaterial = state.selectedMaterial;
      const previousHp = state.currentHp;

      // Calculate proportional HP for the new material
      const hpRatio = material.maxHp / state.selectedMaterial.maxHp;
      const newHp = Math.min(Math.round(state.currentHp * hpRatio), material.maxHp);

      toast.info(`Adjusted HP from ${state.currentHp} to ${newHp} for ${material.name}`);

      set({
        selectedMaterial: material,
        currentHp: newHp,
        previousMaterial,
        previousHp,
        error: '',
        decayInfo: calculateDecay(material, newHp)
      });
    } else {
      set({
        selectedMaterial: material,
        currentHp: 0,
        error: '',
        decayInfo: {
          timeLeft: '',
          decayDateTime: ''
        }
      });
      if (material) {
        toast.info(`Selected ${material.name}`);
      }
    }
  },

  setHp: (hp: number) => {
    const state = get();
    const { selectedMaterial } = state;

    if (!selectedMaterial) {
      set({ currentHp: 0, error: 'Please select a material first' });
      toast.error('Please select a material first');
      return;
    }

    if (hp > selectedMaterial.maxHp) {
      set({
        currentHp: hp,
        error: `Maximum HP for ${selectedMaterial.name} is ${selectedMaterial.maxHp}`,
        decayInfo: {
          timeLeft: '',
          decayDateTime: ''
        }
      });
      toast.error(`Maximum HP for ${selectedMaterial.name} is ${selectedMaterial.maxHp}`);
      return;
    }

    if (hp < 0) {
      set({
        currentHp: hp,
        error: 'HP cannot be negative',
        decayInfo: {
          timeLeft: '',
          decayDateTime: ''
        }
      });
      toast.error('HP cannot be negative');
      return;
    }

    set({
      currentHp: hp,
      error: '',
      decayInfo: hp > 0 ? calculateDecay(selectedMaterial, hp) : {
        timeLeft: '',
        decayDateTime: ''
      }
    });

    // Show toast for significant HP changes
    if (hp % 500 === 0 && hp > 0) {
      toast.info(`Set HP to ${hp}`);
    }
  },

  clear: () => {
    set({
      selectedMaterial: null,
      currentHp: 0,
      previousMaterial: null,
      previousHp: 0,
      decayInfo: {
        timeLeft: '',
        decayDateTime: ''
      },
      error: ''
    });
    toast.info('Reset decay calculator');
  },

  undo: () => {
    const state = get();
    if (state.previousMaterial && state.previousHp > 0) {
      set({
        selectedMaterial: state.previousMaterial,
        currentHp: state.previousHp,
        previousMaterial: null,
        previousHp: 0,
        error: '',
        decayInfo: calculateDecay(state.previousMaterial, state.previousHp)
      });
      toast.info(`Reverted back to ${state.previousMaterial.name} with ${state.previousHp} HP`);
    }
  }
}));
