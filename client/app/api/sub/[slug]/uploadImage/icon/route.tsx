import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const formData = await req.formData();

  const slug = (await context.params).slug;

  try {
    const { data, status } = await serverAxiosInstance.patch(
      `/sub/${slug}/uploadImage/icon`,
      formData,
      {
        headers: {
          Cookie: req.headers.get('cookie') || '',
        },
      }
    );

    return NextResponse.json(data, { status });
  } catch (err: unknown) {
    const error = err as CustomError;
    console.error(
      'Sub Icon Image Upload API error:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data?.error || 'Sub Icon Image Upload Error' },
      { status: error.response?.status || 500 }
    );
  }
}
