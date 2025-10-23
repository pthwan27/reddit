import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function POST(req: NextRequest) {
  try {
    const response = await serverAxiosInstance.post('/auth/logout', {
      headers: {
        Cookie: req.headers.get('cookie') || '',
      },
    });

    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    const setCookieHeader = response.headers['set-cookie'];

    if (setCookieHeader) {
      setCookieHeader.forEach((cookie: string) => {
        nextResponse.headers.append('Set-Cookie', cookie);
      });
    }
    return nextResponse;
  } catch (err: unknown) {
    const error = err as CustomError;
    console.error('Logout API error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.error || 'Logout failed' },
      { status: error.response?.status || 500 }
    );
  }
}
