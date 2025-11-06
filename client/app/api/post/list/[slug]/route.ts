import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;

  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page') || '0';
  const limit = searchParams.get('limit') || '10';

  try {
    const { data, status } = await serverAxiosInstance.get(
      `/post/list/${slug}?page=${page}&limit=${limit}`,
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
      'Get Post List API error:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data?.error || 'Failed to get post list' },
      { status: error.response?.status || 500 }
    );
  }
}
