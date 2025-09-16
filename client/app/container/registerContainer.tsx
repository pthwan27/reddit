"use client";
import { useState } from "react";
import styled from "styled-components";

const RegisterContainer = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    console.log(email, username, password);
    // 회원가입 로직
  };

  const isFilled = email && username && password;

  return (
    <StyledRegisterContainer>
      <StyledInput
        value={email}
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledInput
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <StyledInput
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledButton onClick={register} disabled={!isFilled}>
        회원가입
      </StyledButton>
    </StyledRegisterContainer>
  );
};
const StyledRegisterContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledInput = styled.input`
  border: var(--line-md) solid ${({ theme }) => theme.colors.grayBackground};

  margin: var(--spacer-xs) 0;

  width: 88%;

  background: ${({ theme }) => theme.colors.grayBackground};
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

export default RegisterContainer;
