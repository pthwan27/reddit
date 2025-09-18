import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const AuthButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props} />;
};

const StyledButton = styled.button`
  border: var(--line-md) solid ${({ theme }) => theme.colors.border};

  width: 88%;

  margin-top: var(--spacer-xs);

  background: ${({ theme }) => theme.colors.primaryDark};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDarkHover};
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;

export default AuthButton;
