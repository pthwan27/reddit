"use client";
import AuthModalContainer from "./authModalConatainer";
import { useModalState } from "../context/modalContext";
import styled from "styled-components";
import { useAuth } from "../context/authContext";
import LogoIcon from "../components/svgs/LogoIcon";
import ProfileDropdown from "../components/header/profileDropdown";
import SearchInput from "../components/header/searchInput";

const HeaderContainer = () => {
  const { user } = useAuth();
  const { open } = useModalState();

  return (
    <>
      <StyledHeaderContainer>
        <StyledNav>
          <StyledLeftNav>
            <StyledLogo>
              <LogoIcon />
            </StyledLogo>
          </StyledLeftNav>
          <StyledCenterNav>
            <SearchInput />
          </StyledCenterNav>
          <StyledRightNav>
            {user ? (
              <ProfileDropdown />
            ) : (
              <StyledButton onClick={open}>로그인</StyledButton>
            )}
          </StyledRightNav>
        </StyledNav>
      </StyledHeaderContainer>
      <AuthModalContainer />
    </>
  );
};
const StyledHeaderContainer = styled.header`
  display: flex;
  overflow: hidden;

  width: 100%;
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
  gap: var(--spacer-xs);
`;

const StyledRightNav = styled.div`
  display: flex;
  flex: 2;
  align-items: center;
  gap: var(--spacer-xs);
`;

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);
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
