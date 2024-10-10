'use client';

import React from 'react';
import styled from 'styled-components';
import media from '../lib/styles/Media';
import Card from '../components/post/Card';
import SkeletonCard from '../components/post/SkeletonCard';
import { usePosts } from '@/hooks/usePost';

const BlogSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 5rem 9rem;

  ${media.xlarge} {
    padding: 5rem 6rem;
  }

  ${media.large} {
    padding: 5rem 4rem;
  }

  ${media.medium} {
    padding: 5rem 2rem;
  }

  ${media.small} {
    padding: 5rem 1rem;
    margin: 0;
  }
`;

export default function Home() {
  const { posts = [], loading } = usePosts();

  return (
    <BlogSection>
      {loading ? (
        <>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <SkeletonCard key={index} index={index}/> 
          ))}
        </>
      ) : (
        (posts ?? []).map((post, index) => (
          <Card key={index} post={post} index={index} />
        ))
      )}
    </BlogSection>
  );
}

