import { ButtonHTMLAttributes } from 'react';

import styled from 'styled-components';

const AuthButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props} />;
};

const StyledButton = styled.button`
  width: 100%;
  margin-top: var(--spacer-xs);

  border: var(--line-md) solid
    ${({ theme }) => theme.colors.interactive.backgroundDisabled};
  background: ${({ theme }) => theme.colors.brand.background};
  color: ${({ theme }) => theme.colors.global.white};

  &:hover {
    border: var(--line-md) solid
      ${({ theme }) => theme.colors.brand.backgroundHover};
    background: ${({ theme }) => theme.colors.brand.backgroundHover};
  }

  &:disabled {
    border: var(--line-md) solid
      ${({ theme }) => theme.colors.interactive.backgroundDisabled};
    background: ${({ theme }) => theme.colors.interactive.backgroundDisabled};
    color: ${({ theme }) => theme.colors.interactive.contentDisabled};
  }
`;

export default AuthButton;
