import styled from 'styled-components';

import { Post } from '@/app/types';

import PostItem from './item';

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <StyledPostListDiv>
      {posts.map((post) => (
        <PostItem key={post.identifier} post={post} />
      ))}
    </StyledPostListDiv>
  );
};

const StyledPostListDiv = styled.div``;

export default PostList;
