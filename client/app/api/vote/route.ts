import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function PATCH(req: NextRequest) {
  const { id, value, type } = await req.json();

  try {
    const { data, status } = await serverAxiosInstance.patch(
      '/vote',
      {
        id,
        value,
        type,
      },
      {
        headers: {
          Cookie: req.headers.get('cookie') || '',
        },
      }
    );

    return NextResponse.json(data, { status });
  } catch (err: unknown) {
    const error = err as CustomError;
    console.error('Vote API error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.error || 'Vote Error' },
      { status: error.response?.status || 500 }
    );
  }
}
