import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { clientAxiosInstance } from '@/app/utils/axios';


import { Post } from '@/app/types';
import CommentList from '@/app/container/comments';

async function getDetailPost(identifier: string): Promise<{ post: Post }> {
  try {
    const cookieStore = await cookies();

    const cookieString = await cookieStore.toString();

    const response = await clientAxiosInstance.get(
      `/api/post/detail/${identifier}`,
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
  params: Promise<{ identifier: string }>;
}) => {
  const { identifier } = await params;

  const data = await getDetailPost(identifier);
  return <CommentList post={data.post} />;
};

export default PostDetailPage;
