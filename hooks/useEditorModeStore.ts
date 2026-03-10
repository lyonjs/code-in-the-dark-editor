import { create } from 'zustand';

interface EditorModeStore {
  powerMode: boolean;
  ultraMode: boolean;
  setPowerMode: (value: boolean) => void;
  setUltraMode: (value: boolean) => void;
  reset: () => void;
}

export const useEditorModeStore = create<EditorModeStore>((set) => ({
  powerMode: false,
  ultraMode: false,
  setPowerMode: (value) => set({ powerMode: value }),
  setUltraMode: (value) => set({ ultraMode: value }),
  reset: () => set({ powerMode: false, ultraMode: false }),
}));
