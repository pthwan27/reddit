import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { validationCheck } from '@/app/utils/validationCheck';

import { useSubStore } from '@/app/store/subStore';

import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/input/placeholderInput';

import { CustomError } from '@/app/types';

import AuthButton from '../../components/auth/AuthButton';
import { useAuth } from '../../context/authContext';

const LoginContainer = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login, setMode } = useAuth();

  const { getMySubs } = useSubStore();

  const emailValidation = useMemo(
    () => validationCheck(email, 'email'),
    [email]
  );
  const passwordValidation = useMemo(
    () => validationCheck(password, 'password'),
    [password]
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    try {
      await login(email, password, () => {
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
        setError('');

        getMySubs();
      });
    } catch (err: unknown) {
      const error = err as CustomError;
      console.error('Login failed:', error);

      setError(error.response?.data?.error || '로그인에 실패했습니다.');
    }
  };

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
        validationState={emailValidation as 'valid' | 'invalid' | 'none'}
      />

      <PlaceHolderInput
        label="비밀번호를 입력하세요"
        value={password}
        type="password"
        maxLength={20}
        required={true}
        onChange={(e) => setPassword(e.target.value)}
        validationState={passwordValidation as 'valid' | 'invalid' | 'none'}
      />

      <StyledHelper>
        <a>비밀 번호를 잊으셨나요?</a>
        <p>
          처음 이용하시나요?
          <a onClick={() => setMode('register')}> 가입하세요</a>
        </p>
      </StyledHelper>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <AuthButton
        type="submit"
        onClick={handleLogin}
        disabled={
          !(emailValidation === 'valid' && passwordValidation === 'valid')
        }
      >
        로그인
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

  width: 100%;
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
  font: var(--font-14);
  line-height: 1.25rem;
  text-align: center;

  color: ${({ theme }) => theme.components.tooltip.neutral.text || '#333D42'};
`;
const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.global.error || '#ff6b6b'};
  font: var(--font-14);
  text-align: center;
  margin: var(--spacer-xs) 0;
`;

const StyledHelper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  font: var(--font-14);
  color: ${({ theme }) => theme.components.tooltip.neutral.text || '#333D42'};

  padding: 0 var(--spacer-md);
  gap: var(--spacer-xs);

  margin-top: var(--spacer-2xs);
  margin-bottom: var(--spacer-sm);

  a {
  }
  p {
    margin-top: var(--spacer-sm);
  }
`;

export default LoginContainer;
