'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import ProfileDropdown from '../components/header/profileDropdown';
import SearchInput from '../components/header/searchInput';
import LogoIcon from '../components/svgs/LogoIcon';
import { useAuth } from '../context/authContext';
import { ModalKey, useModalState } from '../context/modalContext';
import AuthModal from './modal/authModal';

const HeaderContainer = ({ noOption = false }) => {
  const { user, logout } = useAuth();
  const { open } = useModalState();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) setIsDropdownOpen(false);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, user]);

  const modalKey: ModalKey = 'authModal';
  return (
    <Header>
      <Nav>
        <LeftNav>
          <Logo>
            <LogoIcon />
          </Logo>
        </LeftNav>
        {!noOption && (
          <>
            <CenterNav>
              <SearchInput />
            </CenterNav>
            <RightNav>
              {user ? (
                <DropdownContainer
                  ref={dropdownRef}
                  style={{ position: 'relative' }}
                >
                  <ProfileButton onClick={() => setIsDropdownOpen((e) => !e)}>
                    <IconBox $isIcon={!!user.profileUrl}>
                      {user.profileUrl && (
                        <Image src={user.profileUrl} alt={user.username} fill />
                      )}
                    </IconBox>
                  </ProfileButton>
                  <ProfileDropdown
                    isDropdownOpen={isDropdownOpen}
                    logout={logout}
                  />
                </DropdownContainer>
              ) : (
                <LoginButton onClick={() => open(modalKey)}>로그인</LoginButton>
              )}
            </RightNav>
          </>
        )}
      </Nav>
      <AuthModal />
    </Header>
  );
};
const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 4;

  display: flex;
  width: 100%;
  height: var(--rem-56);

  color: ${({ theme }) => theme.colors.naturalText};

  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};
  padding: 0 var(--spacer-md);
`;

const Nav = styled.nav`
  display: flex;
  width: 100%;
`;

const LeftNav = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);

  padding-inline-end: var(--spacer-lg);
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);
  width: var(--size-2xl);
  height: var(--size-2xl);
  cursor: pointer;

  svg {
    border-radius: 2rem 1.4rem 2rem 1.2rem;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const CenterNav = styled.div`
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: center;
  gap: var(--spacer-xs);
`;

const RightNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacer-xs);

  padding-inline-start: var(--spacer-lg);
`;
const DropdownContainer = styled.div`
  position: absolute;
  display: inline-block;
  z-index: 1000;
`;

const ProfileButton = styled.button`
  display: flex;
  gap: var(--spacer-4xs);

  justify-content: center;
  align-items: center;

  background: none;
  border: none;
  padding: var(--spacer-xs) var(--spacer-sm);
  border-radius: var(--radius-md);
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.grayBackground};
  }
`;
const IconBox = styled.div<{ $isIcon?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  width: var(--rem-24);
  height: var(--rem-24);

  min-width: var(--rem-24);
  min-height: var(--rem-24);

  border-radius: var(--radius-full);
  background-color: ${({ $isIcon, theme }) =>
    $isIcon ? 'transparent' : theme.colors.dark};
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-full);
    object-fit: cover;

    background: transparent;
  }
`;

const LoginButton = styled.button`
  background: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDarkHover};
  }
`;

export default HeaderContainer;
