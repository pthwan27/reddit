import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { Post } from '@/app/types';

import DownArrowIcon from '../svgs/DownArrowIcon';
import PostItem from './item';

const PostList = ({ posts }: { posts: Post[] }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [sortOption, setSortOption] = useState<
    '최신순' | '인기순' | '댓글 많은 순'
  >('최신순');

  const handleSelect = (option: string) => {
    setSortOption(option as typeof sortOption);
    setIsSelecting(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsSelecting(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <StyledPostListDiv>
      <SortDiv ref={wrapperRef}>
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
      </SortDiv>

      {posts.map((post, idx) => (
        <PostWrapper key={post.identifier}>
          <PostItem post={post} />
          {idx < posts.length - 1 && <hr />}
        </PostWrapper>
      ))}
    </StyledPostListDiv>
  );
};

const StyledPostListDiv = styled.div``;

const SortDiv = styled.div`
  position: relative;

  margin: var(--spacer-sm) 0;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;
  font: var(--font-12-16-semibold);
  color: ${({ theme }) => theme.colors.grayText};

  svg {
    width: var(--rem-16);
    height: var(--rem-16);
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
  color: ${({ theme }) => theme.colors.naturalText};

  &:hover {
    background-color: ${({ theme }) => theme.colors.contentHover};
  }

  span {
    font: var(--font-14);
  }
`;

const PostWrapper = styled.div`
  padding: var(--spacer-2xs) var(--spacer-md);
`;

export default PostList;
