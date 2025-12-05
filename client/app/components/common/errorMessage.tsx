import styled from 'styled-components';

const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
  return <StyledErrorMessage>{children}</StyledErrorMessage>;
};

const StyledErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.global.error || '#ff6b6b'};
  font: var(--font-14);
  text-align: center;
  margin: var(--spacer-xs) 0;
`;

export default ErrorMessage;
