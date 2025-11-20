import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';

import { CustomError } from '@/app/types';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const { data, status } = await axios(`${url}`);

    const ogTitleMatch = data.match(
      /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i
    );
    const titleMatch = data.match(/<title[^>]*>([^<]*)<\/title>/i);

    const ogDescriptionMatch = data.match(
      /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["']/i
    );
    const descriptionMatch = data.match(
      /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i
    );

    const ogImageMatch = data.match(
      /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i
    );

    const ogSiteNameMatch = data.match(
      /<meta[^>]*property=["']og:site_name["'][^>]*content=["']([^"']*)["']/i
    );
    const rawImage = ogImageMatch?.[1] || '';

    const proxiedImage = rawImage
      ? `/api/imageProxy?url=${encodeURIComponent(rawImage)}`
      : '';

    const metadata = {
      title: ogTitleMatch?.[1] || titleMatch?.[1] || '',
      description: ogDescriptionMatch?.[1] || descriptionMatch?.[1] || '',
      image: proxiedImage,
      siteName: ogSiteNameMatch?.[1] || new URL(url).hostname,
    };

    return NextResponse.json(metadata, { status });
  } catch (err: unknown) {
    const error = err as CustomError;
    console.error(
      'Get Link URL API error:',
      error.response?.data || error.message
    );
    return NextResponse.json(
      { error: error.response?.data?.error || 'Failed to get link preview' },
      { status: error.response?.status || 500 }
    );
  }
}
