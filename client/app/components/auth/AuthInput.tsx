import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const AuthInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <StyledInput {...props} />;
};

const StyledInput = styled.input`
  border: var(--line-md) solid ${({ theme }) => theme.colors.grayBackground};

  width: 88%;

  background: ${({ theme }) => theme.colors.grayBackground};

  &:active,
  &:focus {
    border: var(--line-md) solid ${({ theme }) => theme.colors.secondaryLight};
  }
  &:hover {
    background: ${({ theme }) => theme.colors.grayHover};
  }
`;

export default AuthInput;
