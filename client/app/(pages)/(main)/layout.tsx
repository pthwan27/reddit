'use client';

import { useEffect, useState } from 'react';

import styled from 'styled-components';

import LoadingSpinner from '@/app/components/common/loadingSpinner';
import MenuIcon from '@/app/components/svgs/MenuIcon';

import HeaderContainer from '@/app/container/headerContainer';
import LeftNaveContainer from '@/app/container/leftNavContainer';

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
            <LeftNaveContainer isNavVisible={isNavVisible} />

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
  grid-template-columns: ${({ $isNavVisible }) =>
    $isNavVisible ? '272px 1fr' : '36px 1fr'};

  height: 100vh;
  padding-top: var(--rem-56);

  transition: grid-template-columns 250ms cubic-bezier(0.65, 0, 0.35, 1);

  @media (max-width: 1199px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const MainContentWrapper = styled.div`
  position: relative;
  width: 100%;

  overflow-y: auto;

  z-index: 1;

  @media (min-width: 768px) {
    padding: 0 var(--spacer-lg);
  }
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
