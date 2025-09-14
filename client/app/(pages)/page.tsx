"use client";

import styled from "styled-components";
import HeaderContainer from "../container/headerContainer";
import MainContainer from "../container/mainContainer";

const Home = () => {
  return (
    <PageContainer>
      <HeaderContainer />
      <MainContainer />
    </PageContainer>
  );
};

const PageContainer = styled.main`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  margin: 0 auto;
  padding: var(--spacer-lg);
`;

export default Home;
