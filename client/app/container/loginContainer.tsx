import { useState } from "react";
import LoginView from "../view/LoginView";

const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 로그인 로직
  };

  return (
    <LoginView
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onLogin={handleLogin}
    />
  );
};

export default LoginContainer;
