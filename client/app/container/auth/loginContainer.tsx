import { useState } from "react";
import styled from "styled-components";
import AuthInput from "../../components/auth/AuthInput";
import AuthButton from "../../components/auth/AuthButton";
import { useAuth } from "../../context/authContext";

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      await login(email, password);
      // 로그인 성공 시 모달 닫기 등의 로직은 상위 컴포넌트에서 처리
    } catch (err: any) {
      setError(err.response?.data?.error || "로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const isFilled = email && password;

  return (
    <StyledLoginContainer>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AuthInput
        value={email}
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthInput
        value={password}
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <AuthButton onClick={handleLogin} disabled={!isFilled || isLoading}>
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
  gap: var(--spacer-xs);
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error || "#ff6b6b"};
  font-size: var(--font-14);
  text-align: center;
  margin: var(--spacer-xs) 0;
`;

export default LoginContainer;
