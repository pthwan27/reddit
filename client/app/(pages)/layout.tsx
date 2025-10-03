'use client';

import { useEffect, useState } from 'react';

import LoadingSpinner from '../components/common/loadingSpinner';
import { useAuthInterceptor } from '../hooks/useAuthInterceptor';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  useAuthInterceptor();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return <>{isLoading ? <LoadingSpinner /> : children}</>;
};

export default PageLayout;
