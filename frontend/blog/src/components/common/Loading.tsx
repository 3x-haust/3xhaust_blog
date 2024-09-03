'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { styled } from "styled-components";

const LoadingSection = styled.section`
  height: 80vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled(Image)`
  width: 10%;
  height: auto;
`;

export default function Loading() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  
  return (
    <LoadingSection>
      <StyledImage 
        src={resolvedTheme === 'light' ? "/images/light-loading.gif" : "/images/dark-loading.gif"} 
        alt='loading'
        width={10} 
        height={10}
      />
    </LoadingSection>
  );
}