"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

import { clientAxiosInstance } from "../utils/axios";

// 사용자 타입 정의
export interface User {
  id: string;
  email: string;
  username: string;
}

// 인증 상태 타입 정의
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  mode: "login" | "register";
  setMode: React.Dispatch<React.SetStateAction<"login" | "register">>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  refreshUser: () => Promise<void>;
}

// AuthContext 생성
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 쿠키 기반 인증을 사용하므로 별도 토큰 관리 불필요
// 서버에서 HttpOnly 쿠키로 토큰을 관리함

// AuthProvider 컴포넌트
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<"login" | "register">("login");
  // 사용자 정보 새로고침 (쿠키 기반)
  const refreshUser = useCallback(async () => {
    try {
      const response = await clientAxiosInstance.get("/api/auth/me");
      setUser(response.data.user);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 로그인 함수 (쿠키 기반)
  const login = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await clientAxiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      const { user: userData } = response.data;
      setUser(userData);
    } catch (error: any) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 로그아웃 함수 (쿠키 기반)
  const logout = useCallback(async () => {
    try {
      // 서버에서 쿠키 삭제 요청
      await clientAxiosInstance.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
    }
  }, []);

  // 회원가입 함수 (쿠키 기반)
  const register = useCallback(
    async (email: string, username: string, password: string) => {
      try {
        setIsLoading(true);
        const response = await clientAxiosInstance.post("/api/auth/register", {
          email,
          username,
          password,
        });

        // 서버에서 쿠키로 토큰을 설정하고 사용자 정보를 반환
        const { user: userData } = response.data;
        setUser(userData);
      } catch (error: any) {
        console.error("Registration failed:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // 컴포넌트 마운트 시 사용자 정보 로드 (쿠키 기반)
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  // axios 인터셉터 설정 (인증 실패 시 자동 로그아웃)
  useEffect(() => {
    const responseInterceptor = clientAxiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      clientAxiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    mode,
    setMode,
    login,
    logout,
    register,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// useAuth 훅
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
