"use client";
import { useState } from "react";
import HeaderView from "../view/headerView";
import AuthModalContainer from "./authModalConatainer";
import { useModalState } from "../context/modalContext";

const HeaderContainer = () => {
  const [userName, setUserName] = useState<string | undefined>(undefined);

  const { toggle } = useModalState();

  return (
    <>
      <HeaderView onLogin={toggle} userName={userName} />
      <AuthModalContainer />
    </>
  );
};

export default HeaderContainer;
