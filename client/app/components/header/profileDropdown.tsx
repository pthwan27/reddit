import styled from 'styled-components';

interface ProfileDropdownProps {
  isDropdownOpen: boolean;
  logout: () => void;
}
const ProfileDropdown = ({ isDropdownOpen, logout }: ProfileDropdownProps) => {
  return (
    <StyledDropdownMenu $isDropdownOpen={isDropdownOpen}>
      <DropdownItem>
        <span>프로필</span>
      </DropdownItem>
      <DropdownItem>
        <span>설정</span>
      </DropdownItem>
      <DropdownItem onClick={logout}>
        <span>로그아웃</span>
      </DropdownItem>
    </StyledDropdownMenu>
  );
};

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

const DropdownItem = styled.div`
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
