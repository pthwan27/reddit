import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { Post } from '@/app/types';

import DownArrowIcon from '../svgs/DownArrowIcon';
import PinIcon from '../svgs/PinIcon';
import PostItem from './item';

const PostList = ({ posts }: { posts: Post[] }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [sortOption, setSortOption] = useState<
    '최신순' | '인기순' | '댓글 많은 순'
  >('최신순');
  const [isHighlightView, setIsHighlightView] = useState(false);

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

      <HighlightPost
        $isHighlightView={isHighlightView}
        onClick={() => setIsHighlightView((e) => !e)}
      >
        <div>
          <PinIcon /> 커뮤니티 하이라이트
        </div>
        <div>
          <DownArrowIcon />
        </div>
      </HighlightPost>

      {isHighlightView && <HightlightPostList></HightlightPostList>}

      <hr />
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

  height: var(--rem-32);

  margin: var(--spacer-sm) 0;
`;

const SortButton = styled.button`
  display: flex;
  align-items: center;

  font: var(--font-12-16-semibold);
  color: ${({ theme }) => theme.colors.secondaryText};

  svg {
    fill: ${({ theme }) => theme.colors.secondaryText};
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
  color: ${({ theme }) => theme.colors.naturalText};

  &:hover {
    background-color: ${({ theme }) => theme.colors.contentHover};
  }

  span {
    font: var(--font-14);
  }
`;

const HighlightPost = styled.div<{ $isHighlightView: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font: var(--font-14);

  height: var(--rem-32);

  padding: var(--spacer-2xs) var(--spacer-md);
  margin-bottom: var(--spacer-2xs);

  cursor: pointer;

  div {
    svg {
      fill: ${({ theme }) => theme.colors.secondaryText};
    }
  }

  div:nth-child(1) {
    display: flex;
    align-items: center;

    gap: var(--spacer-2xs);
  }
  div:nth-child(2) {
    svg {
      width: var(--rem-12);
      height: var(--rem-12);
    }
    transform: ${({ $isHighlightView }) =>
      $isHighlightView ? 'rotate(0deg)' : 'rotate(-180deg)'};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.contentHover};
    border-radius: var(--radius-md);
  }
`;
const HightlightPostList = styled.div`
  height: 200px;
  background-color: lightgray;

  margin-bottom: var(--spacer-2xs);
`;

const PostWrapper = styled.div``;

export default PostList;
