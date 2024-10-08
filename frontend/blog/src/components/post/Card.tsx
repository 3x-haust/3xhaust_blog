import Link from "next/link";
import Image from 'next/image';
import { CardWrapper, CardImage, CardContent, CardDate, CardTitle } from './CardStyle';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

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
    <CardWrapper key={post.id}>
      <StyledLink href={`/post/${post.title.replace(/\s+/g, '-')}`} prefetch>
        <CardImage>
          <StyledImage
            width={100}
            height={100}
            src={`/images/${post.imageUrl}`}
            alt={post.title}
            placeholder='blur'
            blurDataURL='image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
          />
        </CardImage>
        <CardContent>
          <CardDate>
            {new Date(post.createdAt).toISOString().split('T')[0].replace(/-/g, '/')}
          </CardDate>
          <CardTitle>{post.title}</CardTitle>
        </CardContent>
      </StyledLink>
    </CardWrapper>
  )
}