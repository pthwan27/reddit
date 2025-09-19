"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/authContext";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
const RegisterContainer = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { register, isLoading } = useAuth();

  const handleRegister = async () => {
    try {
      setError("");
      await register(email, username, password);

      alert("회원가입이 완료되었습니다!");

      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error: any) {
      console.error("Registration failed:", error);

      const status = error.response?.status;
      const errorMessage = error.response?.data?.error;

      let koreanMessage = "";

      // 409 Conflict - 중복 오류
      if (status === 409) {
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
      } else {
        koreanMessage = "회원가입에 실패했습니다.";
      }

      setError(koreanMessage);
      alert(koreanMessage);
    }
  };

  const isFilled = email && username && password;

  return (
    <StyledRegisterContainer>
      <AuthInput
        value={email}
        placeholder="Email"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />

      <AuthInput
        value={username}
        placeholder="Username"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
      />
      <AuthInput
        value={password}
        type="password"
        placeholder="Password"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AuthButton
        type="button"
        onClick={handleRegister}
        disabled={!isFilled || isLoading}
      >
        {isLoading ? "회원가입 중..." : "회원가입"}
      </AuthButton>
    </StyledRegisterContainer>
  );
};
const StyledRegisterContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacer-xs);
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error || "#ff6b6b"};
  font-size: var(--font-14);
  text-align: center;
  margin: var(--spacer-xs) 0;
`;

export default RegisterContainer;
