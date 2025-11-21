import styled from 'styled-components';

const Skeleton = () => {
  return <SkeletonDiv></SkeletonDiv>;
};

const SkeletonDiv = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.neutral.background} 25%,
    ${({ theme }) => theme.colors.neutral.border} 50%,
    ${({ theme }) => theme.colors.neutral.background} 75%
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  overflow: hidden;
`;

export default Skeleton;
