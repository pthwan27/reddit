import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import HightlightPosts from '@/app/components/post/list/highlightList';
import PostSort from '@/app/components/post/list/sort';

import PostItem from '@/app/container/post/item';

import { Post } from '@/app/types';

const PostList = ({
  posts,
  isDropdownOpen,
  setIsDropdownOpen,
  handleSelectOption,
  sortOption,
}: {
  posts: Post[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectOption: (option: '최신순' | '인기순' | '댓글 많은 순') => void;
  sortOption: '최신순' | '인기순' | '댓글 많은 순';
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isHighlightView, setIsHighlightView] = useState(false);

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

      <HightlightPosts
        isHighlightView={isHighlightView}
        setIsHighlightView={setIsHighlightView}
      />

      <hr />
      {posts.map((post, idx) => (
        <PostWrapper key={idx + post.identifier}>
          <PostItem post={post} />
          {idx < posts.length - 1 && <hr />}
        </PostWrapper>
      ))}
    </PostListContainer>
  );
};

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-sm);
`;
const PostWrapper = styled.div``;
export default PostList;
