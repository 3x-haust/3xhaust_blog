import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log("Request received");
    const response = await axios.get('https://api.3xhaust.dev/api/posts', {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_KEY}` 
      }
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}