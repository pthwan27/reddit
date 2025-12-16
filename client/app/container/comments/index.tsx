'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { useAuthStore } from '@/app/store/authStore';
import { useCommentStore } from '@/app/store/commentStore';
import { usePostStore } from '@/app/store/postStore';

import styled from 'styled-components';

import CommentPostActions from '@/app/components/comments/item/actions';
import CommentPostBody from '@/app/components/comments/item/body';
import CommentPostInfos from '@/app/components/comments/item/infos';
import CommentInput from '@/app/components/comments/item/input';
import CommentSort from '@/app/components/comments/item/sort';
import ErrorMessage from '@/app/components/common/errorMessage';
import LoadingSpinner from '@/app/components/common/loading/loadingSpinner';
import Skeleton from '@/app/components/common/loading/skeleton';
import RightSideBar from '@/app/components/sub/rightSideBar';

import CommentItem from '@/app/container/comments/item';

import { Post } from '@/app/types';

const CommentList = ({ post }: { post: Post }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { user } = useAuthStore();

  const { selectedPost, setSelectedPost } = usePostStore();
  const { comments, loading, fetchComments, submitComment } = useCommentStore();

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [content, setContent] = useState('');

  const [error, setError] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState<
    '최신순' | '인기순' | '댓글 많은 순'
  >('최신순');

  const openInputEditor = () => {
    setIsEditorOpen(true);
  };

  const cancelHandler = () => {
    setContent('');
    setIsEditorOpen(false);
  };

  const commentSubmitHandler = async () => {
    if (!user) return router.push('/login');

    try {
      setError('');

      await submitComment(post.id, content, 'post');

      cancelHandler();
    } catch (err: unknown) {
      const error = err as Error;
      console.error('Submit Comment failed:', error);
      setError(error.message);
    }
  };

  const handleSelectOption = (option: string) => {
    setSortOption(option as typeof sortOption);
    setIsDropdownOpen(false);
  };

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

  useEffect(() => {
    setSelectedPost(post);
    fetchComments(post.id);

    return () => {
      setSelectedPost(null);
    };
  }, [post]);

  if (!selectedPost) {
    return (
      <SkeletonWrapper>
        <Skeleton></Skeleton>
      </SkeletonWrapper>
    );
  }

  return (
    <GridWrapper>
      <PostCommentsWrapper>
        <PostInfoSection>
          <CommentPostInfos {...selectedPost} />
          <CommentPostBody {...selectedPost} />
          <CommentPostActions {...selectedPost} />
        </PostInfoSection>
        <InputSection>
          <CommentInput
            isEditorOpen={isEditorOpen}
            openInputEditor={openInputEditor}
            cancelHandler={cancelHandler}
            content={content}
            setContent={setContent}
            commentSubmitHandler={commentSubmitHandler}
          />
        </InputSection>
        <CommentsSection>
          <CommentSort
            wrapperRef={wrapperRef}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            handleSelectOption={handleSelectOption}
            sortOption={sortOption}
          />
          <CommentListWrapper>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div />
                {comments.map((comment) => (
                  <CommentItem {...comment} key={comment.identifier} />
                ))}
              </>
            )}
          </CommentListWrapper>
        </CommentsSection>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </PostCommentsWrapper>
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
  background: ${({ theme }) => theme.colors.neutral.background};

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
const PostCommentsWrapper = styled.div``;

const PostInfoSection = styled.section`
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
    margin: var(--spacer-xs) calc(-1 * var(--spacer-xs)) 0;
  }
`;

const InputSection = styled.section`
  margin-top: var(--spacer-md);

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

const CommentListWrapper = styled.section`
  display: flex;
  flex-direction: column;

  gap: var(--spacer-md);

  margin-top: var(--spacer-sm);

  @media (min-width: 768px) {
    padding: 0;
  }
`;

export default CommentList;
