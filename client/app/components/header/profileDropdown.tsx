import { useAuth } from "@/app/context/authContext";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ProfileDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (!target.closest("[data-dropdown]")) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <StyledDropdownContainer data-dropdown>
      <StyledProfileButton onClick={() => setIsDropdownOpen((e) => !e)}>
        {user?.username}
      </StyledProfileButton>
      {isDropdownOpen && (
        <StyledDropdownMenu>
          <StyledDropdownItem>
            <span>프로필</span>
          </StyledDropdownItem>
          <StyledDropdownItem>
            <span>설정</span>
          </StyledDropdownItem>
          <StyledDropdownDivider />
          <StyledDropdownItem onClick={logout}>
            <span>로그아웃</span>
          </StyledDropdownItem>
        </StyledDropdownMenu>
      )}
    </StyledDropdownContainer>
  );
};

const StyledDropdownContainer = styled.div`
  position: absolute;
  display: inline-block;
`;

const StyledProfileButton = styled.button`
  background: none;
  border: none;
  padding: var(--spacer-xs) var(--spacer-sm);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.colors.grayBackground};
  }
`;

const StyledDropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: var(--spacer-xs);
  background: ${({ theme }) => theme.colors.background};
  border: var(--line-sm) solid ${({ theme }) => theme.colors.naturalBorder};
  border-radius: var(--radius-md);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  z-index: 1000;
  overflow: hidden;
`;

const StyledDropdownItem = styled.div`
  padding: var(--spacer-sm) var(--spacer-md);
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.875rem;

  &:hover {
    background: ${({ theme }) => theme.colors.grayBackground};
  }

  span {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const StyledDropdownDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.naturalBorder};
  margin: var(--spacer-xs) 0;
`;
export default ProfileDropdown;
