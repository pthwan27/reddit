import { useState } from "react";
import styled from "styled-components";
import AuthButton from "../../components/auth/AuthButton";
import { useAuth } from "../../context/authContext";
import PlaceHolderInput from "@/app/components/common/placeholderInput";
const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, setMode } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      await login(email, password);
    } catch (err: any) {
      setError(err.response?.data?.error || "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFilled = email && password;

  return (
    <StyledLoginContainer>
      <h2>로그인</h2>
      <PlaceHolderInput
        label="이메일을 입력하세요"
        value={email}
        type="email"
        required={true}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PlaceHolderInput
        label="비밀번호를 입력하세요"
        value={password}
        type="password"
        required={true}
        onChange={(e) => setPassword(e.target.value)}
      />

      <StyledHelper>
        <a>비밀 번호를 잊으셨나요?</a>
        <p>
          처음 이용하시나요?
          <a onClick={() => setMode("register")}> 가입하세요</a>
        </p>
      </StyledHelper>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <AuthButton
        type="button"
        onClick={handleLogin}
        disabled={!isFilled || isLoading}
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </AuthButton>
    </StyledLoginContainer>
  );
};
const StyledLoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacer-md);
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error || "#ff6b6b"};
  font: var(--font-14);
  text-align: center;
  margin: var(--spacer-xs) 0;
`;

const StyledHelper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  font: var(--font-14);
  gap: var(--spacer-xs);
  margin-top: var(--spacer-2xs);
  margin-bottom: var(--spacer-sm);
`;

export default LoginContainer;
