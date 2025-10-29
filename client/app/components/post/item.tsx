import { Post } from '@/app/types';

const PostItem = ({ post }: { post: Post }) => {
  return <div>{post.title}</div>;
};
export default PostItem;
