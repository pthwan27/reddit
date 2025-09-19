import { useEffect, useState } from "react";
import RegisterContainer from "./auth/registerContainer";
import LoginContainer from "./auth/loginContainer";
import { useModalState } from "../context/modalContext";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { useAuth } from "../context/authContext";
import CloseIcon from "../components/svgs/CloseIcon";

const AuthModalContainer = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const { isOpen, open, close } = useModalState();

  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setMode("login");
    } else {
      setMode("register");
    }
  }, [user]);

  return (
    <>
      {isOpen && (
        <>
          {createPortal(
            <StyledModalContainer>
              <StyledModalBackground />
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
  padding: var(--spacer-xs);
  margin-left: auto;
`;

const StyledModalCloseButton = styled.button`
  padding: var(--spacer-xs);
  background: ${({ theme }) => theme.colors.grayBackground};

  &:hover {
    background: ${({ theme }) => theme.colors.grayHover};
  }
`;

const StyledModalContentMain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default AuthModalContainer;
