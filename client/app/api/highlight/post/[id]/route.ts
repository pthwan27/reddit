import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    const { data, status } = await serverAxiosInstance.get(
      `/highlight/post/${id}`,
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
      'Get Post Highlight API error:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      {
        error:
          error.response?.data?.error || 'Failed to get post highlight list',
      },
      { status: error.response?.status || 500 }
    );
  }
}
