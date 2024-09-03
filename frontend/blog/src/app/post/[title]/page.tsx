'use client';

import axios from "axios";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { styled } from "styled-components";
import { useState, useEffect } from 'react';
import Loading from "@/components/common/Loading";
import media from "@/lib/styles/Media";

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
}

const PostContentBlock = styled.section`
  width: 768px;
  margin: 0 auto;
  margin-top: 5rem;
  ${media.medium} {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  ${media.small} {
    width: 100%;
  }
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-top: 1.5rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  text-align: center; 
`

export default function PostPage({ params }: { params: { title: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await getPost(params.title);
        if (!res) notFound(); 
        setPost(res);
      } catch (error) {
        console.error('Error fetching post:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.title]);

  if (loading) return <Loading />;
  if(!post) notFound();

  return (
    <PostContentBlock>
      <Title>{post?.title}</Title>
      <Content>
        <ReactMarkdown>{post?.content}</ReactMarkdown>
      </Content>
    </PostContentBlock>
  );
}

async function getPost(title: string): Promise<Post | null> {
  try {
    const res = await axios.get(`http://localhost:8000/api/posts/title/${title.replace(/-/g, ' ')}`);
    if (res.status !== 200) return null;
        
    return res.data.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}