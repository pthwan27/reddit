import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CreateSubProps, CustomError, Sub } from '../types';
import { SubState } from '../types/store';
import { clientAxiosInstance } from '../utils/axios';

const initialState = {
  subs: [],
  filteredSubs: [],
  selectedSub: null,
  loading: false,
};

export const useSubStore = create(
  persist<SubState>(
    (set, get) => ({
      ...initialState,

      _hasHydrated: false,
      setHasHydrated: (hydrated) => {
        set({
          _hasHydrated: hydrated,
        });
      },

      createSub: async ({
        title,
        description,
        icon,
        banner,
      }: CreateSubProps) => {
        set({ loading: true });

        try {
          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', description);
          if (banner) formData.append('banner', banner);
          if (icon) formData.append('icon', icon);

          await clientAxiosInstance.post('/api/sub/create', formData);

          get().getMySubs();
          set({ loading: false });
        } catch (err: unknown) {
          const error = err as CustomError;
          console.error('Create Sub failed:', error);
          set({
            loading: false,
          });

          throw error;
        } finally {
          set({ loading: false });
        }
      },

      getMySubs: async () => {
        set({ loading: true });

        try {
          const { data } =
            await clientAxiosInstance.get<Sub[]>('/api/sub/myList');

          set({
            subs: data,
            filteredSubs: data.filter((sub) => !sub.profileUser),
            loading: false,
          });
        } catch (error) {
          set({ loading: false });
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      setSelectedSub: (sub) => set({ selectedSub: sub || null }),

      addOptimisticSub: (newSub: Sub) => {
        set((state) => ({
          subs: [newSub, ...state.subs],

          filterdSub: !newSub.profileUser
            ? [newSub, ...state.filteredSubs]
            : state.filteredSubs,
        }));
      },
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'sub-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
