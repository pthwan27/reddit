'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { useSubStore } from '../store/subStore';
import { CustomError, User } from '../types';
import { clientAxiosInstance } from '../utils/axios';

// 인증 상태 타입 정의
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  mode: 'login' | 'register';
  setMode: React.Dispatch<React.SetStateAction<'login' | 'register'>>;
  login: (
    email: string,
    password: string,
    onSuccess?: () => void
  ) => Promise<void>;
  logout: () => void;
  register: (
    email: string,
    username: string,
    password: string,
    onSuccess?: () => void
  ) => Promise<void>;
  refreshToken: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const refreshToken = useCallback(async () => {
    try {
      await clientAxiosInstance.post('/api/auth/refresh');
    } catch (error) {
      console.error('Token refresh failed: ', error);
      throw error;
    }
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const response = await clientAxiosInstance.get('/api/auth/me');
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to refresh user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 로그인 함수 (쿠키 기반)
  const login = useCallback(
    async (email: string, password: string, onSuccess?: () => void) => {
      try {
        setIsLoading(true);
        const response = await clientAxiosInstance.post('/api/auth/login', {
          email,
          password,
        });

        const { user: userData } = response.data;
        setUser(userData);

        if (onSuccess) onSuccess();
      } catch (err: unknown) {
        const error = err as CustomError;
        console.error('Login failed:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await clientAxiosInstance.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      useSubStore.getState().reset();
    }
  }, []);

  // 회원가입 함수 (쿠키 기반)
  const register = useCallback(
    async (
      email: string,
      username: string,
      password: string,
      onSuccess?: () => void
    ) => {
      try {
        setIsLoading(true);
        const response = await clientAxiosInstance.post('/api/auth/register', {
          email,
          username,
          password,
        });

        if (onSuccess) onSuccess();

        const { user: userData } = response.data;
        setUser(userData);
      } catch (err: unknown) {
        const error = err as CustomError;
        console.error('Registration failed:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    let refreshTokenPromise: Promise<void> | null = null;

    const responseInterceptor = clientAxiosInstance.interceptors.response.use(
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
          originalRequest.url === '/api/auth/register'
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
          await logout();
          return Promise.reject(refreshError);
        } finally {
          refreshTokenPromise = null;
        }
      }
    );

    return () => {
      clientAxiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshToken, logout]);

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    mode,
    setMode,
    login,
    logout,
    register,
    refreshToken,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// useAuth 훅
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
