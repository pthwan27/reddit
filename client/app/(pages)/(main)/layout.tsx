'use client';

import { useEffect, useState } from 'react';

import styled from 'styled-components';

import LoadingSpinner from '@/app/components/common/loadingSpinner';
import MenuIcon from '@/app/components/svgs/MenuIcon';

import HeaderContainer from '@/app/container/headerContainer';
import LeftNaveContainer from '@/app/container/leftNav';

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
            <LeftNaveContainer isNavVisible={isNavVisible} />{' '}
            <MainContentWrapper>{children}</MainContentWrapper>
            <StyledButton
              $isNavVisible={isNavVisible}
              onClick={handleNavVisible}
            >
              <span>
                <MenuIcon />
              </span>
            </StyledButton>
          </MainContentContainer>
        </>
      )}
    </>
  );
};

const MainContentContainer = styled.main<{ $isNavVisible: boolean }>`
  display: grid;

  height: 100vh;
  padding-top: var(--rem-56);

  transition: grid-template-columns 250ms cubic-bezier(0.65, 0, 0.35, 1);

  grid-template-columns: ${({ $isNavVisible }) =>
    $isNavVisible ? 'var(--flex-nav-width) 1fr' : '36px 1fr'};

  @media (max-width: 1200px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const MainContentWrapper = styled.div`
  display: flex;
  justify-content: stretch;
  flex-direction: column;

  overflow-y: auto;

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

const StyledButton = styled.button<{ $isNavVisible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  left: ${({ $isNavVisible }) => ($isNavVisible ? '256px' : '20px')};
  top: 72px;

  z-index: 10;

  width: var(--rem-32);
  height: var(--rem-32);

  background: ${({ theme }) => theme.colors.white};
  border: var(--line-sm) solid ${({ theme }) => theme.colors.darkBorder};
  border-radius: var(--radius-full);

  transition: left 250ms cubic-bezier(0.65, 0, 0.35, 1);

  span {
    display: flex;
  }

  @media (max-width: 1199px) {
    display: none;
  }
`;

export default MainLayout;
