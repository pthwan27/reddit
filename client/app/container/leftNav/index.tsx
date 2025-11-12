import { useRouter } from 'next/navigation';

import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import MenuIcon from '@/app/components/svgs/MenuIcon';

import { ModalKey, useModalState } from '@/app/context/modalContext';
import { Sub } from '@/app/types';

import CommonLeftNavMenu from '../../components/leftNav/common';
import LoginNavMenu from '../../components/leftNav/loggedIn';
import LogoutNavMenu from '../../components/leftNav/loggedOut';
import { useAuth } from '../../context/authContext';
import CreateSubModal from '../modal/createSubModal';

interface LeftNavProps {
  isNavVisible: boolean;
  onToggleNav: () => void;
}

const LeftNavContainer = ({ isNavVisible, onToggleNav }: LeftNavProps) => {
  const { user } = useAuth();

  const router = useRouter();

  const { open } = useModalState();
  const modalKey: ModalKey = 'createSubModal';

  const { filteredSubs, loading } = useSubStore();

  const onOpenCreateSubModal = () => {
    if (!user) return;

    open(modalKey);
  };

  const goToSubDetail = (sub: Sub) => {
    router.push(`/r/${sub.slug}`);
  };

  const goToHome = () => {
    router.push('/');
  };
  return (
    <LeftNav $isNavVisible={isNavVisible}>
      <ToggleButton $isNavVisible={isNavVisible} onClick={onToggleNav}>
        <span>
          <MenuIcon />
        </span>
      </ToggleButton>

      <LeftNavWrapper $isNavVisible={isNavVisible}>
        <MenuContainer>
          <CommonLeftNavMenu goToHome={goToHome} />
        </MenuContainer>
        <hr />
        <MenuContainer>
          {user ? (
            <LoginNavMenu
              filteredSubs={filteredSubs}
              loading={loading}
              onOpenCreateSubModal={onOpenCreateSubModal}
              goToSubDetail={goToSubDetail}
            />
          ) : (
            <LogoutNavMenu />
          )}
        </MenuContainer>
        {user ? <hr /> : <></>}
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
    ${({ theme }) => theme.colors.neutral.border};

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

const ToggleButton = styled.button<{ $isNavVisible: boolean }>`
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

  background: ${({ theme }) => theme.colors.global.white};
  border: solid ${({ theme }) => theme.components.button.borderWidth.default}
    ${({ theme }) => theme.components.button.border.default};

  border-radius: var(--radius-full);

  transition: left 250ms cubic-bezier(0.65, 0, 0.35, 1);

  span {
    display: flex;
  }

  @media (max-width: 1199px) {
    display: none;
  }

  &:hover {
    border: solid ${({ theme }) => theme.components.button.borderWidth.default}
      ${({ theme }) => theme.components.button.border.hover};
  }
`;
export default LeftNavContainer;
