import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { Sub } from '../types';
import { SubState } from '../types/store';
import { clientAxiosInstance } from '../utils/axios';

export const useSubStore = create(
  persist<SubState>(
    (set) => ({
      subs: [],
      filterdSub: [],
      loading: false,
      error: null,

      getMySubs: async () => {
        set({ loading: true });
        set({ error: null });

        try {
          const { data } =
            await clientAxiosInstance.get<Sub[]>('/api/sub/myList');

          set({
            subs: data,
            filterdSub: data.filter((sub) => !sub.profileUser),
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          set({ error: error as Error });
        }
      },

      addOptimisticSub: (newSub: Sub) => {
        set((state) => ({
          subs: [newSub, ...state.subs],

          filterdSub: !newSub.profileUser
            ? [newSub, ...state.filterdSub]
            : state.filterdSub,
        }));
      },
    }),
    { name: 'sub-storage' }
  )
);
