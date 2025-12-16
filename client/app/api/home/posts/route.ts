import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = searchParams.get('page') || '0';
  const limit = searchParams.get('limit') || '7';
  const sortOption = searchParams.get('sortOption') || '최신순';

  try {
    const { data, status } = await serverAxiosInstance.get(
      `/post/list/?page=${page}&limit=${limit}&sortOption=${sortOption}`,
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
      'Get HomePost List API error:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data?.error || 'Failed to get home post list' },
      { status: error.response?.status || 500 }
    );
  }
}
