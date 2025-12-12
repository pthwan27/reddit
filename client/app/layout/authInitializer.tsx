'use client';

import { useEffect } from 'react';

import { useAuthStore } from '@/app/store/authStore';

const AuthInitializer = () => {
  useEffect(() => {
    useAuthStore.getState().initAuth();
  }, []);

  return null;
};

export default AuthInitializer;
