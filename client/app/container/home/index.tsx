import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/app/store/authStore';
import { usePostStore } from '@/app/store/postStore';
import { useSubStore } from '@/app/store/subStore';

import { styled } from 'styled-components';

import ErrorMessage from '@/app/components/common/errorMessage';
import LoadingSpinner from '@/app/components/common/loading/loadingSpinner';
import HomeHighlightPosts from '@/app/components/home/highlight/list';
import HomeRightSideBar from '@/app/components/home/rightSideBar';

import { CustomError } from '@/app/types';

import HomePostList from './list';

const Home = () => {
  const { user } = useAuthStore();

  const {
    posts,
    highlightPosts,
    loading,
    hasMore,
    fetchHomePosts,
    fetchHighlightPosts,
    clearPosts,
    clearHighlightPosts,
  } = usePostStore();

  const { popularSubs, getPopularSubs, clearPopularSubs, setSelectedSub } =
    useSubStore();

  const observerRef = useRef<HTMLDivElement>(null);

  const [error, setError] = useState('');

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState<
    '최신순' | '인기순' | '댓글 많은 순'
  >('최신순');

  const handleSelectOption = (option: '최신순' | '인기순' | '댓글 많은 순') => {
    if (sortOption === option) {
      setIsDropdownOpen(false);
      return;
    }

    setSortOption(option);

    fetchHomePosts(true, option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting && !loading && hasMore && posts.length > 0) {
          try {
            fetchHomePosts(false, sortOption);
          } catch (err) {
            const error = err as CustomError;
            console.error('Fetching posts failed:', error);

            setError(
              error.response?.data?.error || '게시물 불러오기를 실패했습니다.'
            );
          }
        }
      },
      {
        threshold: 0.5,
        rootMargin: '100px',
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loading, hasMore, posts, sortOption, fetchHomePosts]);

  useEffect(() => {
    fetchHomePosts(true, sortOption);
    fetchHighlightPosts();
    getPopularSubs();

    setSelectedSub(null);

    return () => {
      clearPosts();
      clearHighlightPosts();
      clearPopularSubs();
    };
  }, []);

  return (
    <HomeContainer>
      {!user && (
        <HomeHighlightPosts
          highlightPosts={highlightPosts}
          isHighlightView={true}
        />
      )}
      <Main>
        <div>
          <HomePostList
            posts={posts}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            handleSelectOption={handleSelectOption}
            sortOption={sortOption}
          />
          {loading && <LoadingSpinner />}

          {hasMore && !loading && (
            <div
              ref={observerRef}
              style={{ height: '20px', background: 'black' }}
            />
          )}
        </div>

        <HomeRightSideBar user={user} popularSubs={popularSubs} />
      </Main>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </HomeContainer>
  );
};

const HomeContainer = styled.div``;

const Main = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);

  & > :nth-child(2) {
    display: none;
  }

  gap: var(--spacer-lg);

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 756px) minmax(0, 316px);

    & > :nth-child(2) {
      display: block;
    }
  }
`;

export default Home;
