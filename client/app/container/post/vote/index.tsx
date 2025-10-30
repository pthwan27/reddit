import VoteDownIcon from '@/app/components/svgs/VoteDownIcon';
import VoteUpIcon from '@/app/components/svgs/VoteUpIcon';

import { Post } from '@/app/types';

const PostVoteContainer = ({ post }: { post: Post }) => {
  return (
    <div>
      <button>
        <VoteUpIcon />
      </button>
      <button>
        <VoteDownIcon />
      </button>
      <span>{post.voteScore}</span>
    </div>
  );
};

export default PostVoteContainer;
