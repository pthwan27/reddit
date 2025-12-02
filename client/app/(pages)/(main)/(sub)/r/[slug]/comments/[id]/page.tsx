import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { clientAxiosInstance } from '@/app/utils/axios';

import PostCommentsContainer from '@/app/container/comments';

import { Post } from '@/app/types';

async function getDetailPost(id: number): Promise<{ post: Post }> {
  try {
    const cookieStore = await cookies();

    const cookieString = await cookieStore.toString();

    const response = await clientAxiosInstance.get(`/api/post/detail/${id}}`, {
      headers: {
        Cookie: cookieString,
      },
    });

    return { post: response.data };
  } catch (error) {
    console.error('Failed to get sub data:', error);
    notFound();
  }
}

const PostDetailPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;

  const data = await getDetailPost(id);
  return <PostCommentsContainer post={data.post} />;
};

export default PostDetailPage;
