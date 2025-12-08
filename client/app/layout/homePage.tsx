import { useEffect } from 'react';

import styled from 'styled-components';

import LeftNav from '../container/leftNav';
import { useUIStore } from '../store/uiStore';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { leftNavVisible } = useUIStore();

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--expanded-nav-width',
      leftNavVisible ? '272px' : '0px'
    );
  }, [leftNavVisible]);

  return (
    <Main $leftNavVisible={leftNavVisible}>
      <LeftNav />
      <MainWrapper>{children}</MainWrapper>
    </Main>
  );
};

const Main = styled.main<{ $leftNavVisible: boolean }>`
  display: grid;
  overflow-x: hidden;

  width: 100vw;
  height: 100vh;
  padding-top: var(--rem-56);
  grid-template-columns: repeat(1, minmax(0, 1fr));

  @media (min-width: 1200px) {
    grid-template-columns: var(--expanded-nav-width) 1fr;
  }

  transition: grid-template-columns 250ms cubic-bezier(0.65, 0, 0.35, 1);
`;

const MainWrapper = styled.div`
  display: flex;
  justify-content: stretch;
  flex-direction: column;

  width: 100%;
  margin: 0 auto;

  z-index: 1;

  @media (min-width: 1200px) {
    width: 1120px;
    max-width: calc(100vw - var(--flex-nav-width, 0px));
    grid-column-start: 2;
  }

  @media (min-width: 768px) {
    padding: 0 var(--spacer-md);
  }

  @media (min-width: 1200px) {
    padding: 0 var(--spacer-lg);
  }

  transition: max-width var(--transition-duration) var(--transition-curve);
`;

export default MainLayout;
