import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CreateSubProps, Sub } from '../types';
import { SubState } from '../types/store';
import { clientAxiosInstance } from '../utils/axios';
import { usePostStore } from './postStore';

const initialState = {
  subs: [],
  popularSubs: [],
  selectedSub: null,
  loading: false,
};

export const useSubStore = create(
  persist<SubState>(
    (set, get) => ({
      ...initialState,

      createSub: async ({
        tags,
        visibility,
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
        const tempId = Math.random() * 100000;

        const optimisticSub: Sub = {
          id: tempId,
          slug: title,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags,
          visibility,
          title,
          description,
          bannerUrl: bannerPreview || '',
          iconUrl: iconPreview || '',
          username,
          subscriberCount: 0,
          postCount: 0,
          isSubscribed: false,
          isOwner: false,
        };

        set((state) => ({
          subs: [optimisticSub, ...state.subs],
        }));

        try {
          const formData = new FormData();

          formData.append('tags', JSON.stringify(tags));
          formData.append('visibility', visibility);
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
          }));
        } catch (error) {
          console.error('Create Sub failed:', error);

          set({ subs: originalSubs });

          throw error;
        } finally {
          set({ loading: false });
        }
      },

      fetchSubDetail: async (slug: string) => {
        try {
          const { data } = await clientAxiosInstance.get(`/api/sub/${slug}`);
          set({ selectedSub: data });

          return data;
        } catch (error) {
          console.error('Failed to fetch sub detail:', error);
          throw error;
        }
      },

      getMySubs: async () => {
        set({ loading: true });

        try {
          const { data } =
            await clientAxiosInstance.get<Sub[]>('/api/sub/myList');

          set({
            subs: data,
          });
        } catch (error) {
          console.error('Get My Subs failed:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      getPopularSubs: async () => {
        set({ loading: true });

        try {
          const { data } =
            await clientAxiosInstance.get<Sub[]>('/api/sub/popular');

          set({
            popularSubs: data,
          });
        } catch (error) {
          console.error('Get Popular Subs failed:', error);
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      handleSubscribe: async (sub: Sub) => {
        const originSubs = get().subs;

        const existingSubIndex = originSubs.findIndex((s) => s.id === sub.id);

        const isCurSubscribed = !!originSubs.find((s) => s.id === sub.id);

        let updatedSubs: Sub[];

        if (isCurSubscribed) {
          updatedSubs = originSubs.map((s) =>
            s.id === sub.id
              ? {
                  ...s,
                  isSubscribed: false,
                  subscriberCount: s.subscriberCount - 1,
                }
              : s
          );
        } else {
          if (existingSubIndex !== -1) {
            updatedSubs = originSubs.map((s) =>
              s.id === sub.id
                ? {
                    ...s,
                    isSubscribed: true,
                    subscriberCount: s.subscriberCount + 1,
                  }
                : s
            );
          } else {
            updatedSubs = [
              {
                ...sub,
                isSubscribed: true,
                subscriberCount: sub.subscriberCount + 1,
              },
              ...originSubs,
            ];
          }
        }

        if (sub.id === get().selectedSub?.id) {
          set({ selectedSub: { ...sub, isSubscribed: !isCurSubscribed } });
        }

        set({ subs: updatedSubs });

        usePostStore
          .getState()
          .updatePostSubscribeStatus(sub.id, !isCurSubscribed);

        try {
          const { data } = await clientAxiosInstance.patch(
            `api/sub/${sub.slug}/subscribe`,
            {
              id: sub.id,
            }
          );

          if (data?.isSubscribed) {
            set((state) => ({
              subs: [data, ...state.subs.filter((s) => s.id !== data.id)],
            }));
          } else {
            set((state) => ({
              subs: state.subs.filter((s) => s.id !== data.id),
            }));
          }

          if (sub.id === get().selectedSub?.id) {
            set({
              selectedSub: {
                ...sub,
                isSubscribed: data?.isSubscribed,
              },
            });
          }

          usePostStore
            .getState()
            .updatePostSubscribeStatus(sub.id, data?.isSubscribed);

          return data.isSubscribed;
        } catch (error) {
          set({ subs: originSubs });
          usePostStore
            .getState()
            .updatePostSubscribeStatus(sub.id, isCurSubscribed);
          throw error;
        } finally {
          set({ loading: false });
        }
      },

      setSelectedSub: (sub) => set({ selectedSub: sub || null }),

      clearSubs: () => {
        set({ subs: [] });
      },

      clearPopularSubs: () => {
        set({ popularSubs: [] });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'sub-storage',
    }
  )
);
