import media from "@/lib/styles/Media";
import { keyframes, styled } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(33.333% - 2rem);
  margin: 0.9rem;
  overflow: hidden;

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


const SkeletonImage = styled.div`
  width: 100%;
  height: 200px;
  background-color: #f6f6f6;
  background-image: linear-gradient(to right, #f6f6f6 0%, #e7e7e7 20%, #f6f6f6 40%, #f6f6f6 100%);
  background-repeat: no-repeat;
  background-size: 200% 100%;
  animation: ${shimmer} 1s linear infinite;
`;

const SkeletonContent = styled.div`
  padding: 1rem;
  background-color: #f6f6f6;

  h1 {
    height: 25px;
    width: 30%;
    display: inline-block;
    background-color: #eee;
    margin-bottom: 0.5rem;
  }

  p {
    height: 16px;
    width: 60%;
    background-color: #eee;
    margin-bottom: 0.25rem;
  }
`;

type SkeletonCardProps = {
  index: number;
};

export default function SkeletonCard({ index }: SkeletonCardProps) {
  return (
    <SkeletonWrapper key={index}>
      <SkeletonImage />
      <SkeletonContent>
        <h1></h1>
        <p></p>
        <p></p>
      </SkeletonContent>
    </SkeletonWrapper>
  )
}