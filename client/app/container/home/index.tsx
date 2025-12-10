import { useCallback, useEffect, useRef, useState } from 'react';

import { clientAxiosInstance } from '@/app/utils/axios';

import { styled } from 'styled-components';

import ErrorMessage from '@/app/components/common/errorMessage';
import LoadingSpinner from '@/app/components/common/loading/loadingSpinner';

import { useAuth } from '@/app/context/authContext';
import { CustomError, Post } from '@/app/types';

import HomePostListContainer from './list';

const Home = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState('');

  const observerRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(0);
  const LIMIT = 10;

  const getPostList = useCallback(
    async (isNewSearch: boolean = false) => {
      const currentPage = isNewSearch ? 0 : page;

      try {
        setLoading(true);

        const { data } = await clientAxiosInstance(
          `/api/home/posts?page=${currentPage}&limit=${LIMIT}`
        );

        setPosts((prev) =>
          page === 0 ? data.posts : [...prev, ...data.posts]
        );

        setPage((prevPage) => (prevPage !== 0 ? prevPage + 1 : 1));
        setHasMore(data.posts.length === LIMIT);
        setLoading(false);

        setError('');
      } catch (e) {
        const error = e as CustomError;
        setError(
          error.response?.data?.error || '게시물 불러오기에 실패했습니다.'
        );
        setLoading(false);
      }
    },
    [page]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting && !loading && hasMore) {
          getPostList(false);
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
      setPosts([]);
      setPage(0);
      getPostList(true);
    }
  }, [user]);

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

const HomeContainer = styled.div``;

const ObserverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-sm);
`;

export default Home;
