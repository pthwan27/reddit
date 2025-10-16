'use client';

import { useEffect, useState } from 'react';

import { useAuthInterceptor } from '@/app/hooks/useAuthInterceptor';

import styled from 'styled-components';

import LoadingSpinner from '@/app/components/common/loadingSpinner';

import HeaderContainer from '@/app/container/headerContainer';
import LeftNaveContainer from '@/app/container/leftNavContainer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  useAuthInterceptor();

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
          <MainContentContainer>
            <LeftNaveContainer />
            <MainContentWrapper>{children}</MainContentWrapper>
          </MainContentContainer>
        </>
      )}
    </>
  );
};

const MainContentContainer = styled.main`
  display: grid;
  grid-template-columns: 272px 1fr;

  padding-top: 56px;
  height: 100vh;

  transition: grid-template-columns 250ms cubic-bezier(0.65, 0, 0.35, 1);

  @media (max-width: 1199px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const MainContentWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
`;

export default MainLayout;
