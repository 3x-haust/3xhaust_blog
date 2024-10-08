import { styled, keyframes } from "styled-components";
import media from "@/lib/styles/Media";

export const CardWrapper = styled.div`
  width: calc(33.333% - 2rem);
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: var(--color-card-background);
  box-shadow: 15px 15px 30px var(--color-card-shadow1),
              -15px -15px 30px var(--color-card-shadow2);
  transition: border-radius cubic-bezier(0.075, 0.82, 0.165, 1) 1s,
              transform cubic-bezier(0.075, 0.82, 0.165, 1) 1s;
  user-select: none;
  &:hover {
    border-bottom-right-radius: 50px;
    border-top-left-radius: 50px;
    transform: scale(1.05);
  }

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

export const CardImage = styled.div`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const CardContent = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  color: var(--color-card-text);
`;

export const CardDate = styled.p`
  border: 3px solid var(--color-text);
  border-radius: 20px;
  margin: 0.7rem 0 0 0;
  padding: 8px;
  font-size: 14px;
  font-weight: 800;
  width: fit-content;
`;

export const CardTitle = styled.h2`
  font-weight: 700;
  font-size: 24px;
  margin-top: 10px;
`;

export const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;