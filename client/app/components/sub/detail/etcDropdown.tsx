import styled from 'styled-components';

interface EtcDropdownProps {
  isDropdownOpen: boolean;
  isOwner: boolean;
  isSubscribed: boolean;
}

const EtcDropdown = ({
  isDropdownOpen,
  isOwner,
  isSubscribed,
}: EtcDropdownProps) => {
  return (
    <StyledDropdownMenu $isDropdownOpen={isDropdownOpen}>
      <DropdownItem>
        {isSubscribed ? <span>가입 취소하기</span> : <span>가입하기</span>}
      </DropdownItem>
      {isOwner && (
        <DropdownItem>
          <span>삭제하기</span>
        </DropdownItem>
      )}
    </StyledDropdownMenu>
  );
};

const StyledDropdownMenu = styled.div<{ $isDropdownOpen: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;

  width: 200px;
  margin-top: var(--spacer-xs);

  background: ${({ theme }) => theme.colors.neutral.background};
  border: var(--line-sm) solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: var(--radius-md);
  box-shadow: var(--box-shadow);

  overflow: hidden;
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
  white-space: nowrap;

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral.backgroundHover};
  }

  span {
    color: ${({ theme }) => theme.colors.default.secondary};
  }
`;

export default EtcDropdown;
