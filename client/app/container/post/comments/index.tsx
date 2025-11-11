'use client';

import { useEffect } from 'react';

import formatTimeAgo from '@/app/utils/formatTimeAgo';

import { usePostStore } from '@/app/store/postStore';

import styled from 'styled-components';

import IconBox from '@/app/components/common/IconBox';
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
        <TopSection>
          <IconBox
            iconUrl={post.sub.iconUrl}
            altText={post.sub.title}
            width={24}
            height={24}
          />
          <span>r/{post.sub.title}</span>
          <span>•</span>
          <span>{formatTimeAgo(post.createdAt)}</span>
        </TopSection>
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
  margin: var(--spacer-xs) calc(-1 * var(--spacer-xs));

  padding: var(--spacer-xs) var(--spacer-xs) 0;
  @media (min-width: 768px) {
    margin-left: calc(-1 * var(--spacer-xs));
    margin-right: calc(-1 * var(--spacer-xs));
  }
`;

const TopSection = styled.section``;

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
