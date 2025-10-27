'use client';

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
  }, [isDropdownOpen]);

  const modalKey: ModalKey = 'authModal';
  return (
    <StyledHeaderContainer>
      <StyledNav>
        <StyledLeftNav>
          <StyledLogo>
            <LogoIcon />
          </StyledLogo>
        </StyledLeftNav>
        {!noOption && (
          <>
            <StyledCenterNav>
              <SearchInput />
            </StyledCenterNav>
            <StyledRightNav>
              {user ? (
                <StyledDropdownContainer
                  ref={dropdownRef}
                  style={{ position: 'relative' }}
                >
                  <StyledProfileButton
                    onClick={() => setIsDropdownOpen((e) => !e)}
                  >
                    {user.username}
                  </StyledProfileButton>
                  <ProfileDropdown
                    isDropdownOpen={isDropdownOpen}
                    logout={logout}
                  />
                </StyledDropdownContainer>
              ) : (
                <StyledLoginButton onClick={() => open(modalKey)}>
                  로그인
                </StyledLoginButton>
              )}
            </StyledRightNav>
          </>
        )}
      </StyledNav>
      <AuthModal />
    </StyledHeaderContainer>
  );
};
const StyledHeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;

  display: flex;
  width: 100%;
  height: var(--rem-56);

  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};
  padding: 0 var(--spacer-md);
`;

const StyledNav = styled.nav`
  display: flex;
  width: 100%;
`;

const StyledLeftNav = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);

  padding-inline-end: var(--spacer-lg);
`;
const StyledLogo = styled.div`
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

const StyledCenterNav = styled.div`
  display: flex;
  flex: 1 1 0%;
  align-items: center;
  justify-content: center;
  gap: var(--spacer-xs);
`;

const StyledRightNav = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacer-xs);

  padding-inline-start: var(--spacer-lg);
`;
const StyledDropdownContainer = styled.div`
  position: absolute;
  display: inline-block;
  z-index: 1000;
`;

const StyledProfileButton = styled.button`
  background: none;
  border: none;
  padding: var(--spacer-xs) var(--spacer-sm);
  border-radius: var(--radius-md);
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.grayBackground};
  }
`;

const StyledLoginButton = styled.button`
  background: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDarkHover};
  }
`;

export default HeaderContainer;
