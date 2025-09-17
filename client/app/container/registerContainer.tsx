"use client";
import { useState } from "react";
import styled from "styled-components";
import { clientAxiosInstance } from "../utils/axios";
import axios from "axios";

const RegisterContainer = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await clientAxiosInstance.post("/api/auth/register", {
        email,
        username,
        password,
      });

      alert("회원가입이 완료되었습니다!");

      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error: any) {
      console.error("Registration failed:", error);
      const status = error.response?.status;
      const errorMessage = error.response?.data?.error;

      let koreanMessage = "";

      if (status === 409) {
        // 409 Conflict - 중복 오류
        if (errorMessage === "Email already exists") {
          koreanMessage = "이미 사용 중인 이메일입니다.";
        } else if (errorMessage === "Username already exists") {
          koreanMessage = "이미 사용 중인 사용자명입니다.";
        } else {
          koreanMessage = "이미 존재하는 정보입니다.";
        }
      } else if (status === 400) {
        koreanMessage = "입력 정보를 확인해주세요.";
      } else if (status === 500) {
        koreanMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      }

      alert(koreanMessage);
    }
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
      <StyledButton type="button" onClick={register} disabled={!isFilled}>
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

export default RegisterContainer;
