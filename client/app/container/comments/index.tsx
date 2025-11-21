'use client';

import { useEffect } from 'react';

import { usePostStore } from '@/app/store/postStore';

import styled from 'styled-components';

import CommentsByPost from '@/app/components/comments/bottom/commentsByPost';
import CommentsByPostActions from '@/app/components/comments/top/actions';
import CommentsByPostBody from '@/app/components/comments/top/body';
import CommentsByPostInfos from '@/app/components/comments/top/infos';
import CommentInput from '@/app/components/comments/top/input';
import RightSideBar from '@/app/components/sub/detail/rightSideBar';

import { Comment, Post } from '@/app/types';

const CommentsContainer = ({
  post,
  comments,
}: {
  post: Post;
  comments: Comment[];
}) => {
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

  return (
    <GridWrapper>
      <CommentsWrapper>
        <TopSection>
          <CommentsByPostInfos {...displayPost} />
          <CommentsByPostBody {...displayPost} />
          <CommentsByPostActions {...displayPost} />
          <CommentInput />
        </TopSection>
        <BottomSection>
          <CommentsByPost comments={comments} />
        </BottomSection>
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

const BottomSection = styled.section``;

export default CommentsContainer;
