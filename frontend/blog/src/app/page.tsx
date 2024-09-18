'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import media from '../lib/styles/Media';
import axios from 'axios';
import Card from '../components/post/Card';
import SkeletonCard from '../components/post/SkeletonCard';

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

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  createdAt: Date;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('api/posts')
    .then((response) => {
      setPosts(response.data.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <BlogSection>
      {loading ? (
        <>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <SkeletonCard key={index} index={index}/> 
          ))}
        </>
      ) : (
        posts.map((post, index) => (
          <Card key={index} post={post} index={index} />
        ))
      )}
    </BlogSection>
  );
}

