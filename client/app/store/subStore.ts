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
        bannerPreview,
        iconPreview,
        username,
      }: CreateSubProps) => {
        set({ loading: true });

        const originalSubs = get().subs;
        const originalFilteredSubs = get().filteredSubs;
        const tempId = Math.random() * 100000;

        const optimisticSub: Sub = {
          id: tempId,
          slug: title, // 임시 slug
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          title,
          description,
          bannerUrl: bannerPreview || '',
          iconUrl: iconPreview || '',
          username,
          profileUser: null,
        };

        set((state) => ({
          subs: [optimisticSub, ...state.subs],
          filteredSubs: !optimisticSub.profileUser
            ? [optimisticSub, ...state.filteredSubs]
            : state.filteredSubs,
        }));

        try {
          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', description);
          if (banner) formData.append('banner', banner);
          if (icon) formData.append('icon', icon);

          const { data: newSub } = await clientAxiosInstance.post(
            '/api/sub/create',
            formData
          );

          set((state) => ({
            subs: [newSub, ...state.subs.filter((sub) => sub.id !== tempId)],
            filteredSubs: [
              newSub,
              ...state.filteredSubs.filter((sub) => sub.id !== tempId),
            ],
          }));
        } catch (err: unknown) {
          const error = err as CustomError;
          console.error('Create Sub failed:', error);

          set({ subs: originalSubs, filteredSubs: originalFilteredSubs });

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
