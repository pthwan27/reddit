import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import HighlightPosts from '@/app/components/post/highlight/list';
import PostSort from '@/app/components/post/list/sort';

import PostItem from '@/app/container/post/item';

import { Post } from '@/app/types';

const PostList = ({
  posts,
  highlightPosts,
  isDropdownOpen,
  setIsDropdownOpen,
  handleSelectOption,
  sortOption,
}: {
  posts: Post[];
  highlightPosts: Post[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectOption: (option: '최신순' | '인기순' | '댓글 많은 순') => void;
  sortOption: '최신순' | '인기순' | '댓글 많은 순';
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isHighlightView, setIsHighlightView] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <PostListContainer>
      <PostSort
        wrapperRef={wrapperRef}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        handleSelectOption={handleSelectOption}
        sortOption={sortOption}
      />

      {highlightPosts.length > 0 && (
        <HighlightPosts
          highlightPosts={highlightPosts}
          isHighlightView={isHighlightView}
          setIsHighlightView={setIsHighlightView}
        />
      )}

      <Divider />
      {posts.map((post, idx) => (
        <PostWrapper key={idx + post.identifier}>
          <PostItem post={post} />
          {idx < posts.length - 1 && <Divider />}
        </PostWrapper>
      ))}
    </PostListContainer>
  );
};

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.hr`
  border: 0;
  border-bottom: var(--line-sm) solid
    ${({ theme }) => theme.colors.neutral.borderWeak};
`;

const PostWrapper = styled.div``;
export default PostList;
