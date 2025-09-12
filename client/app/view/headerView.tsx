type HeaderViewProps = {
  onLogin: () => void;
  userName?: string;
};
const HeaderView = ({ onLogin, userName }: HeaderViewProps) => (
  <header>
    {/* logo */}
    {userName ? userName : <button onClick={onLogin}>로그인</button>}
  </header>
);

export default HeaderView;
