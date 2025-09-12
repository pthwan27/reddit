"use client";

import styled from "styled-components";
import HeaderContainer from "../container/headerContainer";

const Home = () => {
  return (
    <PageContainer>
      <HeaderContainer />
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
  max-width: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: var(--spacer-lg);
`;

export default Home;
