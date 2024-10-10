import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import styled from 'styled-components';
import Image from 'next/image';
import { Post } from '@/types/post';
import { Components } from 'react-markdown';
import CodeBlock from '../code/editor/CodeBlock';

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
  const isEditable = post.content?.includes('java_editable');

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
      const language = match ? match[1] : '';
      const codeString = node?.children.map((item: { type: string; value: any; children: { value: any; }[]; }) => {
        if (item.type === 'text') {
          return item.value;
        } else if (item.type === 'element' && item.children) {
          return item.children.map((child: { value: any; }) => child.value).join('');
        }
        return '';
      }).join('');  

      return !inline && match ? (
        <CodeBlock 
          language={language} 
          value={codeString} 
          isEditable={isEditable}
        />
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
          {post.content.replace(/_editable/g, '').replace(/a_readonly/g, '')}
        </ReactMarkdown>
      </Content>
    </>
  );
}