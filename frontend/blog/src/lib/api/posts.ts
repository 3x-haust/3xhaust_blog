import axios from 'axios';
import { Post } from '@/types/post';

const API_URL = 'https://api.3xhaust.dev/api';

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await axios.get(`${API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_KEY}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function getPostByTitle(title: string): Promise<Post | null> {
  try {
    const response = await axios.get(`${API_URL}/posts/title/${title.replace(/-/g, ' ')}`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_KEY}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}