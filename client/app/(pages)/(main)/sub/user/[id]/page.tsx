import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { clientAxiosInstance } from '@/app/utils/axios';

import SubDetailContainer from '@/app/container/sub/detail';

import { Sub } from '@/app/types';

async function getSubData(id: string): Promise<Sub> {
  try {
    const cookieStore = await cookies();

    const cookieString = await cookieStore.toString();

    const response = await clientAxiosInstance.get(`/api/sub/${id}`, {
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

const SubDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = (await params).id;

  const data = await getSubData(id);

  return <SubDetailContainer sub={data} />;
};

export default SubDetailPage;
