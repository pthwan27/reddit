import styled from "styled-components";
import TextInputView from "./textInputView";
import ButtonView from "./buttonView";

type RegisterViewProps = {
  email: string;
  username: string;
  password: string;
  onEmailChange: (v: string) => void;
  onUsernameChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onRegister: () => void;
};

const RegisterView = ({
  email,
  username,
  password,
  onEmailChange,
  onUsernameChange,
  onPasswordChange,
  onRegister,
}: RegisterViewProps) => (
  <StyledRegisterContainer>
    <h2>가입</h2>
    <TextInputView
      text={email}
      placeHolderText="Email"
      onChange={(e) => onEmailChange(e.target.value)}
    />
    <TextInputView
      text={username}
      placeHolderText="Username"
      onChange={(e) => onUsernameChange(e.target.value)}
    />
    <TextInputView
      text={password}
      placeHolderText="Password"
      onChange={(e) => onPasswordChange(e.target.value)}
    />
    <ButtonView onClick={onRegister} text="회원가입" />
  </StyledRegisterContainer>
);

const StyledRegisterContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export default RegisterView;
