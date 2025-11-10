import { Comment, Post } from '@/app/types';

const CommentsContainer = ({
  post,
  comments,
}: {
  post: Post;
  comments: Comment[];
}) => {
  return (
    <div>
      {post.id}
      {comments.length}
    </div>
  );
};

export default CommentsContainer;
