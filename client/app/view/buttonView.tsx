import styled from "styled-components";

type buttonViewProps = {
  onClick: () => void;
  text: string;
};
const ButtonView = ({ onClick, text }: buttonViewProps) => {
  return (
    <StyledButton onClick={() => onClick()} disabled>
      {text}{" "}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  padding: var(--spacer-sm) var(--spacer-md);

  border: var(--line-md) solid ${({ theme }) => theme.colors.border};
  border-radius: var(--radius-xl);

  font-size: var(--font-16);
  margin-bottom: var(--spacer-md);

  width: 88%;
  cursor: pointer;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  transition: background 0.2s, color 0.2s, border 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.disabledText};
    border: 1px solid ${({ theme }) => theme.colors.disabled};
  }
`;

export default ButtonView;
