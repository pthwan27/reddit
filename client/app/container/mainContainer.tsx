import styled from 'styled-components';

const MainContainer = () => {
  return (
    <StyledMainContainer>
      asdfasdfsadfasd
      <div
        style={{
          height: '2500px',
          backgroundColor: 'beige',
        }}
      ></div>
    </StyledMainContainer>
  );
};

const StyledMainContainer = styled.main`
  height: 100%;
  overflow-y: auto;
`;

export default MainContainer;
