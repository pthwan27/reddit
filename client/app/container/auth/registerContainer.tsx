'use client';

import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';

import { validationCheck } from '@/app/utils/validationCheck';

import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/input/placeholderInput';

import { CustomError } from '@/app/types';

import AuthButton from '../../components/auth/AuthButton';
import { useAuth } from '../../context/authContext';

const RegisterContainer = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { register, setMode } = useAuth();

  const emailValidation = useMemo(
    () => validationCheck(email, 'email'),
    [email]
  );
  const nicknameValidation = useMemo(
    () => validationCheck(nickname, 'nickname'),
    [nickname]
  );
  const passwordValidation = useMemo(
    () => validationCheck(password, 'password'),
    [password]
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !nickname) {
      setError('이메일과 닉네임, 비밀번호를 입력해주세요.');
      return;
    }

    try {
      setError('');
      await register(email, nickname, password, () => {
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
        setNickname('');
        setPassword('');
      });
    } catch (err: unknown) {
      const error = err as CustomError;
      console.error('Registration failed:', error);

      setError(error.response?.data?.error || '회원가입을 실패했습니다.');
    }
  };

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
        validationState={emailValidation as 'valid' | 'invalid' | 'none'}
      />
      <PlaceHolderInput
        label="닉네임을 입력하세요"
        value={nickname}
        type="text"
        maxLength={20}
        required={true}
        onChange={(e) => setNickname(e.target.value)}
        validationState={nicknameValidation as 'valid' | 'invalid' | 'none'}
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
        <p>
          이미 아이디가 있으신가요?
          <a onClick={() => setMode('login')}> 로그인하세요</a>
        </p>
      </StyledHelper>
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <AuthButton
        type="submit"
        onClick={handleRegister}
        disabled={
          !(
            emailValidation === 'valid' &&
            nicknameValidation === 'valid' &&
            passwordValidation === 'valid'
          )
        }
      >
        회원가입
      </AuthButton>
    </StyledRegisterContainer>
  );
};
const StyledRegisterContainer = styled.form`
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

  gap: var(--spacer-xs);
  padding: 0 var(--spacer-md);

  margin-top: var(--spacer-2xs);
  margin-bottom: var(--spacer-sm);
`;
export default RegisterContainer;
