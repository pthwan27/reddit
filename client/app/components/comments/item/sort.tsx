import styled from 'styled-components';

import DownArrowIcon from '../../svgs/DownArrowIcon';

interface CommentSortProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectOption: (option: string) => void;
  sortOption: '최신순' | '인기순' | '댓글 많은 순';
}

const CommentSort = ({
  wrapperRef,
  isDropdownOpen,
  setIsDropdownOpen,
  handleSelectOption,
  sortOption,
}: CommentSortProps) => {
  return (
    <StyledSortDiv ref={wrapperRef}>
      <span>정렬 기준 :</span>
      <SortButton onClick={() => setIsDropdownOpen((e) => !e)}>
        <span>{sortOption}</span>
        <span>
          <DownArrowIcon />
        </span>
      </SortButton>

      <DropdownMenu $isDropdownOpen={isDropdownOpen}>
        <DropdownItem $isHeader>정렬 기준</DropdownItem>
        {['최신순', '인기순', '댓글 많은 순'].map((option) => (
          <DropdownItem
            $isSelected={sortOption === option}
            key={option}
            onClick={() => handleSelectOption(option as typeof sortOption)}
          >
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </StyledSortDiv>
  );
};

const StyledSortDiv = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  gap: var(--spacer-4xs);

  margin-top: var(--spacer-sm);

  @media (min-width: 768px) {
    padding: 0 0;
  }

  > span {
    display: flex;
    align-items: center;

    height: var(--rem-40);
    font: var(--font-12-16-regular);

    color: ${({ theme }) => theme.colors.neutral.contentWeak};
    line-height: 1rem;

    padding-top: var(--spacer-4xs);
  }
`;

const SortButton = styled.button`
  display: flex;

  gap: var(--spacer-2xs);

  color: ${({ theme }) => theme.colors.neutral.contentWeak};

  border: none;

  padding: 0 6px 0 10px;

  > span {
    display: flex;
    align-items: center;
    height: var(--rem-32);

    font: var(--font-12-16-semibold);
    line-height: 1rem;

    svg {
      display: flex;
      align-items: center;
      justify-content: center;
      height: var(--rem-32);
      fill: ${({ theme }) => theme.colors.neutral.contentWeak};
      width: var(--rem-16);
      height: var(--rem-16);
    }
  }

  span:first-child {
    padding-top: var(--spacer-4xs);
  }

  &:focus {
  }

  &:hover {
    border: none;
    background: ${({ theme }) => theme.colors.secondary.backgroundHover};
  }
`;

const DropdownMenu = styled.ul<{ $isDropdownOpen: boolean }>`
  position: absolute;
  top: calc(100% + var(--spacer-2xs));
  left: var(--rem-40);

  transform: ${({ $isDropdownOpen }) =>
    $isDropdownOpen ? 'scale(1)' : 'scale(0)'};
  opacity: ${({ $isDropdownOpen }) => ($isDropdownOpen ? 1 : 0)};
  visibility: ${({ $isDropdownOpen }) =>
    $isDropdownOpen ? 'visible' : 'hidden'};

  overflow-y: auto;

  background: ${({ theme }) => theme.colors.neutral.background};
  border: var(--line-sm) solid ${({ theme }) => theme.colors.neutral.border};

  border-radius: var(--radius-md);
  box-shadow: var(--box-shadow);
  list-style: none;
  z-index: 10;

  transition:
    transform 0.2s ease-out,
    opacity 0.2s ease-out,
    visibility 0.2s ease-out;
`;

const DropdownItem = styled.li<{ $isHeader?: boolean; $isSelected?: boolean }>`
  display: flex;
  align-items: center;
  gap: var(--spacer-sm);
  padding: var(--spacer-sm) var(--spacer-md);
  cursor: pointer;

  font: var(--font-12-16-semibold);
  color: ${({ theme }) => theme.colors.global.black};

  background: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.neutral.backgroundSelected : 'transparent'};

  &:hover {
    background: ${({ $isHeader, theme }) =>
      $isHeader ? 'transparent' : theme.colors.neutral.backgroundHover};
  }

  span {
    font: var(--font-14);
  }
`;

export default CommentSort;
