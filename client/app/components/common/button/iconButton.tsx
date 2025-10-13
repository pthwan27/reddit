import { ButtonHTMLAttributes, ReactNode } from 'react';

import styled from 'styled-components';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  color?: string;
  backgroundColor?: string;
}

const IconButton = ({ icon, value }: IconButtonProps) => {
  return (
    <StyledButtonContainer>
      {icon}
      {value}
    </StyledButtonContainer>
  );
};

const StyledButtonContainer = styled.div`
  display: flex;

  gap: var(--spacer-xs);
  padding: var(--spacer-sm);

  border-radius: var(--radius-lg);

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.contendHover};
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;

export default IconButton;
