import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const response = await serverAxiosInstance.post('/auth/login', {
      email,
      password,
    });

    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    // 서버에서 설정된 쿠키를 클라이언트로 전달
    const setCookieHeader = response.headers['set-cookie'];

    if (setCookieHeader) {
      setCookieHeader.forEach((cookie: string) => {
        nextResponse.headers.append('Set-Cookie', cookie);
      });
    }

    return nextResponse;
  } catch (err: unknown) {
    const error = err as CustomError;
    console.error('Login API error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.error || 'Login failed' },
      { status: error.response?.status || 500 }
    );
  }
}
