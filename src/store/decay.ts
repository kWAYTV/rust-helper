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
      const newHp = Math.min(
        Math.round(state.currentHp * hpRatio),
        material.maxHp
      );

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
    }
  },

  setHp: (hp: number) => {
    const state = get();
    const { selectedMaterial } = state;

    if (!selectedMaterial) {
      set({ currentHp: 0, error: 'Please select a material first' });
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
      return;
    }

    set({
      currentHp: hp,
      error: '',
      decayInfo:
        hp > 0
          ? calculateDecay(selectedMaterial, hp)
          : {
              timeLeft: '',
              decayDateTime: ''
            }
    });
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
    }
  }
}));
