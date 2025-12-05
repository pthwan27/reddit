import { useEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import HightlightPosts from '@/app/components/post/list/highlightList';
import PostSort from '@/app/components/post/list/sort';

import PostItem from '@/app/container/post/item';

import { Post } from '@/app/types';

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
    <PostListContainer>
      <PostSort
        wrapperRef={wrapperRef}
        isSelecting={isSelecting}
        setIsSelecting={setIsSelecting}
        handleSelect={handleSelect}
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

const PostListContainer = styled.div``;
const PostWrapper = styled.div``;
export default PostList;
