import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function POST(req: NextRequest) {
  const { title, content, slug } = await req.json();

  try {
    const { data, status } = await serverAxiosInstance.post(
      '/post/submit',
      {
        title,
        content,
        slug,
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
    console.error(
      'Create Post API error:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data?.error || 'Create Post Error' },
      { status: error.response?.status || 500 }
    );
  }
}
