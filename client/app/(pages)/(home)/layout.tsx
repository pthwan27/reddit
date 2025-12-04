'use client';

import { useEffect, useState } from 'react';

import LoadingSpinner from '@/app/components/common/loading/loadingSpinner';

import HeaderContainer from '@/app/container/headerContainer';

import HomePageLayout from '@/app/layout/homePage';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HeaderContainer />
          <HomePageLayout>{children}</HomePageLayout>
        </>
      )}
    </>
  );
};
export default HomeLayout;
