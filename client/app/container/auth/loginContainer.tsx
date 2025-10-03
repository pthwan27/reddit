import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { validaionCheck } from '@/app/utils/validationCheck';

import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/placeholderInput';

import { CustomError } from '@/app/types';

import AuthButton from '../../components/auth/AuthButton';
import { useAuth } from '../../context/authContext';

const LoginContainer = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, setMode } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }
    try {
      setError('');
      await login(email, password);

      if (
        typeof window !== 'undefined' &&
        window.location.pathname === '/login'
      ) {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push('/');
        }
      }
    } catch (err: unknown) {
      const error = err as CustomError;
      console.error('Login failed:', error);

      setError(error.response?.data?.error || '로그인에 실패했습니다.');
    }
  };

  const [isFilled, setIsFilled] = useState<boolean>(false);

  useEffect(() => {
    setIsFilled(
      validaionCheck(email, 'email') === 'valid' &&
        validaionCheck(password, 'password') === 'valid'
    );
  }, [email, password]);

  return (
    <StyledLoginContainer>
      <StyledHeader>
        <StyledTitle>로그인</StyledTitle>
        <StyledDesc>
          계속 진행할 경우 서비스 이용 약관에 동의하고
          <p>
            <span>개인정보 처리방침을 이해하는 것으로 간주됩니다.</span>
          </p>
        </StyledDesc>
      </StyledHeader>
      <PlaceHolderInput
        label="이메일을 입력하세요"
        value={email}
        type="email"
        maxLength={33}
        required={true}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PlaceHolderInput
        label="비밀번호를 입력하세요"
        value={password}
        type="password"
        maxLength={20}
        required={true}
        onChange={(e) => setPassword(e.target.value)}
      />

      <StyledHelper>
        <a>비밀 번호를 잊으셨나요?</a>
        <p>
          처음 이용하시나요?
          <a onClick={() => setMode('register')}> 가입하세요</a>
        </p>
      </StyledHelper>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <AuthButton type="button" onClick={handleLogin} disabled={!isFilled}>
        로그인
      </AuthButton>
    </StyledLoginContainer>
  );
};
const StyledLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacer-md);

  width: 100%;
  padding: 0 var(--spacer-4xl);
`;
const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacer-md);

  padding: var(--spacer-sm) 0;
`;
const StyledTitle = styled.h2`
  font: var(--font-title-h2);
`;
const StyledDesc = styled.span`
  font: var(--font-14-20-regular);
  text-align: center;
`;
const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error || '#ff6b6b'};
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
  padding-top: var(--spacer-sm);
`;

export default LoginContainer;
