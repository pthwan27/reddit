import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { clientAxiosInstance } from '@/app/utils/axios';

import PostCommentsContainer from '@/app/container/comments';

import { Post } from '@/app/types';

async function getDetailPost(
  postId: string,
  postSlug: string
): Promise<{ post: Post }> {
  try {
    const cookieStore = await cookies();

    const cookieString = await cookieStore.toString();

    const response = await clientAxiosInstance.get(
      `/api/post/${postId}/${postSlug}`,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );

    return { post: response.data };
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

  const data = await getDetailPost(postId, postSlug);
  return <PostCommentsContainer post={data.post} />;
};

export default PostDetailPage;
