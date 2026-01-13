import { useEffect, useRef } from 'react';

import styled from 'styled-components';

import HomePostSort from '@/app/components/home/list/sort';

import { Post } from '@/app/types';

import HomePostItem from '../item';

const HomePostList = ({
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
    <HomePostListContainer>
      <HomePostSort
        wrapperRef={wrapperRef}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        handleSelectOption={handleSelectOption}
        sortOption={sortOption}
      />

      <Divider />
      {posts.map((post, idx) => (
        <HomePostWrapper key={idx + post.identifier}>
          <HomePostItem post={post} />
          {idx < posts.length - 1 && <Divider />}
        </HomePostWrapper>
      ))}
    </HomePostListContainer>
  );
};

const HomePostListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Divider = styled.hr`
  border: 0;
  border-bottom: var(--line-sm) solid
    ${({ theme }) => theme.colors.neutral.borderWeak};
`;

const HomePostWrapper = styled.div``;

export default HomePostList;
