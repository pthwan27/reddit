import { ButtonHTMLAttributes } from 'react';

import styled from 'styled-components';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  backgroundColor?: string;
}

const PrimaryButton = ({ value, disabled }: PrimaryButtonProps) => {
  return <StyledButton disabled={disabled}>{value}</StyledButton>;
};

const StyledButton = styled.button`
  background: ${({ theme }) => theme.colors.brand.background};
  color: ${({ theme }) => theme.colors.global.white};

  &:hover {
    background: ${({ theme }) => theme.colors.brand.backgroundHover};
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.interactive.backgroundDisabled};
    color: ${({ theme }) => theme.colors.interactive.contentDisabled};
  }
`;

export default PrimaryButton;
