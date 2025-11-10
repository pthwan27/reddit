import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { clientAxiosInstance } from '@/app/utils/axios';

import { Sub } from '@/app/types';

async function getCommentData(id: string, postSlug: string): Promise<Sub> {
  try {
    const cookieStore = await cookies();

    const cookieString = await cookieStore.toString();

    const response = await clientAxiosInstance.get(
      `/api/comments/${id}/${postSlug}`,
      {
        headers: {
          Cookie: cookieString,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to get sub data:', error);
    notFound();
  }
}

const SubDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string; postSlug: string }>;
}) => {
  const { id, postSlug } = await params;

  const data = await getCommentData(id, postSlug);

  return <>{data}</>;
};

export default SubDetailPage;
