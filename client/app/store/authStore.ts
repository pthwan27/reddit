import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { create } from 'zustand';

import { CustomError } from '../types';
import { AuthState } from '../types/store';
import { clientAxiosInstance } from '../utils/axios';
import { usePostStore } from './postStore';
import { useSubStore } from './subStore';

const initialState = {
  user: null,
  loading: true,
  mode: 'login' as 'login' | 'register',
};

export const useAuthStore = create<AuthState>((set, get) => ({
  ...initialState,

  setMode: (mode: 'login' | 'register') => set({ mode }),

  login: async (email: string, password: string, onSuccess?: () => void) => {
    try {
      set({ loading: true });
      const { data } = await clientAxiosInstance.post('/api/auth/login', {
        email,
        password,
      });

      set({ user: data.user });

      usePostStore.getState().fetchHomePosts(true);

      if (onSuccess) onSuccess();
    } catch (err) {
      const error = err as CustomError;
      console.error('Login failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await clientAxiosInstance.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ user: null });

      if (useSubStore.getState().selectedSub) {
        usePostStore
          .getState()
          .fetchSubPosts(useSubStore.getState().selectedSub?.id || 0);
      }
    }
  },
  register: async (
    email: string,
    username: string,
    password: string,
    onSuccess?: () => void
  ) => {
    try {
      set({ loading: true });
      const { data } = await clientAxiosInstance.post('/api/auth/register', {
        email,
        username,
        password,
      });

      if (onSuccess) onSuccess();

      set({ user: data.user });
    } catch (err) {
      const error = err as CustomError;
      console.error('Registration failed:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  refreshUser: async () => {
    try {
      const { data } = await clientAxiosInstance.get('/api/auth/me');

      set({ user: data.user });
    } catch (error) {
      console.error('Failed to refresh user:', error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },
  initAuth: () => {
    set({ loading: true });

    const refreshToken = async () => {
      const { data } = await clientAxiosInstance.post('/api/auth/refresh');

      if (data.user) {
        set({ user: data.user });
      }
    };

    let refreshTokenPromise: Promise<void> | null = null;

    clientAxiosInstance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status !== 401 || !originalRequest) {
          return Promise.reject(error);
        }

        if (
          originalRequest.url === '/api/auth/login' ||
          originalRequest.url === '/api/auth/register' ||
          originalRequest.url === '/api/auth/logout' ||
          originalRequest.url === '/api/auth/me' ||
          originalRequest.url === '/api/auth/refresh'
        ) {
          return Promise.reject(error);
        }

        if (originalRequest._retry) {
          return Promise.reject(error);
        }
        originalRequest._retry = true;

        try {
          if (!refreshTokenPromise) {
            refreshTokenPromise = refreshToken();
          }
          await refreshTokenPromise;
          return clientAxiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Unable to refresh token, logging out.', refreshError);

          useSubStore.getState().reset();
          usePostStore.getState().reset();

          set({ user: null });

          return Promise.reject(refreshError);
        } finally {
          refreshTokenPromise = null;
        }
      }
    );

    get().refreshUser();
  },
}));
