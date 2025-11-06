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
  border: 3px solid ${({ theme }) => theme.colors.neutral.border}; /* 스피너의 기본 색상 */
  border-top: 3px solid ${({ theme }) => theme.colors.secondary}; /* 회전하는 부분의 색상 */
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite; /* 1초 동안 무한 반복 */
`;

const SmallLoadingSpinner = () => {
  return <StyledSpinner />;
};

export default SmallLoadingSpinner;
