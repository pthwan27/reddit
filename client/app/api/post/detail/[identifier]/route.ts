import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ identifier: string }> }
) {
  try {
    const { identifier } = await context.params;

    const { data, status } = await serverAxiosInstance.get(
      `/post/${identifier}`,
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
