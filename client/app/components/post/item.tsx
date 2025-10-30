import { Post } from '@/app/types';

const PostItem = ({ post }: { post: Post }) => {
  return <div>{/*todo* title Item*/ post.user.username}/</div>;
};

export default PostItem;
