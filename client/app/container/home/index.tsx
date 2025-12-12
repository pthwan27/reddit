import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/app/store/authStore';
import { usePostStore } from '@/app/store/postStore';

import { styled } from 'styled-components';

import ErrorMessage from '@/app/components/common/errorMessage';
import LoadingSpinner from '@/app/components/common/loading/loadingSpinner';

import { CustomError } from '@/app/types';

import HomePostListContainer from './list';

const Home = () => {
  const { user, loading: isAuthLoading } = useAuthStore();

  const [error, setError] = useState('');

  const { posts, clearPosts, fetchHomePosts, loading, hasMore } =
    usePostStore();

  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting && !loading && hasMore) {
          try {
            fetchHomePosts();
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
  }, [loading, hasMore]);

  useEffect(() => {
    if (!isAuthLoading) {
      clearPosts();
      fetchHomePosts();
    }
  }, [user]);

  useEffect(() => {
    fetchHomePosts();

    return () => {
      clearPosts();
    };
  }, []);
  return (
    <HomeContainer>
      <ObserverWrapper>
        <HomePostListContainer posts={posts} />
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
