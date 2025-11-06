import { InputHTMLAttributes } from 'react';

import styled from 'styled-components';

const AuthInput = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return <StyledInput {...props} />;
};

const StyledInput = styled.input`
  width: 88%;
  border: var(--line-md) solid
    ${({ theme }) => theme.components.input.secondary.default};
  background: ${({ theme }) => theme.components.input.secondary.default};

  &:active,
  &:focus {
    border: var(--line-md) solid ${({ theme }) => theme.colors.default.primary};
  }
  &:hover {
    background: ${({ theme }) => theme.components.input.secondary.hover};
  }
`;

export default AuthInput;
