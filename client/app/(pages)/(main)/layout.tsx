'use client';

import { useEffect, useState } from 'react';

import LoadingSpinner from '@/app/components/common/loadingSpinner';

import HeaderContainer from '@/app/container/headerContainer';
import MainContainer from '@/app/container/mainContainer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
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
          <MainContainer>{children}</MainContainer>
        </>
      )}
    </>
  );
};
export default MainLayout;
