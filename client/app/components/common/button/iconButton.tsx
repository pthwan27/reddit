import { ButtonHTMLAttributes, ReactNode } from 'react';

import styled from 'styled-components';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  color?: string;
  backgroundColor?: string;
}

const IconButton = ({ icon, value, onClick }: IconButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      {icon}
      {value}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;

  gap: var(--spacer-xs);
  padding: var(--spacer-sm);

  border-radius: var(--radius-lg);

  &:hover {
    background: ${({ theme }) => theme.colors.contendHover};
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;

export default IconButton;
