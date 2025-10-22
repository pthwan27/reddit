// hooks/useAuthInterceptor.ts
import { useEffect } from 'react';

import { AxiosError, AxiosResponse } from 'axios';

import { useAuth } from '../context/authContext';
import { clientAxiosInstance } from '../utils/axios';

interface QueueItem {
  resolve: (value: AxiosResponse) => void;
  reject: (error: AxiosError) => void;
}

export const useAuthInterceptor = () => {
  const { refreshToken, refreshUser, logout } = useAuth();

  useEffect(() => {
    let isRefreshing = false;
    let failedQueue: QueueItem[] = [];

    const processQueue = (error: AxiosError | null = null) => {
      failedQueue.forEach(({ resolve, reject }) => {
        if (error) {
          reject(error);
        } else {
          resolve({} as AxiosResponse);
        }
      });

      failedQueue = [];
    };

    const responseInterceptor = clientAxiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ resolve, reject });
            }).then(() => {
              return clientAxiosInstance(originalRequest);
            });
          }
          originalRequest._retry = true;
          isRefreshing = true;

          try {
            await refreshToken();

            await refreshUser();

            processQueue();

            return clientAxiosInstance(originalRequest);
          } catch (refreshError) {
            const axiosRefreshError = refreshError as AxiosError;
            processQueue(axiosRefreshError);

            await logout();
            window.location.href = '/login';

            throw refreshError;
          } finally {
            isRefreshing = false;
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      clientAxiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [logout, refreshUser]);
};
