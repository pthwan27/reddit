import { useEffect, useState } from 'react';

import styled from 'styled-components';

import LeftNavContainer from './leftNav';

const MainContainer = ({ children }: { children: React.ReactNode }) => {
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
    <Main $isNavVisible={isNavVisible}>
      <LeftNavContainer
        isNavVisible={isNavVisible}
        onToggleNav={handleNavVisible}
      />
      <MainWrapper>{children}</MainWrapper>
    </Main>
  );
};

const Main = styled.main<{ $isNavVisible: boolean }>`
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

  transition: max-width var(--transition-duration) var(--transition-curve);
`;

export default MainContainer;
