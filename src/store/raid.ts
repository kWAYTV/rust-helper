import { toast } from 'sonner';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { raidItems, sulfurCostPerUnit } from '@/constants/raid';
import {
  type CollectionItem,
  type DestructionMethod,
  type RaidItem,
  type RaidItemCategory,
  type RaidState,
  type SulfurCost
} from '@/types/rust/raid';

export const useRaidStore = create<RaidState>()(
  persist(
    set => ({
      // Collection
      collection: [],
      selectedMethod: 'c4',
      activeCategory: null,

      // UI State
      isCollectionOpen: false,

      // Actions
      setActiveCategory: category => {
        set({ activeCategory: category });
      },

      setSelectedMethod: method => {
        set({ selectedMethod: method });
      },

      addItem: item => {
        set(state => {
          const existingItem = state.collection.find(
            c => c.item.id === item.id
          );

          if (existingItem) {
            return {
              collection: state.collection.map(c =>
                c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
              )
            };
          } else {
            return {
              collection: [...state.collection, { item, quantity: 1 }]
            };
          }
        });
        toast.success(`Added ${item.name}`);
      },

      removeItem: item => {
        set(state => {
          const existingItem = state.collection.find(
            c => c.item.id === item.id
          );

          if (!existingItem) return state;

          if (existingItem.quantity === 1) {
            return {
              collection: state.collection.filter(c => c.item.id !== item.id)
            };
          } else {
            return {
              collection: state.collection.map(c =>
                c.item.id === item.id ? { ...c, quantity: c.quantity - 1 } : c
              )
            };
          }
        });
        toast.info(`Removed ${item.name}`);
      },

      resetAll: () => {
        set({
          collection: [],
          selectedMethod: 'c4',
          activeCategory: null,
          isCollectionOpen: false
        });
        toast.info('Reset raid calculator');
      },

      setCollectionOpen: isOpen => {
        set({ isCollectionOpen: isOpen });
      }
    }),
    {
      name: 'raid-calculator-storage'
    }
  )
);

// Utility functions to use with the store
export const calculateResources = (collection: CollectionItem[]) => {
  const resources = {
    c4: 0,
    bullets: 0,
    rockets: 0,
    satchel: 0
  };

  collection.forEach(c => {
    resources.c4 += c.item.destructionOptions.c4 * c.quantity;
    resources.bullets += c.item.destructionOptions.bullets * c.quantity;
    resources.rockets += c.item.destructionOptions.rockets * c.quantity;
    resources.satchel += c.item.destructionOptions.satchel * c.quantity;
  });

  return resources;
};

export const calculateSulfurCost = (
  collection: CollectionItem[],
  method: DestructionMethod
): number => {
  return collection.reduce((total, c) => {
    const methodQuantity = c.item.destructionOptions[method];
    const sulfurCost = sulfurCostPerUnit[method];
    return total + methodQuantity * c.quantity * sulfurCost;
  }, 0);
};

export const calculateAllSulfurCosts = (
  collection: CollectionItem[]
): SulfurCost[] => {
  const methods: DestructionMethod[] = ['c4', 'bullets', 'rockets', 'satchel'];

  return methods
    .map(method => ({
      method,
      quantity: calculateSulfurCost(collection, method)
    }))
    .sort((a, b) => a.quantity - b.quantity);
};

export const calculateBestOptionsSulfurCost = (
  collection: CollectionItem[],
  method: DestructionMethod
): number => {
  return collection.reduce((total, c) => {
    if (!c.item.bestOption) return total;

    const optionValue = c.item.bestOption[method];
    return total + optionValue * c.quantity * sulfurCostPerUnit[method];
  }, 0);
};

export const calculateBestOptionsQuantities = (
  collection: CollectionItem[]
) => {
  const methods: DestructionMethod[] = ['c4', 'bullets', 'rockets', 'satchel'];
  const totals: Partial<Record<DestructionMethod, number>> = {};

  methods.forEach(method => {
    const total = collection.reduce((sum, c) => {
      return sum + (c.item.bestOption?.[method] || 0) * c.quantity;
    }, 0);

    if (total > 0) {
      totals[method] = total;
    }
  });

  return totals;
};

export const getItemsByCategory = (
  category: RaidItemCategory | null
): RaidItem[] => {
  if (!category) return [];
  return raidItems.filter(item => item.category === category);
};
