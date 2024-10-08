import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import styled from 'styled-components';
import Image from 'next/image';
import { Post } from '@/types/post';
import { Components } from 'react-markdown';

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

const Thumbnail = styled.div`
  margin-bottom: 7rem;
  text-align: center; 
`;

const StyledImage = styled(Image)`
  width: 50%;
  height: auto;
  object-fit: cover;
`;

const CodeBlock = styled.pre`
  background-color: #1e1e1e;
  color: #d4d4d4;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 1.5em 0;
  padding: 1em;
  overflow: auto;
  position: relative;
`;

const LanguageTag = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  padding: 2px 8px;
  font-size: 12px;
  color: #ffffff;
  background-color: #333333;
  border-bottom-left-radius: 4px;
  text-transform: uppercase;
`;

interface PostContentProps {
  post: Post;
  headingRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
}

export default function PostContent({ post, headingRefs }: PostContentProps) {
  const components: Components = {
    h1: ({ node, ...props }) => (
      <h1 id={`heading-${(node as any)?.position?.start.offset}`} ref={(el) => { headingRefs.current[`heading-${(node as any)?.position?.start.offset}`] = el; }} {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 id={`heading-${(node as any)?.position?.start.offset}`} ref={(el) => { headingRefs.current[`heading-${(node as any)?.position?.start.offset}`] = el; }} {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 id={`heading-${(node as any)?.position?.start.offset}`} ref={(el) => { headingRefs.current[`heading-${(node as any)?.position?.start.offset}`] = el; }} {...props} />
    ),
    h4: ({ node, ...props }) => (
      <h4 id={`heading-${(node as any)?.position?.start.offset}`} ref={(el) => { headingRefs.current[`heading-${(node as any)?.position?.start.offset}`] = el; }} {...props} />
    ),
    code: ({ node, inline, className, children, ...props }: { node?: any, inline?: boolean, className?: string, children?: React.ReactNode }) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <CodeBlock className={className} {...props}>
          <LanguageTag>{match[1]}</LanguageTag>
          {children}
        </CodeBlock>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
  };

  return (
    <>
      <Title>{post.title}</Title>
      <Thumbnail>
        <StyledImage
          width={100}
          height={100}
          src={`/images/${post.imageUrl}`}
          alt={post.title}
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
        />
      </Thumbnail>
      <Content>
        <ReactMarkdown
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
          remarkPlugins={[remarkGfm]}
          components={components}
        >
          {post.content}
        </ReactMarkdown>
      </Content>
    </>
  );
}