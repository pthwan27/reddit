'use client';

import styled from 'styled-components';

import ProfileDropdown from '../components/header/profileDropdown';
import SearchInput from '../components/header/searchInput';
import LogoIcon from '../components/svgs/LogoIcon';
import { useAuth } from '../context/authContext';
import { ModalKey, useModalState } from '../context/modalContext';
import AuthModal from './modal/authModal';

const HeaderContainer = ({ noOption = false }) => {
  const { user } = useAuth();
  const { open } = useModalState();

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
                <ProfileDropdown />
              ) : (
                <StyledButton onClick={() => open(modalKey)}>
                  로그인
                </StyledButton>
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

  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: var(--line-sm) solid
    ${({ theme }) => theme.colors.naturalBorder};
  padding: 0 var(--spacer-md);
`;

const StyledNav = styled.nav`
  display: flex;
  width: 100%;
  padding: var(--spacer-xs) 0;
`;

const StyledLeftNav = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: var(--spacer-xs);
`;

const StyledCenterNav = styled.div`
  display: flex;
  flex: 7;
  align-items: center;
  justify-content: center;
  gap: var(--spacer-xs);
`;

const StyledRightNav = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  justify-content: flex-end;
  gap: var(--spacer-xs);
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

const StyledButton = styled.button`
  background: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDarkHover};
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;

export default HeaderContainer;
