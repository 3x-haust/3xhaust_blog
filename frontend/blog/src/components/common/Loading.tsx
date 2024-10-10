
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import styled from "styled-components";

const LoadingSection = styled.section`
  height: 80vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader = styled.div`
  width: fit-content;
  color: var(--color-text);
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  line-height: 1.2em;
  height: 1.2em;
  overflow: hidden;
`;

const loadingText = [
  "Loading...",
  "⌰oading...",
  "⌰⍜ading...",
  "⌰⍜⏃ding...",
  "⌰⍜⏃⎅ing...",
  "⌰⍜⏃⎅⟟ng...",
  "⌰⍜⏃⎅⟟⋏g...",
  "⌰⍜⏃⎅⟟⋏☌...",
  "⌰⍜⏃⎅⟟⋏☌⟒..",
  "⌰⍜⏃⎅⟟⋏☌⟒⏁.",
  "⌰⍜⏃⎅⟟⋏☌⟒⏁⋔",
  "⌰⍜⏃⎅⟟⋏☌⟒⏁.",
  "⌰⍜⏃⎅⟟⋏☌⟒..",
  "⌰⍜⏃⎅⟟⋏☌...",
  "⌰⍜⏃⎅⟟⋏☌...",
  "⌰⍜⏃⎅⟟⋏g...",
  "⌰⍜⏃⎅⟟ng...",
  "⌰⍜⏃⎅ing...",
  "⌰⍜⏃ding...",
  "⌰⍜ading...",
  "⌰oading...",
  "Loading...",
];

export default function Loading() {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % loadingText.length);
    }, 100); // 0.1초마다 텍스트 변경

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LoadingSection>
      <Loader>{loadingText[textIndex]}</Loader>
    </LoadingSection>
  );
}