import { useState } from 'react';

import { useAuth } from '../context/authContext';
import { ChangeSubProps, CustomError } from '../types';
import { clientAxiosInstance } from '../utils/axios';

export const useUploadImage = () => {
  const { user, isAuthenticated } = useAuth();

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const uploadIconImage = async ({ id, icon }: ChangeSubProps) => {
    if (!isAuthenticated || !user) {
      setError('로그인이 필요합니다.');
      return false;
    }

    if (isUploading) return false;

    try {
      setIsUploading(true);
      setError('');

      const formData = new FormData();

      if (icon) {
        formData.append('icon', icon);
      }

      const response = await clientAxiosInstance.patch(
        `/api/sub/${id}/uploadImage/icon`,
        formData
      );
      return response.data.iconUrl;
    } catch (err: unknown) {
      const error = err as CustomError;
      console.error('아이콘 이미지 업로드에 실패했습니다.:', error);

      setError(
        error.response?.data?.error || '아이콘 이미지 업로드에 실패했습니다'
      );
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadIconImage,
    isUploading,
    error,
  };
};
