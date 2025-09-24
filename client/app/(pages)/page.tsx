"use client";

import styled from "styled-components";
import HeaderContainer from "../container/headerContainer";
import MainContainer from "../container/mainContainer";
import LeftNaveContainer from "../container/leftNavContainer";

const Home = () => {
  return (
    <>
      <HeaderContainer />
      <MainPageContainer>
        <LeftNaveContainer />
        <MainContainer />
      </MainPageContainer>
    </>
  );
};

const MainPageContainer = styled.main`
  display: grid;
  grid-template-columns: 272px 1fr;

  height: 100vh;

  transition: grid-template-columns 250ms cubic-bezier(0.65, 0, 0.35, 1);

  @media (max-width: 1199px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;
export default Home;
