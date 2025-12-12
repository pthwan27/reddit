'use client';

import React from 'react';

import { useAuthStore } from '@/app/store/authStore';

import styled from 'styled-components';

import LoadingSpinner from '../common/loading/loadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
}) => {
  const { user, loading } = useAuthStore();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      fallback || (
        <UnauthorizedDiv>
          <div>
            <h2>로그인이 필요합니다</h2>
            <p>
              <span>이 페이지에 접근하려면 로그인해야 합니다.</span>
            </p>
          </div>
        </UnauthorizedDiv>
      )
    );
  }

  return <>{children}</>;
};

const UnauthorizedDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;

  div {
    text-align: center;
    color: ${({ theme }) => theme.colors.global.black};

    h2 {
      margin-bottom: var(--spacer-sm);
      color: ${({ theme }) => theme.colors.primary};
    }

    p {
      color: ${({ theme }) => theme.colors.global.black};
    }
  }
`;

export default ProtectedRoute;
