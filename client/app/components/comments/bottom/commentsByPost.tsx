import { useEffect, useRef, useState } from 'react';

import { styled } from 'styled-components';

import { Comment } from '@/app/types';

import CommentSort from './sort';

const CommentsByPost = ({ comments }: { comments: Comment[] }) => {
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
    <StyledCommentsByPost>
      <CommentSort
        wrapperRef={wrapperRef}
        isSelecting={isSelecting}
        setIsSelecting={setIsSelecting}
        handleSelect={handleSelect}
        sortOption={sortOption}
      />
      <CommentsWrapper>{comments.length}</CommentsWrapper>
    </StyledCommentsByPost>
  );
};

const StyledCommentsByPost = styled.div`
  padding: 0 var(--spacer-md);

  @media (min-width: 768px) {
    padding: 0;
  }
`;

const CommentsWrapper = styled.div`
  margin-top: var(--spacer-sm);

  @media (min-width: 768px) {
    padding: 0;
  }
`;
export default CommentsByPost;
