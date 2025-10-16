'use client';

import styled from 'styled-components';

import HeaderContainer from '../container/headerContainer';
import LeftNavContainer from '../container/leftNavContainer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <HeaderContainer />
      <MainContentContainer>
        <LeftNavContainer />
        <MainContentWrapper>{children}</MainContentWrapper>
      </MainContentContainer>
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
