import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { title: string } }) {
  const { title } = params;
  try {
    const response = await axios.get(`https://api.3xhaust.dev/api/posts/title/${title.replace(/-/g, ' ')}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_KEY}`
      }
    });

    if (response.status !== 200) return NextResponse.json(null, { status: 404 });

    return NextResponse.json(response.data.data);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(null, { status: 500 });
  }
}