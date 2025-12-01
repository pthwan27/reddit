import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ postId: string; postSlug: string }> }
) {
  try {
    const { postId, postSlug } = await context.params;

    const { data, status } = await serverAxiosInstance.get(
      `/post/${postId}/${postSlug}`,
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
      'Get my sub detail API error:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data?.error || 'Failed to get sub detail' },
      { status: error.response?.status || 500 }
    );
  }
}
