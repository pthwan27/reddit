"use client";
import { useEffect, useState } from "react";
import AuthModalContainer from "./authModalConatainer";
import { useModalState } from "../context/modalContext";
import SearchIcon from "../components/svgs/SearchIcon";
import styled from "styled-components";
import { useAuth } from "../context/authContext";

const HeaderContainer = () => {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const { user } = useAuth();
  const { open } = useModalState();

  useEffect(() => {
    if (user) {
      setUserName(user.username);
    }
  }, [user]);

  return (
    <>
      <StyledHeaderContainer>
        <StyledNav>
          <SearchInputWrapper>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledSearchInput placeholder="Search" />
          </SearchInputWrapper>
          {userName ? (
            userName
          ) : (
            <StyledButton onClick={open}>로그인</StyledButton>
          )}
        </StyledNav>
        {/* logo */}
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

  gap: var(--spacer-md);
  padding: var(--spacer-xs) 0;
`;

const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--spacer-xs);
`;
const SearchIconWrapper = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: cursor;
`;

const StyledSearchInput = styled.input`
  background: ${({ theme }) => theme.colors.grayBackground};
  border: var(--line-md) solid ${({ theme }) => theme.colors.grayBackground};

  padding-left: 2.5rem;
  border-radius: var(--radius-xl);
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
