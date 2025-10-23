import { useEffect, useState } from 'react';

import styled from 'styled-components';

import { useAuth } from '@/app/context/authContext';

const ProfileDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (!target.closest('[data-dropdown]')) {
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

  return (
    <StyledDropdownContainer data-dropdown>
      <StyledProfileButton onClick={() => setIsDropdownOpen((e) => !e)}>
        {user?.username}
      </StyledProfileButton>
      <StyledDropdownMenu $isDropdownOpen={isDropdownOpen}>
        <StyledDropdownItem>
          <span>프로필</span>
        </StyledDropdownItem>
        <StyledDropdownItem>
          <span>설정</span>
        </StyledDropdownItem>
        <StyledDropdownItem onClick={logout}>
          <span>로그아웃</span>
        </StyledDropdownItem>
      </StyledDropdownMenu>
    </StyledDropdownContainer>
  );
};

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

const StyledDropdownMenu = styled.div<{ $isDropdownOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: -1rem;
  margin-top: var(--spacer-xs);
  padding: var(--spacer-md) 0;
  width: 200px;

  background: ${({ theme }) => theme.colors.background};
  border: var(--line-sm) solid ${({ theme }) => theme.colors.border};
  border-radius: var(--radius-md);
  box-shadow: var(--box-shadow);

  transform-origin: top right;

  transform: ${({ $isDropdownOpen }) =>
    $isDropdownOpen ? 'scale(1)' : 'scale(0)'};
  opacity: ${({ $isDropdownOpen }) => ($isDropdownOpen ? 1 : 0)};
  visibility: ${({ $isDropdownOpen }) =>
    $isDropdownOpen ? 'visible' : 'hidden'};

  transition:
    transform 0.2s ease-out,
    opacity 0.2s ease-out,
    visibility 0.2s ease-out;
`;

const StyledDropdownItem = styled.div`
  display: flex;
  align-items: center;
  padding: var(--spacer-sm) var(--spacer-md);
  font: var(--font-14);
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.grayBackground};
  }

  span {
    color: ${({ theme }) => theme.colors.text};
  }
`;

export default ProfileDropdown;
