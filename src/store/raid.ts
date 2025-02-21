import { toast } from 'sonner';
import { create } from 'zustand';

interface RaidItem {
  name: string;
  quantity: number;
  sulfurCost: number;
}

interface RaidStore {
  // State
  raidType: string;
  targetItems: RaidItem[];
  totalSulfur: number;

  // Actions
  setRaidType: (type: string) => void;
  addItem: (item: RaidItem) => void;
  removeItem: (itemName: string) => void;
  clear: () => void;
  calculateCost: () => void;
}

export const useRaidStore = create<RaidStore>((set, get) => ({
  // Initial state
  raidType: '',
  targetItems: [],
  totalSulfur: 0,

  // Actions
  setRaidType: (type: string) => {
    set({ raidType: type });
    toast.info(`Selected ${type} raid type`);
  },

  addItem: (item: RaidItem) => {
    set(state => ({
      targetItems: [...state.targetItems, item]
    }));
    toast.success(`Added ${item.quantity}x ${item.name}`);
  },

  removeItem: (itemName: string) => {
    set(state => ({
      targetItems: state.targetItems.filter(item => item.name !== itemName)
    }));
    toast.info(`Removed ${itemName} from raid calculation`);
  },

  calculateCost: () => {
    const state = get();
    const total = state.targetItems.reduce(
      (sum, item) => sum + item.sulfurCost * item.quantity,
      0
    );
    set({ totalSulfur: total });
    toast.success(`Total raid cost: ${total} sulfur`);
  },

  clear: () => {
    set({
      raidType: '',
      targetItems: [],
      totalSulfur: 0
    });
    toast.info('Reset raid calculator');
  }
}));
