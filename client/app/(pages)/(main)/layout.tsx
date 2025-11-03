'use client';

import { useEffect, useState } from 'react';

import styled from 'styled-components';

import LoadingSpinner from '@/app/components/common/loadingSpinner';

import HeaderContainer from '@/app/container/headerContainer';
import LeftNavContainer from '@/app/container/leftNav';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--expanded-nav-width',
      isNavVisible ? '272px' : '0px'
    );
  }, [isNavVisible]);

  const handleNavVisible = () => {
    setIsNavVisible((prev) => !prev);
  };
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HeaderContainer />
          <MainContentContainer $isNavVisible={isNavVisible}>
            <LeftNavContainer
              isNavVisible={isNavVisible}
              onToggleNav={handleNavVisible}
            />
            <MainContentWrapper>{children}</MainContentWrapper>
          </MainContentContainer>
        </>
      )}
    </>
  );
};

const MainContentContainer = styled.main<{ $isNavVisible: boolean }>`
  display: grid;

  width: 100vw;
  height: 100vh;
  padding-top: var(--rem-56);
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: 1200px) {
    grid-template-columns: var(--expanded-nav-width) 1fr;
  }

  transition: grid-template-columns 250ms cubic-bezier(0.65, 0, 0.35, 1);
`;

const MainContentWrapper = styled.div`
  display: flex;
  justify-content: stretch;
  flex-direction: column;

  overflow-y: auto;

  width: 100%;
  margin: 0 auto;

  z-index: 1;

  @media (min-width: 1200px) {
    width: 1120px;
    max-width: calc(100vw - var(--flex-nav-width, 0px));
    grid-column-start: 2;
  }

  @media (min-width: 768px) {
    padding: 0 var(--spacer-lg);
  }

  transition: max-width var(--transition-duration) var(--transition-curve);
`;

export default MainLayout;
