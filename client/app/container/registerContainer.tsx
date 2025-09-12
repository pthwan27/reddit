"use client";
import { useState } from "react";
import RegisterView from "../view/registerView";

const RegisterContainer = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = () => {
    console.log(email, username, password);
    // 회원가입 로직
  };

  return (
    <RegisterView
      email={email}
      username={username}
      password={password}
      onEmailChange={setEmail}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onRegister={register}
    />
  );
};

export default RegisterContainer;
