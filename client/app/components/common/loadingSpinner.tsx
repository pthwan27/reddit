'use client";';

import styled from 'styled-components';

const LoadingSpinner = () => {
  return (
    <StyledLoadingSpinner>
      <div></div>
      <div></div>
      <div></div>
    </StyledLoadingSpinner>
  );
};
const StyledLoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100vh;

  div {
    width: 16px;
    height: 16px;
    margin: 0 4px;
    background: ${({ theme }) => theme.colors?.primary || '#FF4500'};
    border-radius: 50%;
    animation: loading-bounce 0.6s infinite alternate;
  }

  div:nth-child(2) {
    animation-delay: 0.2s;
  }
  div:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes loading-bounce {
    to {
      transform: translateY(-20px);
      opacity: 0.6;
    }
  }
`;

export default LoadingSpinner;
