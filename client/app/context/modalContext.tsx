'use client';

import { createContext, useCallback, useContext, useState } from 'react';

export type ModalKey = 'authModal' | 'createSubModal';

export type modalContextType = {
  modals: Record<ModalKey, boolean>;
  open: (key: ModalKey) => void;
  close: (key: ModalKey) => void;
  toggle: (key: ModalKey) => void;
};

const ModalContext = createContext<modalContextType>({
  modals: { authModal: false, createSubModal: false },
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = useState<Record<ModalKey, boolean>>({
    authModal: false,
    createSubModal: false,
  });

  const open = useCallback(
    (key: ModalKey) => setModals((prev) => ({ ...prev, [key]: true })),
    []
  );
  const close = useCallback(
    (key: ModalKey) => setModals((prev) => ({ ...prev, [key]: false })),
    []
  );
  const toggle = useCallback(
    (key: ModalKey) => setModals((prev) => ({ ...prev, [key]: !prev[key] })),
    []
  );
  return (
    <ModalContext.Provider value={{ modals, open, close, toggle }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalState = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('useModalState must be used within a ModalProvider');
  return context;
};

export default ModalContext;
