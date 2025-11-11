import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { clientAxiosInstance } from '@/app/utils/axios';

import PostCommentsContainer from '@/app/container/post/comments';

import { Comment, Post } from '@/app/types';

async function getCommentData(
  postId: string,
  postSlug: string
): Promise<{ post: Post; comments: Comment[] }> {
  try {
    const cookieStore = await cookies();

    const cookieString = await cookieStore.toString();

    const response = await clientAxiosInstance.get(
      `/api/post/comments/${postId}/${postSlug}`,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    return { post: response.data.post, comments: response.data.comments };
  } catch (error) {
    console.error('Failed to get sub data:', error);
    notFound();
  }
}

const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ postId: string; postSlug: string }>;
}) => {
  const { postId, postSlug } = await params;

  const data = await getCommentData(postId, postSlug);
  return <PostCommentsContainer post={data.post} comments={data.comments} />;
};

export default PostDetailPage;
