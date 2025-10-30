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

export default PrimaryButton;
