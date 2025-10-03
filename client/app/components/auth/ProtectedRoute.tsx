'use client';

import React from 'react';

import styled from 'styled-components';

import { useAuth } from '../../context/authContext';
import LoadingSpinner from '../common/loadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return (
      fallback || (
        <UnauthorizedContainer>
          <div>
            <h2>로그인이 필요합니다</h2>
            <p>
              <span>이 페이지에 접근하려면 로그인해야 합니다.</span>
            </p>
          </div>
        </UnauthorizedContainer>
      )
    );
  }

  return <>{children}</>;
};

const UnauthorizedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;

  div {
    text-align: center;
    color: ${({ theme }) => theme.colors.text};

    h2 {
      margin-bottom: var(--spacer-sm);
      color: ${({ theme }) => theme.colors.primary};
    }

    p {
      color: ${({ theme }) => theme.colors.text};
    }
  }
`;

export default ProtectedRoute;
