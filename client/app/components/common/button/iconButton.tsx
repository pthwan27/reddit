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
      <IconBox>{icon}</IconBox>
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

  font: var(--font-14);
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  width: var(--rem-20);
  height: var(--rem-20);

  border-radius: var(--radius-full);
  overflow: hidden;

  svg {
    width: 100%;
    height: 100%;

    border-radius: var(--radius-full);
    object-fit: cover;

    background: transparent;
  }
`;

export default IconButton;
