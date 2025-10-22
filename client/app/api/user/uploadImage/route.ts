import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const formData = await req.formData();

  const id = (await context.params).id;

  try {
    const { data, status } = await serverAxiosInstance.patch(
      `/user/${id}/uploadImage/profile`,
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
      'User Profile Image Upload API error:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        error: error.response?.data?.error || 'User Profile Image Upload Error',
      },
      { status: error.response?.status || 500 }
    );
  }
}
