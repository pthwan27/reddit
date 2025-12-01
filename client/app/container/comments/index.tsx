'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { clientAxiosInstance } from '@/app/utils/axios';

import { usePostStore } from '@/app/store/postStore';

import styled from 'styled-components';

import CommentSort from '@/app/components/comments/bottom/sort';
import CommentsByPost from '@/app/components/comments/commentsByPost';
import CommentsByPostBody from '@/app/components/comments/top/body';
import CommentsByPostInfos from '@/app/components/comments/top/infos';
import ErrorMessage from '@/app/components/common/errorMessage';
import RichTextEditor from '@/app/components/common/input/richTextEditor';
import Skeleton from '@/app/components/common/loading/skeleton';
import RightSideBar from '@/app/components/sub/detail/rightSideBar';

import { useAuth } from '@/app/context/authContext';
import { Comment, Post } from '@/app/types';

const CommentsContainer = ({ post }: { post: Post }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { selectedPost, setSelectedPost } = usePostStore();

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
      formData.append('postSlug', post.slug);

      await clientAxiosInstance.post(
        `/api/comments/${post.id}/${post.slug}/submit`,
        formData
      );
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
        <TopSection>
          <CommentsByPostInfos {...selectedPost} />
          <CommentsByPostBody {...selectedPost} />
        </TopSection>
        <BottomSection>
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
        </BottomSection>
        <CommentsSection>
          <CommentSort
            wrapperRef={wrapperRef}
            isSelecting={isSelecting}
            setIsSelecting={setIsSelecting}
            handleSelect={handleSelect}
            sortOption={sortOption}
          />
          <CommentsByPost comments={comments} />
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

const TopSection = styled.section`
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

const BottomSection = styled.section`
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
    width: 100%;

    text-align: left;

    padding: var(--spacer-xs) var(--spacer-md);

    font: var(--font-16-20-regular);
    line-height: 1.5;

    color: ${({ theme }) => theme.colors.neutral.contentWeak};

    border: 1px solid ${({ theme }) => theme.colors.neutral.border};

    &:focus-within {
      border: 1px solid ${({ theme }) => theme.colors.neutral.borderMedium};
    }
  }
`;

export default CommentsContainer;
