import styled from 'styled-components';

import { useAuth } from '../../context/authContext';
import CreateSubModal from '../modal/createSubModal';
import CommonLeftNavMenu from './common';
import LoginNavMenu from './loggedIn';
import LogoutNavMenu from './loggedOut';

const LeftNavContainer = ({ isNavVisible }: { isNavVisible: boolean }) => {
  const { user } = useAuth();

  return (
    <LeftNav $isNavVisible={isNavVisible}>
      <MenuContainer>
        <CommonLeftNavMenu />
      </MenuContainer>
      <hr />
      <MenuContainer>
        {user ? <LoginNavMenu /> : <LogoutNavMenu />}
      </MenuContainer>
      <hr />

      <CreateSubModal />
    </LeftNav>
  );
};

const LeftNav = styled.nav<{ $isNavVisible: boolean }>`
  position: relative;

  border-right: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};

  max-width: var(--flex-nav-width);
  height: 100%;

  padding: 0 var(--spacer-md);

  overflow-y: auto;

  z-index: 10;

  & > * {
    opacity: ${({ $isNavVisible }) => ($isNavVisible ? 1 : 0)};
    transition: opacity 250ms ease;
  }

  @media (max-width: 1199px) {
    display: none;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: var(--spacer-2xs);

  padding: var(--spacer-sm);
`;

export default LeftNavContainer;
