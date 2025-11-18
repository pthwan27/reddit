import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid ${({ theme }) => theme.colors.neutral.border};
  border-top: 3px solid ${({ theme }) => theme.colors.primary.background};
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

const SmallLoadingSpinner = () => {
  return <StyledSpinner />;
};

export default SmallLoadingSpinner;
