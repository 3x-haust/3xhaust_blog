'use client';

import { notFound } from "next/navigation";
import { styled } from "styled-components";
import { useState, useEffect, useRef } from 'react';
import Loading from "@/components/common/Loading";
import media from "@/lib/styles/Media";
import Sidebar from "@/components/post/SideBar";
import Comments from "@/components/post/Comments";
import PostContent from "@/components/post/PostContent";
import { usePostByTitle } from "@/hooks/usePost";
import "highlight.js/styles/atom-one-dark.css";

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

export default function PostPage({ params }: { params: { title: string } }) {
  const { post, loading } = usePostByTitle(params.title);
  const [headings, setHeadings] = useState<{ id: string; level: number; text: string }[]>([]);
  const headingRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    if (post) {
      extractHeadings(post.content);
    }
  }, [post]);

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
        <PostContent post={post} headingRefs={headingRefs} />
        <Comments />
      </PostContentBlock>
    </div>
  );
}