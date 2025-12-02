'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { clientAxiosInstance } from '@/app/utils/axios';

import { useCommentStore } from '@/app/store/commentStore';
import { usePostStore } from '@/app/store/postStore';

import styled from 'styled-components';

import CommentsOnPost from '@/app/components/comments/onPost';
import CommentSort from '@/app/components/comments/sort';
import ErrorMessage from '@/app/components/common/errorMessage';
import RichTextEditor from '@/app/components/common/input/richTextEditor';
import Skeleton from '@/app/components/common/loading/skeleton';
import PostActions from '@/app/components/post/detail/actions';
import PostBody from '@/app/components/post/detail/body';
import PostInfos from '@/app/components/post/detail/infos';
import RightSideBar from '@/app/components/sub/detail/rightSideBar';

import { useAuth } from '@/app/context/authContext';
import { Comment, Post } from '@/app/types';

const CommentsContainer = ({ post }: { post: Post }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);

  const { selectedPost, setSelectedPost } = usePostStore();

  const { loading, hasMore, fetchComments } = useCommentStore();

  const [comments] = useState<Comment[]>([]);

  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);
  const [sortOption, setSortOption] = useState<
    '최신순' | '인기순' | '댓글 많은 순'
  >('최신순');

  const router = useRouter();

  const { user } = useAuth();

  const openInputEditor = () => {
    setIsFocused(true);
  };

  const cancelHandler = () => {
    setComment('');
    setIsFocused(false);
  };

  const commentSubmitHandler = async () => {
    if (!user) return router.push('/login');

    try {
      const formData = new FormData();

      formData.append('comment', comment);
      formData.append('postId', post.id.toString());

      await clientAxiosInstance.post(`/api/comments/submit`, formData);
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Create Sub failed:', error);
      setError(error.message);
    }
  };

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

  useEffect(() => {
    if (!selectedPost) {
      setSelectedPost(post);
    }
  }, [selectedPost, post]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting && !loading && hasMore) {
          fetchComments(post.id);
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
  }, [loading, hasMore, post.slug]);

  if (!selectedPost) {
    return (
      <SkeletonWrapper>
        <Skeleton></Skeleton>
      </SkeletonWrapper>
    );
  }

  return (
    <GridWrapper>
      <CommentsWrapper>
        <PostSection>
          <PostInfos {...selectedPost} />
          <PostBody {...selectedPost} />
          <PostActions {...selectedPost} />
        </PostSection>
        <InputSection>
          <InputWrapper>
            {!isFocused ? (
              <button onClick={openInputEditor}>답글을 달아보세요</button>
            ) : (
              <RichTextEditor
                content={comment}
                onChange={setComment}
                placeholder=""
                isToolbarVisibleDefault={false}
                editorHeightPercentage={50}
                isInSubmitMode={true}
                submitHandler={commentSubmitHandler}
                cancelHandler={cancelHandler}
              />
            )}
          </InputWrapper>
        </InputSection>
        <CommentsSection>
          <CommentSort
            wrapperRef={wrapperRef}
            isSelecting={isSelecting}
            setIsSelecting={setIsSelecting}
            handleSelect={handleSelect}
            sortOption={sortOption}
          />
          <ObserverWrapper>
            <CommentsOnPost comments={comments} />

            {loading && (
              <SkeletonWrapper>
                <Skeleton />
              </SkeletonWrapper>
            )}
            <div
              ref={observerRef}
              style={{ height: '20px', background: 'black' }}
            />
          </ObserverWrapper>
        </CommentsSection>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </CommentsWrapper>
      <RightSideBar sub={selectedPost.sub} />
    </GridWrapper>
  );
};
const SkeletonWrapper = styled.div`
  width: 100%;
  height: 400px;
`;

const GridWrapper = styled.div`
  display: grid;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;

  gap: var(--spacer-lg);

  grid-template-columns: minmax(0, 1fr);

  & > :nth-child(2) {
    display: none;
  }

  @media (min-width: 768px) {
    & > :nth-child(2) {
      display: block;
    }

    grid-template-columns: minmax(0, 756px) minmax(0, 316px);
  }
`;

const CommentsWrapper = styled.div``;

const PostSection = styled.section`
  display: flex;
  flex-direction: column;

  padding-top: var(--spacer-xs);
  margin-bottom: var(--spacer-xs);

  @media (min-width: 768px) {
    padding: var(--spacer-xs) var(--spacer-xs) 0;
  }

  @media (min-width: 768px) {
    border-radius: var(--radius-md);
  }

  @media (min-width: 768px) {
    margin-top: var(--spacer-xs);
    margin-right: calc(-1 * var(--spacer-xs));
    margin-left: calc(-1 * var(--spacer-xs));
  }
`;

const InputSection = styled.section`
  @media (min-width: 768px) {
    padding: var(--spacer-xs) var(--spacer-xs) 0;
  }

  @media (min-width: 768px) {
    border-radius: var(--radius-md);
  }

  @media (min-width: 768px) {
    margin-top: var(--spacer-xs);
    margin-right: calc(-1 * var(--spacer-xs));
    margin-left: calc(-1 * var(--spacer-xs));
  }
`;

const CommentsSection = styled.section`
  padding: 0 var(--spacer-md);

  @media (min-width: 768px) {
    padding: 0;
  }
`;
const InputWrapper = styled.div`
  padding: 0 var(--spacer-md);

  @media (min-width: 768px) {
    padding: 0;
  }

  > button {
    display: flex;

    width: 100%;

    padding: var(--spacer-xs) var(--spacer-md);
    cursor: text;

    font: var(--font-16-20-regular);
    line-height: 1.5;

    color: ${({ theme }) => theme.colors.neutral.contentWeak};

    border: 1px solid ${({ theme }) => theme.colors.neutral.border};

    &:focus-within {
      border: 1px solid ${({ theme }) => theme.colors.neutral.borderMedium};
    }
  }
`;

const ObserverWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacer-sm);
`;

export default CommentsContainer;
