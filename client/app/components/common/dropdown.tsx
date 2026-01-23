import styled from 'styled-components';

interface DropdownProps {
  isDropdownOpen: boolean;
  marginTop?: string;
  dropdownItems: React.ReactNode[];
}

const Dropdown = ({
  isDropdownOpen,
  marginTop,
  dropdownItems,
}: DropdownProps) => {
  return (
    <StyledDropdownMenu $isDropdownOpen={isDropdownOpen} $marginTop={marginTop}>
      {dropdownItems.map((item, idx) => (
        <div key={idx}>{item}</div>
      ))}
    </StyledDropdownMenu>
  );
};

const StyledDropdownMenu = styled.div<{
  $isDropdownOpen: boolean;
  $marginTop?: string;
}>`
  display: flex;
  flex-direction: column;

  position: absolute;
  top: 100%;
  right: 0;

  width: 160px;

  margin-top: ${({ $marginTop }) =>
    $marginTop ? `var(--spacer-${$marginTop})` : 0};

  background: ${({ theme }) => theme.colors.neutral.background};
  border: var(--line-sm) solid ${({ theme }) => theme.colors.neutral.border};
  border-radius: var(--radius-xs);
  box-shadow: var(--box-shadow);

  overflow: hidden;
  transform-origin: top right;
  transform: ${({ $isDropdownOpen }) =>
    $isDropdownOpen ? 'scale(1)' : 'scale(0)'};
  opacity: ${({ $isDropdownOpen }) => ($isDropdownOpen ? 1 : 0)};
  visibility: ${({ $isDropdownOpen }) =>
    $isDropdownOpen ? 'visible' : 'hidden'};

  z-index: 10;

  transition:
    transform 0.2s ease-out,
    opacity 0.2s ease-out,
    visibility 0.2s ease-out;
`;

export default Dropdown;
