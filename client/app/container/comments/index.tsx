'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { clientAxiosInstance } from '@/app/utils/axios';

import { usePostStore } from '@/app/store/postStore';

import styled from 'styled-components';

import CommentsByPost from '@/app/components/comments/bottom/commentsByPost';
import CommentsByPostActions from '@/app/components/comments/top/actions';
import CommentsByPostBody from '@/app/components/comments/top/body';
import CommentsByPostInfos from '@/app/components/comments/top/infos';
import ErrorMessage from '@/app/components/common/errorMessage';
import RichTextEditor from '@/app/components/common/input/richTextEditor';
import RightSideBar from '@/app/components/sub/detail/rightSideBar';

import { useAuth } from '@/app/context/authContext';
import { Comment, Post } from '@/app/types';

const CommentsContainer = ({
  post,
  comments,
}: {
  post: Post;
  comments: Comment[];
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const { user } = useAuth();

  const storePost = usePostStore((state) =>
    state.posts.find((p) => p.identifier === post.identifier)
  );

  useEffect(() => {
    if (!storePost) {
      usePostStore.setState((state) => ({
        posts: [post, ...state.posts],
      }));
    }
  }, [post.identifier, storePost]);

  const displayPost = storePost || post;

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

  return (
    <GridWrapper>
      <CommentsWrapper>
        <TopSection>
          <CommentsByPostInfos {...displayPost} />
          <CommentsByPostBody {...displayPost} />
          <CommentsByPostActions {...displayPost} />
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
          <CommentsByPost comments={comments} />
        </BottomSection>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </CommentsWrapper>
      <RightSideBar sub={displayPost.sub} />
    </GridWrapper>
  );
};

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
