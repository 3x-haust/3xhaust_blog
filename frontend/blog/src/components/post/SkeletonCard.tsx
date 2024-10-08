import { CardWrapper, CardImage, CardContent, CardDate, CardTitle, shimmer } from './CardStyle';
import styled from 'styled-components';

const SkeletonImage = styled(CardImage)`
  background-color: #f6f6f6;
  background-image: linear-gradient(to right, #f6f6f6 0%, #e7e7e7 20%, #f6f6f6 40%, #f6f6f6 100%);
  background-repeat: no-repeat;
  background-size: 200% 100%;
  animation: ${shimmer} 1s linear infinite;
`;

const SkeletonDate = styled(CardDate)`
  width: 30%;
  height: 25px;
  background-color: #eee;
  border: none;
`;

const SkeletonTitle = styled(CardTitle)`
  width: 60%;
  height: 24px;
  background-color: #eee;
`;

type SkeletonCardProps = {
  index: number;
};

export default function SkeletonCard({ index }: SkeletonCardProps) {
  return (
    <CardWrapper key={index}>
      <SkeletonImage />
      <CardContent>
        <SkeletonDate />
        <SkeletonTitle />
      </CardContent>
    </CardWrapper>
  )
}