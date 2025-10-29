import { Post } from '@/app/types';

import PostItem from './item';

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.identifier} post={post} />
      ))}
    </div>
  );
};
export default PostList;
