import styled from 'styled-components';

import DownArrowIcon from '../svgs/DownArrowIcon';

interface PostSortProps {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
  isSelecting: boolean;
  setIsSelecting: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelect: (option: string) => void;
  sortOption: '최신순' | '인기순' | '댓글 많은 순';
}

const PostSort = ({
  wrapperRef,
  isSelecting,
  setIsSelecting,
  handleSelect,
  sortOption,
}: PostSortProps) => {
  return (
    <StyledSortDiv ref={wrapperRef}>
      <SortButton onClick={() => setIsSelecting((e) => !e)}>
        {sortOption}
        <DownArrowIcon />
      </SortButton>

      <DropdownMenu $isSelecting={isSelecting}>
        {['최신순', '인기순', '댓글 많은 순'].map((option) => (
          <DropdownItem
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

  margin: var(--spacer-xs) 0;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;

  font: var(--font-12-16-semibold);
  color: ${({ theme }) => theme.colors.neutralContentWeak};

  svg {
    fill: ${({ theme }) => theme.colors.neutralContentWeak};
    width: var(--rem-16);
    height: var(--rem-16);
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.contentHover};
  }
`;

const DropdownMenu = styled.ul<{ $isSelecting: boolean }>`
  position: absolute;

  transform: ${({ $isSelecting }) => ($isSelecting ? 'scale(1)' : 'scale(0)')};
  opacity: ${({ $isSelecting }) => ($isSelecting ? 1 : 0)};
  visibility: ${({ $isSelecting }) => ($isSelecting ? 'visible' : 'hidden')};

  overflow-y: auto;

  background: ${({ theme }) => theme.colors.background};
  border: var(--line-sm) solid ${({ theme }) => theme.colors.border};

  border-radius: var(--radius-md);
  box-shadow: var(--box-shadow);
  list-style: none;
  z-index: 10;

  transition:
    transform 0.2s ease-out,
    opacity 0.2s ease-out,
    visibility 0.2s ease-out;
`;

const DropdownItem = styled.li`
  display: flex;
  align-items: center;
  gap: var(--spacer-sm);
  padding: var(--spacer-sm) var(--spacer-md);
  cursor: pointer;

  font: var(--font-12-16-semibold);
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    background-color: ${({ theme }) => theme.colors.contentHover};
  }

  span {
    font: var(--font-14);
  }
`;

export default PostSort;
