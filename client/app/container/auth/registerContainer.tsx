'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { validaionCheck } from '@/app/utils/validationCheck';

import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/placeholderInput';

import { CustomError } from '@/app/types';

import AuthButton from '../../components/auth/AuthButton';
import { useAuth } from '../../context/authContext';

const RegisterContainer = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { register, setMode } = useAuth();

  const handleRegister = async () => {
    if (!email || !password || !username) {
      setError('이메일과 이름, 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setError('');
      await register(email, username, password);

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

      setEmail('');
      setUsername('');
      setPassword('');
    } catch (err: unknown) {
      const error = err as CustomError;
      console.error('Registration failed:', error);

      setError(error.response?.data?.error || '회원가입을 실패했습니다.');
    }
  };

  const [isFilled, setIsFilled] = useState<boolean>(false);

  useEffect(() => {
    setIsFilled(
      validaionCheck(username, 'name') === 'valid' &&
        validaionCheck(email, 'email') === 'valid' &&
        validaionCheck(password, 'password') === 'valid'
    );
  }, [username, email, password]);

  return (
    <StyledRegisterContainer>
      <StyledHeader>
        <StyledTitle>회원가입</StyledTitle>
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
        label="이름을 입력하세요"
        value={username}
        type="text"
        maxLength={20}
        required={true}
        onChange={(e) => setUsername(e.target.value)}
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
        <p>
          이미 아이디가 있으신가요?
          <a onClick={() => setMode('login')}> 로그인하세요</a>
        </p>
      </StyledHelper>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <AuthButton type="button" onClick={handleRegister} disabled={!isFilled}>
        회원가입
      </AuthButton>
    </StyledRegisterContainer>
  );
};
const StyledRegisterContainer = styled.div`
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
export default RegisterContainer;
