import media from "@/lib/styles/Media";
import Link from "next/link";
import { styled } from "styled-components";
import Image from 'next/image';

const BlogCard = styled.div`
  width: calc(33.333% - 2rem);
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 20px 0 var(--color-card-shadow);
  }
  user-select: none;

  ${media.large} {
    width: calc(50% - 2rem);
  }

  ${media.medium} {
    width: calc(50% - 2rem);
  }

  ${media.small} {
    width: 100%;
    margin: 0;
    & + & {
      margin-top: 1rem;
    }
  }
`;

const StyledLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
  border-radius: 1.5rem;
  border-width: 1px;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 10px
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  -webkit-box-align: start;
`;

const StyledDate = styled.p`
  border-radius: .1875rem solid var(--color-text);
  border-color: var(--color-text);
  border: 3px solid;
  border-radius: 20px;
  margin: 0.7rem 0 0 0;
  padding: 8px;
  font-size: 14px;
  font-weight: 800;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
`;

const StyledTitle = styled.h2`
  font-weight: 700;
  font-size: 24px;
  margin-top: 10px;
`

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
}

type CardProps = {
  post: Post;
  index: number;
};

export default function Card({ post, index }: CardProps) {
  return (
    <BlogCard key={post.id}>
      <StyledLink href={`/post/${post.title.replace(/\s+/g, '-')}`} prefetch>
        <StyledImage
          width='100'
          height='100'
          src={`/images/${post.imageUrl}`}
          alt={post.title}
          placeholder='blur'
          blurDataURL='image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
        />
        <Content>
          <StyledDate>
            {new window.Date(post.createdAt).toISOString().split('T')[0].replace(/-/g, '/')}
          </StyledDate>
          <StyledTitle>{post.title}</StyledTitle>
        </Content>
      </StyledLink>
    </BlogCard>
  )
}