import styled from 'styled-components';

import DownArrowIcon from '../../svgs/DownArrowIcon';

interface HomePostSortProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  isSelecting: boolean;
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelect: (option: string) => void;
  sortOption: '최신순' | '인기순' | '댓글 많은 순';
}

const HomePostSort = ({
  wrapperRef,
  isSelecting,
  setIsSelecting,
  handleSelect,
  sortOption,
}: HomePostSortProps) => {
  return (
    <StyledSortDiv ref={wrapperRef}>
      <SortButton onClick={() => setIsSelecting((e) => !e)}>
        <span>{sortOption}</span>
        <span>
          <DownArrowIcon />
        </span>
      </SortButton>

      <DropdownMenu $isSelecting={isSelecting}>
        <DropdownItem $isHeader>정렬 기준</DropdownItem>
        {['최신순', '인기순', '댓글 많은 순'].map((option) => (
          <DropdownItem
            $isSelected={sortOption === option}
            key={option}
            onClick={() => handleSelect(option as typeof sortOption)}
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

  height: var(--rem-32);

  margin: var(--spacer-xs) var(--spacer-xs);

  @media (min-width: 768px) {
    margin: var(--spacer-xs) 0;
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

const DropdownMenu = styled.ul<{ $isSelecting: boolean }>`
  position: absolute;
  top: calc(100% + var(--spacer-2xs));

  transform: ${({ $isSelecting }) => ($isSelecting ? 'scale(1)' : 'scale(0)')};
  opacity: ${({ $isSelecting }) => ($isSelecting ? 1 : 0)};
  visibility: ${({ $isSelecting }) => ($isSelecting ? 'visible' : 'hidden')};

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

export default HomePostSort;
