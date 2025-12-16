import { useEffect, useRef } from 'react';

import styled from 'styled-components';

import HomePostSort from '@/app/components/home/list/sort';

import { Post } from '@/app/types';

import HomePostItem from '../item';

const HomePostList = ({
  posts,
  isDropdownOpen,
  setIsDropdownOpen,
  handleSelect,
  sortOption,
}: {
  posts: Post[];
  isDropdownOpen: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelect: (option: '최신순' | '인기순' | '댓글 많은 순') => void;
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
    <HomePostListContainer>
      <HomePostSort
        wrapperRef={wrapperRef}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        handleSelect={handleSelect}
        sortOption={sortOption}
      />

      <hr />
      {posts.map((post, idx) => (
        <HomePostWrapper key={idx + post.identifier}>
          <HomePostItem post={post} />
          {idx < posts.length - 1 && <hr />}
        </HomePostWrapper>
      ))}
    </HomePostListContainer>
  );
};

const HomePostListContainer = styled.div``;

const HomePostWrapper = styled.div``;

export default HomePostList;
