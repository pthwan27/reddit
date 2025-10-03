import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function POST(req: NextRequest) {
  try {
    const { data, status } = await serverAxiosInstance.post(
      '/auth/logout',
      {},
      {
        headers: {
          Cookie: req.headers.get('cookie') || '',
        },
      }
    );

    const response = NextResponse.json(data, { status });

    // 클라이언트 쿠키도 제거
    response.cookies.set('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    });

    return response;
  } catch (err: unknown) {
    const error = err as CustomError;
    console.error('Logout API error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.error || 'Logout failed' },
      { status: error.response?.status || 500 }
    );
  }
}
