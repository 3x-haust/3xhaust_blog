'use client';

import axios from "axios";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { styled } from "styled-components";
import { useState, useEffect, useRef } from 'react';
import Loading from "@/components/common/Loading";
import media from "@/lib/styles/Media";
import Sidebar from "@/components/post/SideBar";
import Comments from "@/components/post/Comments";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; 
import Image from 'next/image';
import "highlight.js/styles/atom-one-dark.css";

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
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

const PostContentBlock = styled.section`
  padding-left: 1rem;
  padding-right: 1rem;
  width: 768px;
  margin: 5rem auto 0px;

  ${media.medium} {
    padding-right: 210px;
  }
  ${media.small} {
    width: 100%;
    padding-right: 0;
  }
`;

const Content = styled.div`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--color-text);
  margin-top: 1.5rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: 3rem;
  text-align: start; 
`;

const Thumbnail = styled.h1`
  margin-bottom: 7rem;
  text-align: center; 
`;

const StyledImage = styled(Image)`
  width: 50%;
  height: auto;
  object-fit: cover;
`;

export default function PostPage({ params }: { params: { title: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [headings, setHeadings] = useState<{ id: string; level: number; text: string }[]>([]);
  const headingRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await getPost(params.title);
        if (!res) notFound(); 
        setPost(res);
        extractHeadings(res.content);
      } catch (error) {
        console.error('Error fetching post:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.title]);

  function extractHeadings(markdown: string) {
    const headingRegex = /^(#{1,3})\s+(.*)$/gm;
    const newHeadings = [];
    let match;
    while ((match = headingRegex.exec(markdown)) !== null) {
      const id = `heading-${match.index}`;
      const sanitizedText = match[2].replace(/[^a-zA-Z0-9!?.,ㄱ-ㅎ|ㅏ-ㅣ|가-힣\s]/g, '').trim();
      newHeadings.push({ id, level: match[1].length, text: sanitizedText });
    }
    setHeadings(newHeadings);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetId = entry.target.id;
          const sidebarLink = document.querySelector(`li[data-id='${targetId}']`);
          if (sidebarLink) {
            if (entry.isIntersecting) {
              document.querySelectorAll(`li[data-id]`).forEach((li) => li.classList.remove('active'));
              sidebarLink.classList.add('active');
            }
          }
        });
      },
      { rootMargin: '0px 0px -85% 0px', threshold: 0.1 }
    );

    Object.values(headingRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(headingRefs.current).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [headings]);

  if (loading) return <Loading />;
  if (!post) notFound();

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar headings={headings}/>
      <PostContentBlock>
        <Title>{post?.title}</Title>
        <Thumbnail>
          <StyledImage
            width='100'
            height='100'
            src={`/images/${post.imageUrl}`}
            alt={post.title}
            placeholder='blur'
            blurDataURL='image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
          />
        </Thumbnail>
        <Content>
          <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw, remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 id={`heading-${node?.position?.start.offset}`} ref={(el: any) => (headingRefs.current[`heading-${node?.position?.start.offset}`] = el)} {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 id={`heading-${node?.position?.start.offset}`} ref={(el: any) => (headingRefs.current[`heading-${node?.position?.start.offset}`] = el)} {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 id={`heading-${node?.position?.start.offset}`} ref={(el: any) => (headingRefs.current[`heading-${node?.position?.start.offset}`] = el)} {...props} />
              ),

              h4: ({ node, ...props }) => (
                <h4 id={`heading-${node?.position?.start.offset}`} ref={(el: any) => (headingRefs.current[`heading-${node?.position?.start.offset}`] = el)} {...props} />
              ),
            }}
          >
            {post?.content}
          </ReactMarkdown>
        </Content>
        <Comments />
      </PostContentBlock>
    </div>
  );
}