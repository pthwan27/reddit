'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/app/store/authStore';
import { useUIStore } from '@/app/store/uiStore';

import styled from 'styled-components';

import IconBox from '../components/common/IconBox';
import ProfileDropdown from '../components/header/profileDropdown';
import SearchInput from '../components/header/searchInput';
import LogoIcon from '../components/svgs/LogoIcon';
import MenuIcon from '../components/svgs/MenuIcon';
import { useModalStore } from '../store/modalStore';
import AuthModal from './modal/authModal';

const Header = ({ noOption = false }) => {
  const { user, logout } = useAuthStore();
  const { toggleLeftNavByHeader } = useUIStore();
  const { open } = useModalStore();
  const router = useRouter();

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

  const goToHome = () => {
    router.push('/');
  };

  return (
    <HeaderContainer>
      <Nav>
        <LeftNav>
          <ToggleButton
            onClick={toggleLeftNavByHeader}
            aria-label="사이드바 토글 버튼"
          >
            <IconBox
              icon={<MenuIcon />}
              altText="메뉴 아이콘"
              width={40}
              height={40}
              percentage={50}
            />
          </ToggleButton>
          <Logo onClick={goToHome} aria-label="홈으로 이동">
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
                <DropdownContainer ref={dropdownRef}>
                  <ProfileButton onClick={() => setIsDropdownOpen((e) => !e)}>
                    <IconBox
                      iconUrl={user.profileUrl}
                      altText={user.username}
                      width={32}
                      height={32}
                    />
                  </ProfileButton>
                  <ProfileDropdown
                    isDropdownOpen={isDropdownOpen}
                    logout={logout}
                  />
                </DropdownContainer>
              ) : (
                <LoginButton onClick={() => open('authModal')}>
                  로그인
                </LoginButton>
              )}
            </RightNav>
          </>
        )}
      </Nav>
      <AuthModal />
    </HeaderContainer>
  );
};
const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 4;

  display: flex;
  width: 100%;
  height: var(--rem-56);

  color: ${({ theme }) => theme.colors.neutral.contentStrong};
  background: ${({ theme }) => theme.colors.neutral.background};
  border-bottom: var(--line-sm) solid
    ${({ theme }) => theme.colors.neutral.border};
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

const ToggleButton = styled.button`
  padding: 0;
  @media (min-width: 1200px) {
    display: none;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);
  width: var(--size-2xl);
  height: var(--size-2xl);
  cursor: pointer;

  border-radius: 2rem 1.4rem 2rem 1.2rem;
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

  width: var(--rem-32);
  height: 100%;

  margin-left: var(--spacer-lg);
  padding-inline-start: var(--rem-64);
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

  width: 100%;
  height: 100%;

  background: none;
  border: none;
  padding: var(--spacer-2xs) var(--spacer-2xs);
  border-radius: var(--radius-full);
  cursor: pointer;

  > img {
    width: 90%;
    height: 90%;
    border-radius: var(--radius-full);
  }

  &:hover {
    border: none;
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }
`;

const LoginButton = styled.button`
  border: none;
  background: ${({ theme }) => theme.colors.brand.background};
  color: ${({ theme }) => theme.colors.global.white};

  &:hover {
    border: none;
    background: ${({ theme }) => theme.colors.brand.backgroundHover};
  }
`;

export default Header;
