'use client';

import { GlobalStyle } from '@/lib/styles/GlobalStyle';
import styled from 'styled-components';

const Container = styled.div`
  font-family: 'Pretendard';
  height: 80vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ErrorTitle = styled.h1`
  display: inline-block;
  margin: 0 20px 0 0;
  padding: 0 23px 0 0;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
  line-height: 49px;
  border-right: 1px solid var(--color-notfound-bar);
`;

const ErrorMessage = styled.h2`
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  line-height: 49px;
  margin: 0;
`;

const NotFoundPage = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <ErrorTitle>404</ErrorTitle>
        <ErrorMessage>This page could not be found.</ErrorMessage>
      </Container>
    </>
  );
};

export default NotFoundPage;