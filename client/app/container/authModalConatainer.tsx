import { useEffect, useState } from "react";
import RegisterContainer from "./auth/registerContainer";
import LoginContainer from "./auth/loginContainer";
import { useModalState } from "../context/modalContext";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { useAuth } from "../context/authContext";
import CloseIcon from "../components/svgs/CloseIcon";

const AuthModalContainer = () => {
  const { isOpen, close } = useModalState();
  const { user, mode, setMode } = useAuth();

  useEffect(() => {
    if (user && isOpen) {
      close();
    }
  }, [user, isOpen, close]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;

      if (!target.closest("[data-modal]")) {
        close();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
      // 스크롤 방지
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
      // 스크롤 복원
      document.body.style.overflow = "unset";
    };
  }, [isOpen, close]);

  return (
    <>
      {isOpen && (
        <>
          {createPortal(
            <StyledModalContainer data-modal>
              <StyledModalBackground onClick={close} />
              <StyledModal>
                <StyledModalContentHeader>
                  <StyledModalCloseButton onClick={() => close()}>
                    <CloseIcon />
                  </StyledModalCloseButton>
                </StyledModalContentHeader>
                <StyledModalContentMain>
                  {mode === "login" ? (
                    <LoginContainer />
                  ) : (
                    <RegisterContainer />
                  )}
                </StyledModalContentMain>
              </StyledModal>
            </StyledModalContainer>,
            document.body
          )}
        </>
      )}
    </>
  );
};

const StyledModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const StyledModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.overlay || "rgba(0,0,0,0.3)"};
  backdrop-filter: blur(0.25rem);
  opacity: 0.3;
  z-index: 1;
`;

const StyledModal = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: var(--radius-lg);
  padding: var(--spacer-md);
  width: 528px;
  min-height: 200px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);

  @media (max-width: 528px) {
    width: 100vw;
    min-height: 100vh;
    border-radius: 0;
    padding: var(--spacer-md);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const StyledModalContentHeader = styled.div`
  display: flex;
  align-items: center;
  margin: var(--spacer-xs);
  margin-left: auto;
`;

const StyledModalCloseButton = styled.button`
  background: ${({ theme }) => theme.colors.grayBackground};
  padding: var(--spacer-xs);

  &:hover {
    background: ${({ theme }) => theme.colors.grayHover};
  }
`;

const StyledModalContentMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin-bottom: var(--spacer-xs);
`;

export default AuthModalContainer;
