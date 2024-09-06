'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --color-text: #202125;
    --color-background: #ffffff;
    --color-card-text: #ffffff;
    --color-card-background: #2B2B2B;
    --color-card-shadow1: #191919;
    --color-card-shadow2: #292929;
    --color-card-border: rgba(0, 0, 0, 0.1);
    --color-notfound-bar: rgba(0, 0, 0, 0.3);
    --color-sidebar: rgba(0, 0, 0, 0.4);
    --color-sidebar-text: #ACACAC;
  }

  [data-theme="dark"] {
    --color-text: #ffffff;
    --color-background: #202125;
    --color-card-text: #ffffff;
    --color-card-background: rgb(69, 74, 78);
    --color-card-shadow1: rgba(230, 230, 230, 0.1);
    --color-card-shadow2: rgba(214, 214, 214, 0.1);
    --color-card-border: rgba(0, 0, 0, 0.1);
    --color-notfound-bar: rgba(255, 255, 255, 0.3);
    --color-sidebar: rgba(255, 255, 255, 0.4);
    --color-sidebar-text: #ACACAC;

  }

  body {
    background-color: var(--color-background);
    color: var(--color-text);
    transition: all 0.3s ease;
    font-family: 'Pretendard', sans-serif;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Thin.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-ExtraLight.ttf') format('truetype');
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-ExtraBold.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
  }
  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }
`;