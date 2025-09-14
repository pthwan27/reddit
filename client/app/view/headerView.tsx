import styled from "styled-components";

type HeaderViewProps = {
  onLogin: () => void;
  userName?: string;
};
const HeaderView = ({ onLogin, userName }: HeaderViewProps) => {
  return (
    <StyledHeaderView>
      {/* logo */}
      {userName ? userName : <button onClick={onLogin}>로그인</button>}
    </StyledHeaderView>
  );
};

const StyledHeaderView = styled.header`
  flex: 1;
  width: 100%;
`;

export default HeaderView;
