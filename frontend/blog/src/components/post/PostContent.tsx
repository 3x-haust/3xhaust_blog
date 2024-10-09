import React, { useRef, useState } from 'react';
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

const CodeBlock = styled.div`
  background-color: #1e1e1e;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
  margin: 1.5em 0;
  overflow: hidden;
  position: relative;
  z-index: 500;
`;

const CodeBlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2d2d2d;
  padding: 0.5rem 1rem;
`;

const CodeContent = styled.pre`
  margin: 0;
  padding: 1em;
  overflow-x: auto;
`;

const LanguageTag = styled.span`
  font-size: 12px;
  color: #ffffff;
  text-transform: uppercase;
`;

const CopyButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    color: #bbbbbb;
  }

  svg {
    margin-right: 5px;
  }
`;

interface PostContentProps {
  post: Post;
  headingRefs: React.MutableRefObject<{ [key: string]: HTMLElement | null }>;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function PostContent({ post, headingRefs }: PostContentProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const copyToClipboard = (text: string, index: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const components: Components = {
    h1: ({ node, ...props }) => (
      <h1 id={`heading-${node?.position?.start.offset}`} ref={(el) => { headingRefs.current[`heading-${node?.position?.start.offset}`] = el; }} {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 id={`heading-${node?.position?.start.offset}`} ref={(el) => { headingRefs.current[`heading-${node?.position?.start.offset}`] = el; }} {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 id={`heading-${node?.position?.start.offset}`} ref={(el) => { headingRefs.current[`heading-${node?.position?.start.offset}`] = el; }} {...props} />
    ),
    h4: ({ node, ...props }) => (
      <h4 id={`heading-${node?.position?.start.offset}`} ref={(el) => { headingRefs.current[`heading-${node?.position?.start.offset}`] = el; }} {...props} />
    ),
    code: ({ node, inline, className, children, ...props }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || '');
      const codeText = node?.children.map((item: { type: string; value: any; children: { value: any; }[]; }) => {
          if (item.type === 'text') {
              return item.value;
          } else if (item.type === 'element' && item.children) {
              return item.children.map((child: { value: any; }) => child.value).join('');
          }
          return '';
      }).join('');

      return !inline && match ? (
        <CodeBlock>
          <CodeBlockHeader>
            <LanguageTag>{match[1]}</LanguageTag>
            <CopyButton onClick={() => copyToClipboard(codeText, match[1])}>
              {copiedIndex === match[1] ? '✓ Copied!' : '📋 Copy'}
            </CopyButton>
          </CodeBlockHeader>
          <CodeContent className={className} {...props}>
            {children}
          </CodeContent>
        </CodeBlock>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <>
      <Title>{post.title}</Title>
      {post.imageUrl && (
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
      )}
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