import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/app/store/authStore';
import { usePostStore } from '@/app/store/postStore';

import { styled } from 'styled-components';

import ErrorMessage from '@/app/components/common/errorMessage';
import LoadingSpinner from '@/app/components/common/loading/loadingSpinner';

import { CustomError } from '@/app/types';

import HomePostListContainer from './list';

const Home = () => {
  const { loading: isAuthLoading } = useAuthStore();

  const [error, setError] = useState('');
  const [sortOption, setSortOption] = useState<
    '최신순' | '인기순' | '댓글 많은 순'
  >('최신순');

  const { posts, clearPosts, fetchHomePosts, loading, hasMore } =
    usePostStore();

  const observerRef = useRef<HTMLDivElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectOption = (option: '최신순' | '인기순' | '댓글 많은 순') => {
    if (sortOption === option) {
      setIsDropdownOpen(false);
      return;
    }

    fetchHomePosts(true, option);
    setSortOption(option);
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
  }, [loading, hasMore, posts]);

  useEffect(() => {
    if (!isAuthLoading) {
      fetchHomePosts(true, sortOption);
    }

    return () => {
      clearPosts();
    };
  }, [isAuthLoading]);

  return (
    <HomeContainer>
      <ObserverWrapper>
        <HomePostListContainer
          posts={posts}
          isDropdownOpen={isDropdownOpen}
          setIsDropdownOpen={setIsDropdownOpen}
          handleSelect={handleSelectOption}
          sortOption={sortOption}
        />
        {loading && <LoadingSpinner />}

        {hasMore && !loading && (
          <div
            ref={observerRef}
            style={{ height: '20px', background: 'black' }}
          />
        )}
      </ObserverWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  margin-bottom: var(--spacer-2xl);
`;

const ObserverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-sm);
`;

export default Home;
