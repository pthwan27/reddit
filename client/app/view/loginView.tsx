import styled from "styled-components";
import ButtonView from "./buttonView";
import TextInputView from "./textInputView";

type LoginViewProps = {
  email: string;
  password: string;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onLogin: () => void;
};

const LoginView = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
}: LoginViewProps) => (
  <StyledLoginView>
    <h2>로그인</h2>
    <TextInputView
      text={email}
      placeHolderText="Email"
      onChange={(e) => onEmailChange(e.target.value)}
    />
    <TextInputView
      text={password}
      placeHolderText="Password"
      onChange={(e) => onPasswordChange(e.target.value)}
    />
    <ButtonView onClick={onLogin} text="회원가입" />
  </StyledLoginView>
);
const StyledLoginView = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default LoginView;
