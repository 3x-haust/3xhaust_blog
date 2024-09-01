'use client';

import styled from "styled-components";

const BlogCard = styled.div`
  `

  const BlogSection = styled.section`
    :hover {

    }
  `

export default function Home() {
  return (
    <main>
      <BlogSection>
        <BlogCard>
          <img className="cover-image"> </img>
          <h1 className="title">응애 </h1>
        </BlogCard>
        <BlogCard>
          <h1 className="title">응애 </h1>
        </BlogCard>
        <BlogCard>
          <h1 className="title">응애 </h1>
        </BlogCard>
        <BlogCard>
          <h1 className="title">응애 </h1>
        </BlogCard>
      </BlogSection>
    </main>
  );
}
