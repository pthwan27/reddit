import { Comment } from '@/app/types';

const CommentsByPost = ({ comments }: { comments: Comment[] }) => {
  return <div>{comments.length}</div>;
};

export default CommentsByPost;
