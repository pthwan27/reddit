import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

const PrimaryButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <StyledButton {...props} />;
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
