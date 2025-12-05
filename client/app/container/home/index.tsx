import { useEffect, useRef, useState } from 'react';

import { clientAxiosInstance } from '@/app/utils/axios';

import { styled } from 'styled-components';

import ErrorMessage from '@/app/components/common/errorMessage';
import LoadingSpinner from '@/app/components/common/loading/loadingSpinner';

import { CustomError, Post } from '@/app/types';

import HomePostListContainer from './list';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const observerRef = useRef<HTMLDivElement>(null);
  const getPostList = async () => {
    try {
      setLoading(true);
      const { data } = await clientAxiosInstance('/api/home/posts');
      setPosts(data.posts);

      setError('');
      setLoading(false);
    } catch (e) {
      const error = e as CustomError;
      setError(
        error.response?.data?.error || '게시물 불러오기에 실패했습니다.'
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostList();
  }, []);

  return (
    <HomeContainer>
      {posts.map((post, idx) => {
        return (
          <ObserverWrapper key={idx + post.identifier}>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <HomePostListContainer posts={posts} />
            )}
            <div
              ref={observerRef}
              style={{ height: '20px', background: 'black' }}
            />
          </ObserverWrapper>
        );
      })}
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
