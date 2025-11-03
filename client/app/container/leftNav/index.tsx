import styled from 'styled-components';

import MenuIcon from '@/app/components/svgs/MenuIcon';

import { useAuth } from '../../context/authContext';
import CreateSubModal from '../modal/createSubModal';
import CommonLeftNavMenu from './common';
import LoginNavMenu from './loggedIn';
import LogoutNavMenu from './loggedOut';

interface LeftNavProps {
  isNavVisible: boolean;
  onToggleNav: () => void;
}

const LeftNavContainer = ({ isNavVisible, onToggleNav }: LeftNavProps) => {
  const { user } = useAuth();

  return (
    <LeftNav $isNavVisible={isNavVisible}>
      <StyledButton $isNavVisible={isNavVisible} onClick={onToggleNav}>
        <span>
          <MenuIcon />
        </span>
      </StyledButton>

      <LeftNavWrapper $isNavVisible={isNavVisible}>
        <MenuContainer>
          <CommonLeftNavMenu />
        </MenuContainer>
        <hr />
        <MenuContainer>
          {user ? <LoginNavMenu /> : <LogoutNavMenu />}
        </MenuContainer>
        <hr />
      </LeftNavWrapper>

      <CreateSubModal />
    </LeftNav>
  );
};

const LeftNav = styled.div<{ $isNavVisible: boolean }>`
  position: fixed;

  min-height: calc(100dvh - 56px);
  width: var(--flex-nav-width);

  border-right: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};

  display: none;

  transform: ${({ $isNavVisible }) =>
    $isNavVisible ? 'translateX(0%)' : 'translateX(-90%)'};

  transition: transform var(--transition-duration) var(--transition-curve);

  @media (min-width: 1200px) {
    display: block;
  }
`;

const LeftNavWrapper = styled.nav<{ $isNavVisible: boolean }>`
  display: flex;
  flex-direction: column;

  padding: var(--spacer-md) var(--spacer-md) 0 var(--spacer-md);

  padding-inline-end: 2.2rem;

  overflow-y: auto;

  z-index: 10;

  & > * {
    opacity: ${({ $isNavVisible }) => ($isNavVisible ? 1 : 0)};
    transition: opacity 250ms ease;
  }

  @media (max-width: 1199px) {
    display: none;
  }

  hr {
    margin: var(--spacer-sm) 0;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButton = styled.button<{ $isNavVisible: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  right: 0;
  top: 32px;

  transform: translateX(50%);

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
export default LeftNavContainer;
