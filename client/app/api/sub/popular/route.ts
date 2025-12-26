import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function GET(req: NextRequest) {
  try {
    const { data, status } = await serverAxiosInstance.get('/sub/popular', {
      headers: {
        Cookie: req.headers.get('cookie') || '',
      },
    });
    return NextResponse.json(data.subs, { status });
  } catch (err: unknown) {
    const error = err as CustomError;
    console.error(
      'Get popular subs API error:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        error: error.response?.data?.error || 'Failed to get popular subs list',
      },
      { status: error.response?.status || 500 }
    );
  }
}
