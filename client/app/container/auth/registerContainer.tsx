'use client';

import React, { useState } from 'react';

import styled from 'styled-components';

import PlaceHolderInput from '@/app/components/common/placeholderInput';

import AuthButton from '../../components/auth/AuthButton';
import { useAuth } from '../../context/authContext';

const RegisterContainer = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { register, isLoading, setMode } = useAuth();

  const handleRegister = async () => {
    try {
      setError('');
      await register(email, username, password);

      alert('회원가입이 완료되었습니다!');

      setEmail('');
      setUsername('');
      setPassword('');
    } catch (error: any) {
      console.error('Registration failed:', error);

      const status = error.response?.status;
      const errorMessage = error.response?.data?.error;

      let koreanMessage = '';

      // 409 Conflict - 중복 오류
      if (status === 409) {
        if (errorMessage === 'Email already exists') {
          koreanMessage = '이미 사용 중인 이메일입니다.';
        } else if (errorMessage === 'Username already exists') {
          koreanMessage = '이미 사용 중인 사용자명입니다.';
        } else {
          koreanMessage = '이미 존재하는 정보입니다.';
        }
      } else if (status === 400) {
        koreanMessage = '입력 정보를 확인해주세요.';
      } else if (status === 500) {
        koreanMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
      } else {
        koreanMessage = '회원가입에 실패했습니다.';
      }

      setError(koreanMessage);
      alert(koreanMessage);
    }
  };

  const isFilled = email && username && password;

  return (
    <StyledRegisterContainer>
      <StyledTitle>회원가입</StyledTitle>
      <StyledDesc>
        계속 진행할 경우 서비스 이용 약관에 동의하고
        <p>개인정보 처리방침을 이해하는 것으로 간주됩니다.</p>
      </StyledDesc>
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

      <AuthButton
        type="button"
        onClick={handleRegister}
        disabled={!isFilled || isLoading}
      >
        {isLoading ? '회원가입 중...' : '회원가입'}
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
`;
const StyledTitle = styled.h2`
  font: var(--font-title-h2);
`;
const StyledDesc = styled.p`
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
`;
export default RegisterContainer;
