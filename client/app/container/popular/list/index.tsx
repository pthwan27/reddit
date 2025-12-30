import { useEffect, useRef } from 'react';

import styled from 'styled-components';

import PopularPostSort from '@/app/components/popular/list/sort';

import { Post } from '@/app/types';

import PopularPostItem from '../item';

const PopularPostList = ({
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
    <PopularPostListContainer>
      <PopularPostSort
        wrapperRef={wrapperRef}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        handleSelectOption={handleSelectOption}
        sortOption={sortOption}
      />

      <hr />
      {posts.map((post, idx) => (
        <PopularPostWrapper key={idx + post.identifier}>
          <PopularPostItem post={post} />
          {idx < posts.length - 1 && <hr />}
        </PopularPostWrapper>
      ))}
    </PopularPostListContainer>
  );
};

const PopularPostListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const PopularPostWrapper = styled.div``;

export default PopularPostList;
