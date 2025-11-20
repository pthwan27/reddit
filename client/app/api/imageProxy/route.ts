import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';
import https from 'https';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json(
      { error: 'Image URL is required' },
      { status: 400 }
    );
  }

  try {
    const agent = new https.Agent({
      rejectUnauthorized: false,
    });

    const response = await axios.get(imageUrl, {
      httpsAgent: imageUrl.startsWith('https') ? agent : undefined,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      responseType: 'arraybuffer',
      timeout: 10000,
    });

    const contentType = response.headers['content-type'] || 'image/jpeg';
    const imageBuffer = response.data;

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);

    return NextResponse.json(
      { error: 'Failed to load image' },
      { status: 500 }
    );
  }
}
