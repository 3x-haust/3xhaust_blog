import { useState, useEffect } from 'react';
import { Post } from '@/types/post';
import { getPostByTitle } from '@/lib/api/posts';

export function usePost(title: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const fetchedPost = await getPostByTitle(title);
        setPost(fetchedPost);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [title]);

  return { post, loading };
}