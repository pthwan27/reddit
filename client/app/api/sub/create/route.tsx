import { NextRequest, NextResponse } from 'next/server';

import { serverAxiosInstance } from '@/app/utils/axios';

import { CustomError } from '@/app/types';

export async function POST(req: NextRequest) {
  const { userName, subName, description, banner, icon } = await req.json();

  try {
    const response = await serverAxiosInstance.post('/sub/create', {
      userName,
      subName,
      description,
      banner,
      icon,
    });

    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    return nextResponse;
  } catch (err: unknown) {
    const error = err as CustomError;
    console.error(
      'Create Sub API error:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data?.error || 'Create Sub Error' },
      { status: error.response?.status || 500 }
    );
  }
}
