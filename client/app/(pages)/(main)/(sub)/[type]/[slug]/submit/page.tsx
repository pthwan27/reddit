import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { clientAxiosInstance } from '@/app/utils/axios';

import SubmitPostContainer from '@/app/container/sub/detail/submit';

import { Sub } from '@/app/types';

async function getSubData(slug: string): Promise<Sub> {
  try {
    const cookieStore = await cookies();

    const cookieString = await cookieStore.toString();

    const response = await clientAxiosInstance.get(`/api/sub/${slug}`, {
      headers: {
        Cookie: cookieString,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to get sub data:', error);
    notFound();
  }
}
const SubmitPostPage = async ({
  params,
}: {
  params: Promise<{ type: string; slug: string }>;
}) => {
  const { slug } = await params;

  const data = await getSubData(slug);

  return <SubmitPostContainer sub={data} />;
};

export default SubmitPostPage;
