import { useState } from "react";
import ModalView from "../view/modalView";
import RegisterContainer from "./registerContainer";
import LoginContainer from "./loginContainer";
import { useModalState } from "../context/modalContext";

const AuthModalContainer = () => {
  const [mode, setMode] = useState<"login" | "register">("register");
  const { isOpen, open, close } = useModalState();

  return (
    <>
      {isOpen && (
        <ModalView onClose={close}>
          {mode === "login" ? <LoginContainer /> : <RegisterContainer />}
        </ModalView>
      )}
    </>
  );
};

export default AuthModalContainer;
