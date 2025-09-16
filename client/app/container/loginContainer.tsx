import { useState } from "react";
import styled from "styled-components";

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 로그인 로직
  };
  const isFilled = email && password;

  return (
    <StyledLoginContainer>
      <StyledInput
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledInput
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />{" "}
      <StyledButton onClick={handleLogin} disabled={!isFilled}>
        로그인
      </StyledButton>
    </StyledLoginContainer>
  );
};
const StyledLoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  border: var(--line-md) solid ${({ theme }) => theme.colors.border};

  margin: var(--spacer-xs) 0;

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

const StyledButton = styled.button`
  border: var(--line-md) solid ${({ theme }) => theme.colors.border};

  width: 88%;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.disabled};
    color: ${({ theme }) => theme.colors.disabledText};
  }
`;

export default LoginContainer;
