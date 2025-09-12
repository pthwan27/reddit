"use client";

import { createContext, useCallback, useContext, useState } from "react";

type ModalContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <ModalContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalState = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModalState must be used within a ModalProvider");
  return context;
};

export default ModalContext;
