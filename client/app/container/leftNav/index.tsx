import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { useSubStore } from '@/app/store/subStore';
import { useUIStore } from '@/app/store/uiStore';

import styled from 'styled-components';

import IconBox from '@/app/components/common/IconBox';
import MenuIcon from '@/app/components/svgs/MenuIcon';

import { ModalKey, useModalState } from '@/app/context/modalContext';
import { Sub } from '@/app/types';

import CommonLeftNavMenu from '../../components/leftNav/common';
import LoginNavMenu from '../../components/leftNav/loggedIn';
import LogoutNavMenu from '../../components/leftNav/loggedOut';
import { useAuth } from '../../context/authContext';
import CreateSubModal from '../modal/createSubModal';

const LeftNav = () => {
  const { user } = useAuth();
  const {
    leftNavVisible,
    leftNavByHeaderVisible,
    toggleLeftNav,
    toggleLeftNavByHeader,
  } = useUIStore();

  const router = useRouter();
  const pathname = usePathname();

  const { open } = useModalState();
  const modalKey: ModalKey = 'createSubModal';

  const { filteredSubs, loading } = useSubStore();

  const openCreateSubModal = () => {
    if (!user) return;

    open(modalKey);
  };

  const goToSubDetail = (sub: Sub) => {
    router.push(`/r/${sub.slug}`);
  };

  const goToHome = () => {
    router.push('/');
  };

  const closeLeftNavByHeader = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (leftNavByHeaderVisible) {
      toggleLeftNavByHeader();
    }
  };

  useEffect(() => {
    if (leftNavByHeaderVisible) {
      toggleLeftNavByHeader();
    }
  }, [pathname]);

  return (
    <>
      <LeftNavContainer $leftNavVisible={leftNavVisible}>
        <ToggleButton $leftNavVisible={leftNavVisible} onClick={toggleLeftNav}>
          <IconBox
            icon={<MenuIcon />}
            altText="메뉴 아이콘"
            width={32}
            height={32}
            percentage={50}
          />
        </ToggleButton>

        <LeftNavWrapper $leftNavVisible={leftNavVisible}>
          <MenuContainer>
            <CommonLeftNavMenu goToHome={goToHome} />
          </MenuContainer>
          <hr />
          <MenuContainer>
            {user ? (
              <LoginNavMenu
                filteredSubs={filteredSubs}
                loading={loading}
                openCreateSubModal={openCreateSubModal}
                goToSubDetail={goToSubDetail}
              />
            ) : (
              <LogoutNavMenu />
            )}
          </MenuContainer>
          {user ? <hr /> : <></>}
        </LeftNavWrapper>

        <CreateSubModal />
      </LeftNavContainer>

      <LeftNavByHeaderContainer
        $leftNavByHeaderVisible={leftNavByHeaderVisible}
      >
        <LeftNavByHeaderWrapper
          $leftNavByHeaderVisible={leftNavByHeaderVisible}
        >
          <MenuContainer>
            <CommonLeftNavMenu goToHome={goToHome} />
          </MenuContainer>
          <hr />
          <MenuContainer>
            {user ? (
              <LoginNavMenu
                filteredSubs={filteredSubs}
                loading={loading}
                openCreateSubModal={openCreateSubModal}
                goToSubDetail={goToSubDetail}
              />
            ) : (
              <LogoutNavMenu />
            )}
          </MenuContainer>
          {user ? <hr /> : <></>}
        </LeftNavByHeaderWrapper>

        {leftNavByHeaderVisible && (
          <BackgroundOverlay onClick={closeLeftNavByHeader} />
        )}
      </LeftNavByHeaderContainer>
    </>
  );
};

const LeftNavContainer = styled.div<{ $leftNavVisible: boolean }>`
  position: fixed;

  min-height: calc(100dvh - 56px);
  width: var(--flex-nav-width);

  border-right: var(--line-sm) solid
    ${({ theme }) => theme.colors.neutral.border};

  display: none;

  transform: ${({ $leftNavVisible }) =>
    $leftNavVisible ? 'translateX(0%)' : 'translateX(-90%)'};

  transition: transform var(--transition-duration) var(--transition-curve);

  @media (min-width: 1200px) {
    display: block;
  }
`;

const LeftNavByHeaderContainer = styled.div<{
  $leftNavByHeaderVisible: boolean;
}>`
  position: fixed;
  background: ${({ theme }) => theme.colors.global.white};
  backdrop-filter: blur(8px);

  min-height: calc(100dvh - 56px);

  width: ${({ $leftNavByHeaderVisible }) =>
    $leftNavByHeaderVisible ? 'var(--flex-nav-width)' : '0'};

  border-right: var(--line-sm) solid
    ${({ theme }) => theme.colors.neutral.border};

  display: block;

  z-index: 10;

  @media (min-width: 1200px) {
    display: none;
  }
`;

const LeftNavWrapper = styled.nav<{ $leftNavVisible: boolean }>`
  display: none;
  flex-direction: column;

  padding: var(--spacer-md) var(--spacer-md) 0 var(--spacer-md);

  padding-inline-end: 2.2rem;

  overflow-y: auto;

  z-index: 10;

  & > * {
    opacity: ${({ $leftNavVisible }) => ($leftNavVisible ? 1 : 0)};
    transition: opacity 250ms ease;
  }

  @media (min-width: 1200px) {
    display: flex;
  }

  hr {
    margin: var(--spacer-sm) 0;
  }
`;

const LeftNavByHeaderWrapper = styled.nav<{ $leftNavByHeaderVisible: boolean }>`
  display: flex;
  flex-direction: column;

  padding: ${({ $leftNavByHeaderVisible }) =>
    $leftNavByHeaderVisible
      ? 'var(--spacer-md) var(--spacer-md) 0 var(--spacer-md)'
      : '0'};

  padding-inline-end: ${({ $leftNavByHeaderVisible }) =>
    $leftNavByHeaderVisible ? '2.2rem' : '0'};

  overflow-y: auto;
  overflow-x: hidden;

  z-index: 10;

  & > * {
    opacity: ${({ $leftNavByHeaderVisible }) =>
      $leftNavByHeaderVisible ? 1 : 0};
    transition: opacity 250ms ease;
  }

  @media (min-width: 1200px) {
    display: none;
  }

  hr {
    margin: var(--spacer-sm) 0;
  }
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: var(--flex-nav-width);

  width: calc(100vw - var(--flex-nav-width));
  height: 100vh;

  z-index: 10;

  background: rgba(0, 0, 0, 0.5);
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToggleButton = styled.button<{ $leftNavVisible: boolean }>`
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
  border: var(--line-sm) solid
    ${({ theme }) => theme.components.button.border.default};
  box-shadow: var(--box-shadow-xs);

  border-radius: var(--radius-full);

  transition: left 250ms cubic-bezier(0.65, 0, 0.35, 1);

  span {
    display: flex;
  }

  @media (max-width: 1199px) {
    display: none;
  }

  &:hover {
    border: var(--line-sm) solid
      ${({ theme }) => theme.components.button.border.hover};
  }
`;
export default LeftNav;
