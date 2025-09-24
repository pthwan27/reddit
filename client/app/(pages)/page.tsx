"use client";

import HeaderContainer from "../container/headerContainer";
import MainContainer from "../container/mainContainer";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/common/loadingSpinner";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <HeaderContainer />
          <MainContainer />
        </>
      )}
    </>
  );
};

export default Home;
