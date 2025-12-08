'use client';

import { useCallback, useEffect, useState } from 'react';

import { useUIStore } from '@/app/store/uiStore';

import { throttle } from 'lodash';

import LoadingSpinner from '@/app/components/common/loading/loadingSpinner';

import Header from '@/app/container/header';

import MainLayout from '@/app/layout/homePage';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const { setLeftNavByHeaderVisible } = useUIStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleResize = useCallback(() => {
    if (window.innerWidth > 1200) {
      setLeftNavByHeaderVisible(false);
    }
  }, [setLeftNavByHeaderVisible]);

  useEffect(() => {
    const throttledResize = throttle(handleResize, 200);

    handleResize();

    window.addEventListener('resize', throttledResize);

    return () => {
      window.removeEventListener('resize', throttledResize);
    };
  }, [handleResize]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Header />
          <MainLayout>{children}</MainLayout>
        </>
      )}
    </>
  );
};
export default HomeLayout;
