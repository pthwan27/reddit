import styled from "styled-components";

type MainViewProps = {
  children: React.ReactNode;
};
const MainView = ({ children }: MainViewProps) => {
  return (
    <StyledMainView>
      {/* logo */}
      {children}
    </StyledMainView>
  );
};

const StyledMainView = styled.main`
  flex: 9;
  width: 100%;
`;

export default MainView;
