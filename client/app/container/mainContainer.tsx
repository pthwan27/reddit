import styled from 'styled-components';

const MainContainer = () => {
  return (
    <Main>
      <div
        style={{
          height: '2500px',
          backgroundColor: 'beige',
        }}
      ></div>
    </Main>
  );
};

const Main = styled.main`
  height: 100%;
  overflow-y: auto;
`;

export default MainContainer;
