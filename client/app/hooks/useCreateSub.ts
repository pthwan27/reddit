import { useState } from 'react';

import { useAuth } from '../context/authContext';
import { ModalKey, useModalState } from '../context/modalContext';
import { CreateSubProps, CustomError } from '../types';
import { clientAxiosInstance } from '../utils/axios';

export const useCreateSub = () => {
  const modalKey: ModalKey = 'createSubModal';

  const { close } = useModalState();

  const { user, isAuthenticated, isLoading } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [error, setError] = useState('');

  const createSub = async ({
    title,
    description,
    icon,
    banner,
  }: CreateSubProps) => {
    if (!isAuthenticated || !user) {
      setError('로그인이 필요합니다.');
      return false;
    }
    if (isSubmitting) return false;

    try {
      setIsSubmitting(true);
      setError('');

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);

      if (banner) {
        formData.append('banner', banner);
      }
      if (icon) {
        formData.append('icon', icon);
      }

      await clientAxiosInstance.post('/api/sub/create', formData);

      close(modalKey);
      return true;
    } catch (err: unknown) {
      const error = err as CustomError;
      console.error('Create Sub failed:', error);

      setError(error.response?.data?.error || '커뮤니티 생성을 실패했습니다');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createSub,
    error,
    setError,
    isSubmitting,
    isLoading,
    isAuthenticated,
  };
};
