'use client';

import { useEffect } from 'react';

import { usePostStore } from '@/app/store/postStore';

import styled from 'styled-components';

import PostActions from '@/app/components/post/item/actions';

import { Comment, Post } from '@/app/types';

const PostCommentsContainer = ({
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
    <PostComments>
      <PostWrapper>
        <TitleSection>{displayPost.title}</TitleSection>
        <ContentSection>{displayPost.body}</ContentSection>
        <PostActions {...displayPost} />
      </PostWrapper>
      <CommentsWrapper>{comments.length}</CommentsWrapper>
    </PostComments>
  );
};

const PostComments = styled.div``;
const PostWrapper = styled.div`
  margin: var(--spacer-xs) 0;

  padding: var(--spacer-xs) var(--spacer-xs) 0;
  @media (min-width: 768px) {
    margin-left: calc(-1 * var(--spacer-xs));
    margin-right: calc(-1 * var(--spacer-xs));
  }
`;

const TitleSection = styled.section`
  display: flex;
  justify-content: space-between;

  margin-bottom: var(--spacer-2xs);

  font: var(--font-18-20-semibold);
`;

const ContentSection = styled.section`
  margin-bottom: var(--spacer-xs);

  font: var(--font-14-20-regular);
`;

const CommentsWrapper = styled.div``;
export default PostCommentsContainer;
