import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { UIState } from '../types/store';

const initialState = {
  leftNavByHeaderVisible: false,
  leftNavVisible: true,
};
export const useUIStore = create(
  persist<UIState>(
    (set) => ({
      ...initialState,

      toggleLeftNav: () => {
        set((state) => ({
          leftNavVisible: !state.leftNavVisible,
        }));
      },

      toggleLeftNavByHeader: () => {
        set((state) => ({
          leftNavByHeaderVisible: !state.leftNavByHeaderVisible,
        }));
      },

      setLeftNavByHeaderVisible: (visible: boolean) => {
        set(() => ({
          leftNavByHeaderVisible: visible,
        }));
      },
    }),
    { name: 'ui-store' }
  )
);
