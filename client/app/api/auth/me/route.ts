import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function GET(req: NextRequest) {
  try {
    const { data, status } = await serverAxiosInstance.get('/auth/me', {
      headers: {
        Cookie: req.headers.get('cookie') || '',
      },
    });

    return NextResponse.json(data, { status });
  } catch (err: unknown) {
    const error = err as CustomError;
    console.error('Me API error:', error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.error || 'Failed to get user info' },
      { status: error.response?.status || 401 }
    );
  }
}
